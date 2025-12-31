import { computed, ref, type ComputedRef } from 'vue';
import { isFunction, isNullOrUndef } from 'yatter';

type OptionItem<T> = { label: string; value: T };
export type DataOption<T> = {
  loading: boolean;
  options: Array<OptionItem<T>>;
  fetch?: (code: string) => Promise<OptionItem<T>[]>;
};

let defaultFetch: DataOption<any>['fetch'];
const store = ref<Map<string, DataOption<any>>>(new Map());

export function getOptions<T>(code: string, fetch?: DataOption<T>['fetch']) {
  return computed(() => {
    if (!store.value.has(code)) {
      store.value.set(code, { loading: false, options: [], fetch });
    }
    const data = store.value.get(code)!;
    if (!data.options.length && !data.loading) {
      fetchOptions(code);
    }
    return data.options;
  });
}

async function fetchOptions(code: string) {
  const data = store.value.get(code)!;
  data.loading = true;
  const options = await (data.fetch || defaultFetch)?.(code);
  if (options) {
    data.loading = false;
    data.options = options;
  }
}

export function clearEnum(code: string) {
  const data = store.value.get(code);
  if (!data) {
    return;
  }
  data.options = [];
}

export function getEnum<T>(code: string, fetch?: DataOption<T>['fetch']): ComputedRef<OptionItem<T>[]>;
export function getEnum<T>(
  code: string,
  value: T,
  fetch?: DataOption<T>['fetch'],
): ComputedRef<OptionItem<T> | undefined>;
export function getEnum<T>(code: string, valueOrFetch?: T | DataOption<T>['fetch'], fetch?: DataOption<T>['fetch']) {
  const value = isFunction(valueOrFetch) ? undefined : valueOrFetch;
  const fetchArg = isFunction(valueOrFetch) ? valueOrFetch : fetch;
  if (isNullOrUndef(value)) {
    return getOptions(code, fetchArg);
  }
  return computed(() => {
    const options = getOptions(code, fetchArg);
    return options.value.find((item) => item.value === value);
  });
}

export function resetEnum(code: string) {
  if (!store.value.has(code)) {
    return;
  }
  fetchOptions(code);
}

export function setDefaultEnumFetch(fetch: Exclude<DataOption<any>['fetch'], undefined>) {
  defaultFetch = fetch;
}

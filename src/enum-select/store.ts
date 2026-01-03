import { computed, ref, type ComputedRef } from 'vue';
import { isFunction, isNullOrUndef } from 'yatter';

type OptionItem<T = any, E = undefined> = E extends undefined
  ? { label: string; value: T }
  : { label: string; value: T } & E;
export type EnumData<T extends OptionItem> = {
  loading: boolean;
  options: Array<T>;
  fetch?: (code: string) => Promise<T[]>;
};

let defaultFetch: EnumData<any>['fetch'];
const store = ref<Map<string, EnumData<any>>>(new Map());

export function getOptions<V, E = undefined>(code: string, fetch?: EnumData<OptionItem<V, E>>['fetch']) {
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

export function getEnum<V, E = undefined>(
  code: string,
  fetch?: EnumData<OptionItem<V, E>>['fetch'],
): ComputedRef<OptionItem<V, E>[]>;
export function getEnum<V, E = undefined>(
  code: string,
  value: V,
  fetch?: EnumData<OptionItem<V, E>>['fetch'],
): ComputedRef<OptionItem<V, E> | undefined>;
export function getEnum<V, E = undefined>(
  code: string,
  valueOrFetch?: V | EnumData<OptionItem<V, E>>['fetch'],
  fetch?: EnumData<OptionItem<V, E>>['fetch'],
) {
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

export function setDefaultEnumFetch(fetch: Exclude<EnumData<any>['fetch'], undefined>) {
  defaultFetch = fetch;
}

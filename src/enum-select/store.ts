import { computed, ref } from 'vue';

export type DataOption = {
  loading: boolean;
  options: Array<{ label: string; value: string }>;
  fetch?: (code: string) => Promise<Array<{ label: string; value: string }>>;
};

let defaultFetch: DataOption['fetch'];
const store = ref<Map<string, DataOption>>(new Map());

export function getOptions(code: string, fetch?: DataOption['fetch']) {
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

export function getEnum(code: string, value: string, fetch?: DataOption['fetch']) {
  return computed(() => {
    const options = getOptions(code, fetch);
    return options.value.find((item) => item.value === value);
  });
}

export function resetEnum(code: string) {
  if (!store.value.has(code)) {
    return;
  }
  fetchOptions(code);
}

export function setDefaultEnumFetch(fetch: Exclude<DataOption['fetch'], undefined>) {
  defaultFetch = fetch;
}

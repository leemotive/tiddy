import { computed, ref } from "vue";

const store = ref<Map<string, { loading: boolean; options: Array<{ label: string; value: string }> }>>(new Map());

export function getOptions(code: string, fetch?: (code: string) => Promise<Array<{ label: string; value: string }>>) {
  return computed(() => {
    if (!store.value.has(code)) {
      store.value.set(code, { loading: false, options: [] });
    }
    const data = store.value.get(code)!;
    if (!data.options.length && !data.loading) {
      fetchOptions(code, fetch);
    }
    return data.options;
  })
}

async function fetchOptions(code: string, fetch?: (code: string) => Promise<Array<{ label: string; value: string }>>) {
  if (!store.value.has(code)) {
    store.value.set(code, { loading: true, options: [] });
  }
  const data = store.value.get(code)!;
  data.loading = true;
  const options = await fetch?.(code);
  if (options) {
    data.loading = false;
    data.options = options;
  }
}

export function clearEnum(code: string) {
  store.value.delete(code);
}

export function getEnum(code: string, value: string, fetch?: (code: string) => Promise<Array<{ label: string; value: string }>>) {
  return computed(() => {
    const options = getOptions(code, fetch);
    return options.value.find(item => item.value === value);
  })
}
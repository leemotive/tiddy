<template>
<ElDialog ref="dialog" v-bind="subProps" :model-value="visible" @close="close">
  <template v-for="name in slotNames" :key="name" #[name]="scope">
    <slot :name="name" v-bind="scope" :ok="confirm" :close="close" :step="step" />
  </template>
</ElDialog>
</template>
<script setup lang="ts">
import { ref, computed, useSlots, type Slots, useTemplateRef } from 'vue';
import { ElDialog, type FormInstance } from 'element-plus';
import { dialogPropsDef, type TdDialogProps } from './utils';
import type { AnyFunction } from '../types';

defineOptions({
  name: 'TdDialog',
});

const props = defineProps(dialogPropsDef);
const propsFromApi = ref({});
const visible = ref(false);

const waiting = {} as PromiseWithResolvers<any>;
const dialogRef = useTemplateRef('dialog');
const subProps = computed<any>(() => ({ ...props, ...propsFromApi.value }));

const slots: Slots = useSlots();

const slotNames = computed(() => Object.keys(slots));

function open(options: TdDialogProps = {}) {
  propsFromApi.value = options;
  visible.value = true;
  Object.assign(waiting, Promise.withResolvers());
  return { promise: waiting.promise, close };
}
function wait() {
  Object.assign(waiting, Promise.withResolvers());
  return waiting.promise;
}

function close() {
  visible.value = false;
  waiting.reject();
}

async function confirm(instance?: FormInstance) {
  await instance?.validate?.();
  visible.value = false;
  waiting.resolve(null);
}

async function step(instance?: FormInstance) {
  await instance?.validate?.();
  waiting.resolve(null);
}

defineExpose(
  new Proxy(
    {
      open,
      wait,
      close,
    } as Record<PropertyKey, any>,
    {
      get(target, key) {
        return target[key] || Reflect.get(dialogRef.value || {}, key);
      },
      has(target, key) {
        return Object.hasOwn(target, key) || Reflect.has(dialogRef.value || {}, key);
      },
    },
  ),
);
</script>
<style lang="scss" scoped></style>
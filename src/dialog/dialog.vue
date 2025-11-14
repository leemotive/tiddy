<template>
<ElDialog ref="dialog" v-bind="subProps" :model-value="visible" @close="close('close')">
  <template v-for="name in slotNames" :key="name" #[name]="scope">
    <slot :name="name" v-bind="scope" :ok="confirm" :close="close" :step="step" />
  </template>
</ElDialog>
</template>
<script setup lang="ts">
import { ref, computed, useSlots, type Slots, useTemplateRef, useAttrs } from 'vue';
import { ElDialog, type DialogInstance, type FormInstance } from 'element-plus';
import type { TdDialogProps } from './utils';
import { cut } from 'yatter';

defineOptions({
  name: 'TdDialog',
});
type DialogSlots = DialogInstance['$slots'] extends Slots & infer T ? T : never;
const propsFromApi = ref({});
const visible = ref(false);

const waiting = {} as PromiseWithResolvers<any>;
const dialogRef = useTemplateRef('dialog');
const attrs = useAttrs();
const subProps = computed<any>(() => ({ ...cut(attrs, ['model-value']), ...propsFromApi.value }));

const slots: Slots = useSlots();

const slotNames = computed(() => Object.keys(slots) as (keyof DialogSlots)[]);

function open(options: Partial<TdDialogProps> = {}) {
  propsFromApi.value = options;
  visible.value = true;
  Object.assign(waiting, Promise.withResolvers());
  return { promise: waiting.promise, close };
}
function wait() {
  Object.assign(waiting, Promise.withResolvers());
  return waiting.promise;
}

function close(err?: any) {
  visible.value = false;
  waiting.reject(err);
}

async function confirm(res?: any, instance?: FormInstance) {
  await instance?.validate?.();
  visible.value = false;
  waiting.resolve(res);
}

async function step(res?: any, instance?: FormInstance) {
  await instance?.validate?.();
  waiting.resolve(res);
}
const expose = {
  open,
  wait,
  close,
};
type __TdDialogExpose = typeof expose & DialogInstance;
defineExpose(
  new Proxy(expose, {
    get(target, key) {
      return Reflect.get(target, key) || Reflect.get(dialogRef.value || {}, key);
    },
    has(target, key) {
      return Object.hasOwn(target, key) || Reflect.has(dialogRef.value || {}, key);
    },
  }) as __TdDialogExpose,
);
</script>
<style lang="css" scoped></style>
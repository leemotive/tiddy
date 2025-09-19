<template>
<ElDialog ref="dialog" v-bind="subProps" :model-value="visible" @close="close('close')">
  <template v-for="name in slotNames" :key="name" #[name]="scope">
    <slot :name="name" v-bind="scope" :ok="confirm" :close="close" :step="step" />
  </template>
</ElDialog>
</template>
<script setup lang="ts">
import { ref, computed, useSlots, type Slots, useTemplateRef } from 'vue';
import { ElDialog, type DialogInstance, type FormInstance } from 'element-plus';
import { dialogPropsDef, type TdDialogProps } from './utils';

defineOptions({
  name: 'TdDialog',
});
type DialogSlots = DialogInstance['$slots'] extends Slots & infer T ? T : never;
type SlotFun = {
  ok: typeof confirm;
  close: typeof close;
  step: typeof step;
};
type ExFun<T> = Exclude<T, undefined>;
type TdDialogSlots = {
  [K in keyof DialogSlots]?: (props: Parameters<ExFun<DialogSlots[K]>>[0] & SlotFun) => any;
};

defineSlots<TdDialogSlots>();

const props = defineProps(dialogPropsDef);
const propsFromApi = ref({});
const visible = ref(false);

const waiting = {} as PromiseWithResolvers<any>;
const dialogRef = useTemplateRef('dialog');
const subProps = computed<any>(() => ({ ...props, ...propsFromApi.value }));

const slots: Slots = useSlots();

// 这里的as就是为了上面的动态slot不报错
const slotNames = computed(() => Object.keys(slots) as ['footer']);

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
defineExpose(
  new Proxy(expose, {
    get(target, key) {
      return Reflect.get(target, key) || Reflect.get(dialogRef.value || {}, key);
    },
    has(target, key) {
      return Object.hasOwn(target, key) || Reflect.has(dialogRef.value || {}, key);
    },
  }),
);
</script>
<style lang="scss" scoped></style>
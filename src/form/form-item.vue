<template>
<ElFormItem ref="formItem" :class="[{'hide-asterisk': hideRequiredAsterisk}]" v-bind="itemAttr" >
  <template v-for="(_, k) in slots" :key="k" #[k]="scope">
    <slot v-bind="scope" :name="k"></slot>
  </template>
  <template #error="scope">
    <div :class="validateClass">{{ innerFormatMessage(scope.error) }}</div>
  </template>
</ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, useNamespace, type FormItemInstance } from 'element-plus';
import { computed, unref, useAttrs, useSlots, useTemplateRef, type Slots } from 'vue';
import { formCtxKey, tdformItemProps, type FormContext } from './utils';
import { inject } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const ns = useNamespace('form-item');
const props = defineProps(tdformItemProps);
const formCtx = inject<FormContext>(formCtxKey)!;

const attrs = useAttrs();
const itemAttr = computed(() => {
  const res: Record<string, any> = { ...formCtx?.itemOption };
  for (const [k, v] of Object.entries(attrs)) {
    Reflect.set(res, k, unref(v));
  }
  return res;
});

const formItemRef = useTemplateRef<FormItemInstance>('formItem');
const slots: Slots = useSlots();
const validateClass = ns.e('error');

const propString = computed(() => {
  if (!attrs.prop) {
    return '';
  }
  if (Array.isArray(attrs.prop)) {
    return attrs.prop.join('.');
  }
  return attrs.prop as string;
});

function innerFormatMessage(m: string) {
  const message = m.replace(
    propString.value,
    unref(props.messageLabel) || unref(attrs.label as string) || propString.value,
  );
  return props.formatMessage?.(message) ?? message;
}

defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return Reflect.get(formItemRef.value || {}, key);
      },
      has(target, key) {
        return Reflect.has(formItemRef.value || {}, key);
      },
    },
  ),
);
</script>

<style lang="css" scoped>

.el-form-item .el-form-item {
  margin-bottom: 18px;
}

.el-form-item:not(.layout-form-item) .el-form-item {
  margin-bottom: 0;
}

.el-form-item.layout-form-item {
  margin-bottom: 0;
}

.el-form-item.is-required.hide-asterisk.asterisk-left > :deep(.el-form-item__label)::before {
  content: '';
}
.el-form-item.is-required.hide-asterisk.asterisk-right > :deep(.el-form-item__label)::after {
  content: '';
}

</style>
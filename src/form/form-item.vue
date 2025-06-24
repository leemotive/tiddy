<template>
<ElFormItem ref="formItem" :class="[{'hide-asterisk': hideRequiredAsterisk}]" v-bind="itemAttr">
  <template v-for="(_, k) in slots" :key="k" #[k]="scope">
    <slot v-bind="scope" :name="k"></slot>
  </template>
  <template #error="scope">
    <div :class="validateClass">{{ innerFormatMessage(scope.error) }}</div>
  </template>
</ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, useNamespace } from 'element-plus';
import { computed, isRef, unref, useSlots, useTemplateRef, type Slots } from 'vue';
import { cut } from 'yatter';
import { formItemPropsDef, tdformItemProps, type Writeable } from './utils';

const ns = useNamespace('form-item');
const props = defineProps(formItemPropsDef);

const itemAttr = computed(() => {
  const attrs: Writeable<Partial<typeof props>> = cut(props, Object.keys(tdformItemProps));
  for (const [k, v] of Object.entries(attrs)) {
    if (isRef<any>(v)) {
      attrs[k as keyof typeof attrs] = v.value;
    }
  }
  return attrs;
});

const formItemRef = useTemplateRef('formItem');
const slots: Slots = useSlots();
const validateClass = ns.e('error');

const propString = computed(() => {
  if (!props.prop) {
    return '';
  }
  if (Array.isArray(props.prop)) {
    return props.prop.join('.');
  }
  return props.prop;
});

function innerFormatMessage(m: string) {
  const message = m.replace(propString.value, unref(props.messageLabel) || unref(props.label) || propString.value);
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
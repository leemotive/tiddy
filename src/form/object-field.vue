<template>
  <TdFormItem v-bind="labelProps" class="layout-form-item">
    <FormField v-for="field in subFields" :key="getKey(field)" v-bind="field" />
  </TdFormItem>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { getKey } from '../utils';
import FormField from './form-field.vue';
import { objectFieldPropsDef, type TdFormFieldProps } from './utils';
import { pick } from 'yatter';
import TdFormItem from './form-item.vue';

const attrs = useAttrs();

const props = defineProps(objectFieldPropsDef);

const labelProps = computed<any>(() => pick(props, [/^label/]));

const subFields = computed(() => {
  return props.fields.map((field: TdFormFieldProps) => {
    return {
      ...field,
      'full-prop': [attrs['full-prop'], field.prop].filter(Boolean).join('.'),
    };
  });
});
</script>

<style lang="scss" scoped>
</style>
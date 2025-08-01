<template>
<div class="layout-item" v-bind="layoutProps">
  <DeepSlot
    v-for="psc in prefixSlots"
    :key="psc.name"
    v-bind="psc"
    :ctx-key="formCtxKey"
  />
  <FormField
    v-for="field in subFields"
    :key="getKey(field)"
    v-bind="field"
  />
  <DeepSlot
    v-for="psc in suffixSlots"
    :key="psc.name"
    v-bind="psc"
    :ctx-key="formCtxKey"
  />
</div>
</template>

<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';
import { getKey } from '../utils';
import { formCtxKey, layoutFieldPropsDef, type FormContext, type TdFormFieldProps } from './utils';
import DeepSlot from '../deep-slot/deep-slot.vue';
import FormField from './form-field.vue';
import { cut, ensureArray, groupBy } from 'yatter';

const props = defineProps(layoutFieldPropsDef);
const attrs = useAttrs();

const layoutProps = computed(() => {
  return Object.assign({}, cut(attrs, ['full-prop']), cut(props, ['fields']));
});

const formCtx = inject<FormContext>(formCtxKey)!;

const subFields = computed(() => {
  return props.fields.map((field: TdFormFieldProps) => {
    return {
      ...field,
      'full-prop': [attrs['full-prop'], field.prop].filter(Boolean).join('.'),
    };
  });
});

const layoutSlots = formCtx.getParentSlots(ensureArray(props.slots));
const { prefix: prefixSlots, suffix: suffixSlots } = groupBy(
  layoutSlots,
  (slot) => slot.name.match(/^[a-z]+/i)?.[0] ?? '',
);
</script>
<style lang="scss" scoped>
</style>
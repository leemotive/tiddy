<template>
<component :is="LayoutComponent" class="layout-item" v-bind="layoutProps" v-on="on">
  <DeepSlot
    v-for="psc in prefixSlots"
    :key="psc.name"
    v-bind="psc"
    :ctx-key="formCtxKey"
  />
  <FormField
    v-for="field in subFields"
    :key="getKey(field[0])"
    v-bind="{...field[0], ...field[1]}"
  />
  <DeepSlot
    v-for="psc in suffixSlots"
    :key="psc.name"
    v-bind="psc"
    :ctx-key="formCtxKey"
  />
  <template v-for="sl in subSlots" :key="sl.name" #[sl.name]="scope">
    <slot :name="sl.name" v-bind="scope" />
  </template>
</component>
</template>

<script setup lang="ts">
import { computed, inject, unref, useAttrs } from 'vue';
import { getKey } from '../utils';
import { formCtxKey, layoutFieldPropsDef, type FormContext, type TdFormFieldProps } from './utils';
import DeepSlot from '../deep-slot/deep-slot.vue';
import FormField from './form-field.vue';
import { cut, ensureArray, groupBy } from 'yatter';

const props = defineProps(layoutFieldPropsDef);
const attrs = useAttrs();

const layoutProps = computed(() => {
  const p = Object.assign({}, cut(attrs, ['full-prop', 'widget', 'on']), cut(props, ['fields']));
  const w = Object.fromEntries(Object.entries(unref(props.widget)).map(([k, v]) => [k, unref(v)]));
  return Object.assign(p, w);
});

const LayoutComponent = computed(() => {
  if (props.component) {
    return props.component;
  }
  return 'div';
});

const formCtx = inject<FormContext>(formCtxKey)!;

const subFields = computed(() => {
  return props.fields.map((field: TdFormFieldProps) => {
    return [field, { 'full-prop': [attrs['full-prop'], field.prop].filter(Boolean).join('.') }];
  });
});

const layoutSlots = formCtx.getParentSlots(ensureArray(props.slots));
const subSlots = props.component ? layoutSlots : [];
const { prefix: prefixSlots, suffix: suffixSlots } = groupBy(
  layoutSlots,
  (slot) => slot.name.match(/^[a-z]+/i)?.[0] ?? '',
);
</script>
<style lang="css" scoped>
</style>
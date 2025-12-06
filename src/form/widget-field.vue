<template>
<TdFormItem v-bind="itemAttrs">
  <DeepSlot
    v-for="psc in beforeSlots"
    :key="psc.name"
    v-bind="psc"
    :scope="{ value: widgetModel }"
    :ctx-key="formCtxKey"
  />
  <template v-if="!!Widget">
    <Widget v-bind="widgetAttrs" v-on="on" v-model="widgetModel" :modelModifiers="modelModifiers" class="widget-component" >
      <template v-for="sc in widgetSlots" :key="sc.name" #[sc.name]="scope">
        <DeepSlot v-bind="sc" :scope="scope" :ctx-key="formCtxKey" />
      </template>
    </Widget>
  </template>

  <DeepSlot
    v-for="ssc in afterSlots"
    :key="ssc.name"
    v-bind="ssc"
    :scope="{ value: widgetModel }"
    :ctx-key="formCtxKey"
  />

  <template v-for="isc in formItemSlots" :key="isc.name" #[isc.name]="scope">
    <DeepSlot v-bind="isc" :scope="scope" :ctx-key="formCtxKey" />
  </template>
</TdFormItem>
</template>

<script setup lang="ts">
import { formCtxKey, widgetFieldPropsDef, type FormContext } from './utils';
import TdFormItem from './form-item.vue';
import { resolveWidget } from './widget';
import { computed, inject, useAttrs } from 'vue';
import { getDeepValue, isNullOrUndef, pick, setDeepValue, toCamelCase } from 'yatter';
import DeepSlot from '../deep-slot/deep-slot.vue';
import { resolveSlotNames } from '../utils';
import { unref } from 'vue';

const props = defineProps(widgetFieldPropsDef);
const attrs = useAttrs();

const formCtx = inject<FormContext>(formCtxKey)!;

const modelModifiers = computed(() => Object.fromEntries(props.modifiers.map((m) => [m, true])));
console.log(modelModifiers.value);
const widgetModel = computed({
  get() {
    return props.formatter(getDeepValue(formCtx.model, attrs['full-prop'] as string));
  },
  set(v) {
    const parsed = props.parser(v);

    setDeepValue(formCtx.model, attrs['full-prop'] as string, parsed);
  },
});

if (!isNullOrUndef(props.default)) {
  widgetModel.value = props.default;
}

const itemAttrs = computed<any>(() => {
  const attr4Item = pick(attrs, [{ from: /^item/, to: (k) => toCamelCase(k.slice(4)) }, ['full-prop', 'prop']]);
  const attr = { ...attr4Item, ...props.item, ...pick(props, ['rules', /^label/]) };
  return attr;
});

const Widget = resolveWidget(props.component);

const widgetAttrs = computed(() => {
  const attr4Widget = pick(attrs, [{ from: /^widget/, to: (k) => toCamelCase(k.slice(6)) }]);
  return { ...attr4Widget, ...unref(props.widget) };
});

const widgetSlots = formCtx.getParentSlots(resolveSlotNames(props.slots, <string>props.prop));
const formItemSlots = formCtx.getParentSlots(resolveSlotNames(props.itemSlots, <string>props.prop, 'item'));

const beforeSlots = formCtx.getParentSlots(resolveSlotNames(props.prependSlots, <string>props.prop, 'prepend'));
const afterSlots = formCtx.getParentSlots(resolveSlotNames(props.appendSlots, <string>props.prop, 'append'));
</script>

<style lang="css" scoped></style>
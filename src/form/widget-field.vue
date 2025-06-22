<template>
<TdFormItem v-bind="itemAttrs">
  <DeepSlot
    v-for="psc in beforeSlots"
    :key="psc.name"
    v-bind="psc"
    :scope="{ value: widgetModel }"
    :ctx-key="formCtxKey"
  />

  <Widget v-bind="widgetAttrs" v-on="on" v-model="widgetModel" class="widget-component" @blur="onModelChange">
    <template v-for="sc in widgetSlots" :key="sc.name" #[sc.name]="scope">
      <DeepSlot v-bind="sc" :scope="scope" :ctx-key="formCtxKey" />
    </template>
  </Widget>

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
import { computed, inject, shallowRef, useAttrs } from 'vue';
import { ensureArray, getDeepValue, isNullOrUndef, pick, setDeepValue, toCamelCase } from 'yatter';
import DeepSlot from '../deep-slot/deep-slot.vue';

const props = defineProps(widgetFieldPropsDef);
const attrs = useAttrs();

const formCtx = inject<FormContext>(formCtxKey)!;

const tempValue = shallowRef(getDeepValue(formCtx.model, attrs['full-prop'] as string));
const widgetModel = computed({
  get() {
    if (props.modifiers.includes('lazy')) {
      return tempValue.value;
    }
    return getDeepValue(formCtx.model, attrs['full-prop'] as string);
  },
  set(v) {
    if (props.modifiers.includes('lazy')) {
      tempValue.value = v;
    } else {
      updateModelValue(v);
    }
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

function onModelChange(...args: any[]) {
  if (props.modifiers.includes('lazy')) {
    updateModelValue(tempValue.value);
  }
  props.on.blur?.(...args);
}

function updateModelValue(v: any) {
  if (props.modifiers.includes('trim')) {
    setDeepValue(formCtx.model, attrs['full-prop'] as string, (v as string).trim());
  } else if (props.modifiers.includes('number')) {
    setDeepValue(formCtx.model, attrs['full-prop'] as string, Number(v));
  } else {
    setDeepValue(formCtx.model, attrs['full-prop'] as string, v);
  }
}

const Widget = resolveWidget(props.component);

const widgetAttrs = computed(() => {
  const attr4Widget = pick(attrs, [{ from: /^widget/, to: (k) => toCamelCase(k.slice(6)) }]);
  return { ...attr4Widget, ...props.widget };
});

const widgetSlots = formCtx.getParentSlots(ensureArray(props.slots));
const formItemSlots = formCtx.getParentSlots(ensureArray(props.itemSlots));

const beforeSlots = formCtx.getParentSlots(ensureArray(props.prependSlots));
const afterSlots = formCtx.getParentSlots(ensureArray(props.appendSlots));
</script>

<style lang="scss" scoped></style>
<template>
<component
  v-if="OuterEmptySlot && !values.length"
  :is="OuterEmptySlot.component"
  :add="lineAction.add.bind(null, -1)"
  :empty="true"
/>
<TdFormItem v-if="!OuterEmptySlot || values.length" v-bind="labelProps" class="layout-form-item">
  <component
    v-if="EmptySlot && !values.length"
    :is="EmptySlot.component"
    :add="lineAction.add.bind(null, -1)"
    :empty="true"
  />
  <div v-for="(v, vi) in values" :key="getKey(v)" class="list-row" :style="lineStyle">
    <div class="row-item">
      <FormField
        name-space="layout-form-item"
        v-bind="fieldProps"
        :label="indexProp(label, vi)"
        :label-width="indexProp(labelWidth, vi)"
        :label-position="indexProp(labelPosition, vi)"
        :type="undefined"
        :full-prop="`${parentFullProp}[${vi}]`"
        :prop="String(vi)"
      />
    </div>
    <div class="row-action">
      <component
          v-if="RowSlot"
          :is="RowSlot.component"
          :up="lineAction.up.bind(null, vi)"
          :down="lineAction.down.bind(null, vi)"
          :add="lineAction.add.bind(null, vi)"
          :remove="lineAction.remove.bind(null, vi)"
          :index="vi"
          :first="!vi"
          :last="vi === values.length - 1"
          :empty="false"
          :single="values.length === 1"
        />
    </div>
  </div>
</TdFormItem>
</template>
<script setup lang="ts">
import TdFormItem from './form-item.vue';
import { arrayFieldPropsDef, formCtxKey, type FormContext, type Writeable } from './utils';
import { computed, inject, onMounted, useAttrs } from 'vue';
import { cut, getDeepValue, isFunction, isNullOrUndef, pick, setDeepValue } from 'yatter';
import { getKey } from '../utils';
import FormField from './form-field.vue';
import type { OrFunction } from '../types';

const props = defineProps(arrayFieldPropsDef);
const attrs = useAttrs();

const fieldProps = computed(() => {
  return {
    ...cut(props, [(k) => k.endsWith('Action') || ['lineStyle'].includes(k)]),
    ...attrs,
  };
});

const formCtx = inject<FormContext>(formCtxKey)!;

const OuterEmptySlot = formCtx.getParentSlots([props.outerEmptyAction])[0];
const EmptySlot = formCtx.getParentSlots([props.emptyAction])[0];
const RowSlot = formCtx.getParentSlots([props.rowAction])[0];

const parentFullProp = computed(() => (attrs['full-prop'] as string) || '');

const values = computed(() => {
  return getDeepValue<unknown[]>(formCtx.model, parentFullProp.value, {
    fallback: [],
  });
});

const labelProps = computed<any>(() => {
  const p = pick(props, [/^label/]) as Writeable<typeof props>;
  if (isFunction(p.hideLabel)) {
    p.label = '';
    p.labelWidth = '0';
  }
  p.label = indexProp(p.label, -1, '');
  p.labelWidth = indexProp(p.labelWidth, -1, p.label ? undefined : '0');
  p.labelPosition = indexProp(p.labelPosition, -1);
  return p;
});

function indexProp(v: OrFunction<any>, index: number, value?: any) {
  if (isFunction(v)) {
    return v(index);
  }
  if (isNullOrUndef(value)) {
    return v;
  }
  return value;
}

const lineAction = {
  up(index: number) {
    if (!index) {
      return;
    }
    const temp = values.value.slice();
    const [current] = temp.splice(index, 1);
    temp.splice(index - 1, 0, current);
    updateValue(temp);
  },
  down(index: number) {
    const temp = values.value.slice();
    if (index >= temp.length) {
      return;
    }
    const [current] = temp.splice(index, 1);
    temp.splice(index + 1, 0, current);
    updateValue(temp);
  },
  add(index: number) {
    const temp = values.value.slice();
    const rawValue = props.rawValue?.() || {};
    temp.splice(index + 1, 0, rawValue);
    updateValue(temp);
  },
  remove(index: number) {
    const temp = values.value.slice();
    temp.splice(index, 1);
    updateValue(temp);
  },
};

function updateValue(newValue: any) {
  setDeepValue(formCtx.model, parentFullProp.value, newValue);
}

onMounted(() => {
  if (props.mandatory && !values.value?.length) {
    lineAction.add(-1);
  }
});
</script>
<style lang="css" scoped>
.list-row {
  display: flex;
}
.row-item {
  flex: 1;
}
</style>
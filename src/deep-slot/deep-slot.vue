<template>
  <component v-if="SloterComponent" :is="SloterComponent" v-bind="sloterProps">
    <template v-for="sc in subSlots" :key="sc.name" #[sc.name]="scope">
      <DeepSlot v-bind="sc" :scope="scope" :ctx-key="ctxKey" />
    </template>
    <template v-if="text">{{ text }}</template>
  </component>
  <template v-else-if="text">{{ text }}</template>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { deepSlotPropsDef } from './utils';
import type { FormContext } from '../form/utils';
import { ensureArray, isFunction } from 'yatter';

const props = defineProps(deepSlotPropsDef);

const SloterComponent = props.component;

const sloterProps = computed(() => props.props(props.scope));

const parentCtx = inject<FormContext>(props.ctxKey)!;
const subSlots = parentCtx.getParentSlots(ensureArray(props.slots));

const text = computed(() => {
  if (isFunction(props.text)) {
    return props.text(props.scope);
  }
  return props.text ?? '';
});
</script>
<style lang="css" scoped></style>
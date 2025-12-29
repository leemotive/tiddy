<template>
  <ElTableColumn v-bind="$attrs">
    <template v-if="visibleColumns.length">
      <TdTableCol v-for="col in visibleColumns" :key="col.label" v-bind="col" />
    </template>
    <template v-for="sc in columnSlots" :key="sc.name" #[sc.name]="scope">
      <DeepSlot v-bind="sc" :scope="scope" :ctx-key="tableCtxKey" />
    </template>
    <template v-if="transform.length" #default="scope">
      <component :is="renderer(scope)" />
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
import { ElTableColumn } from 'element-plus';
import DeepSlot from '../deep-slot/deep-slot.vue';
import { tableColumnPropsDef, tableCtxKey, type TableContext } from './utils';
import { computed, inject, unref, useAttrs } from 'vue';
import { ensureArray, getDeepValue } from 'yatter';
import { resolveSlotNames } from '../utils';
import { h } from 'vue';

defineOptions({
  name: 'TdTableCol',
});

const props = defineProps(tableColumnPropsDef);
const attrs = useAttrs();
const visibleColumns = computed(() => props.columns.filter((col) => !unref(col.hide)));

function renderer(scope: any) {
  const { row, column } = scope;
  const nodes = props.transform.reduce<any>(
    (res, filter) => filter(res, row, column),
    getDeepValue(row, column.property),
  );

  if (props.dangerouslyUseHTMLString) {
    return h('div', { innerHTML: nodes });
  }
  return h('div', null, ensureArray(nodes));
}

const tableCtx = inject<TableContext>(tableCtxKey)!;
const columnSlots = tableCtx.getParentSlots(resolveSlotNames(props.slots, attrs.prop as string));
</script>
<style lang="css" scoped>
</style>
<template>
  <ElTableColumn v-bind="colProps">
    <template v-if="columns.length">
      <TdTableCol v-for="col in columns" :key="col.label" v-bind="col" />
    </template>
    <template v-for="sc in columnSlots" :key="sc.name" #[sc.name]="scope">
      <DeepSlot v-bind="sc" :scope="scope" :ctx-key="tableCtxKey" />
    </template>
    <template v-if="transform.length" #default="scope">
      <div v-html="filtered(scope)" />
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
import { ElTableColumn } from 'element-plus';
import DeepSlot from '../deep-slot/deep-slot.vue';
import { tableColumnPropsDef, tableCtxKey, type TableContext } from './utils';
import { computed, inject } from 'vue';
import { cut, getDeepValue } from 'yatter';
import { resolveSlotNames } from 'tiddy/utils';

defineOptions({
  name: 'TdTableCol',
});

const props = defineProps(tableColumnPropsDef);

const colProps = computed(() => {
  return cut(props, ['transform', 'columns', 'slots']);
});

function filtered(scope: any) {
  const { row, column } = scope;
  return props.transform.reduce<any>((res, filter) => filter(res), getDeepValue(row, column.property));
}

const tableCtx = inject<TableContext>(tableCtxKey)!;
const columnSlots = tableCtx.getParentSlots(resolveSlotNames(props.slots, props.prop));
</script>
<style lang="scss" scoped>
</style>
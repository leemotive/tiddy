<template>
  <slot name="before"></slot>
  <ElTable ref="tableRef" v-bind="$attrs">
    <TableCol v-for="col in columns" :key="col.label" v-bind="col" />
    <template v-for="name in slotNames" :key="name" #[name]="scope">
      <slot v-bind="scope" :name="name"></slot>
    </template>
  </ElTable>
  <slot name="after"></slot>
</template>

<script setup lang="ts">
import { ElTable, type TableInstance } from 'element-plus';
import { getSlotsFactory } from '../utils';
import TableCol from './table-col.vue';
import { computed, provide, useSlots, ref, type Slots } from 'vue';
import { tableCtxKey, tablePropsDef } from './utils';

defineOptions({
  inheritAttrs: false,
  name: 'TdTable',
});

const props = defineProps(tablePropsDef);

const slots: Slots = useSlots();
const tableRef = ref(null);
const slotNames = computed<string[]>(() => Object.keys(slots));

provide(tableCtxKey, {
  getParentSlots: getSlotsFactory(slots),
});

defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return Reflect.get(tableRef.value || {}, key);
      },
      has(target, key) {
        return Reflect.has(tableRef.value || {}, key);
      },
    },
  ) as TableInstance,
);
</script>

<style lang="css" scoped></style>

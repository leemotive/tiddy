<template>
  <slot name="before"></slot>
  <ElTable ref="tableRef" :data="data" v-bind="subProps">
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
import { computed, provide, useSlots, useTemplateRef, type Slots } from 'vue';
import { tableCtxKey, tablePropsDef } from './utils';
import { cut } from 'yatter';

defineOptions({
  name: 'TdTable',
});

const props = defineProps(tablePropsDef);

const slots: Slots = useSlots();
const tableRef = useTemplateRef<TableInstance>('tableRef');
const slotNames = computed<string[]>(() => Object.keys(slots));
const subProps = computed(() => cut(props, ['columns']));

provide(tableCtxKey, {
  getParentSlots: getSlotsFactory(slots),
});


defineExpose(
  new Proxy(
    {} as Record<PropertyKey, any>,
    {
      get(target, key) {
        return target[key] || Reflect.get(tableRef.value || {}, key);
      },
      has(target, key) {
        return Object.hasOwn(target, key) || Reflect.has(tableRef.value || {}, key);
      },
    },
  ),
);
</script>

<style lang="scss" scoped></style>

<template>
  <TdTable :columns="columns" :data="tableData"></TdTable>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TdTable, type TdTableColumnProps } from '../../src';

const tableData = ref([
  { school: '南京一中', name: '张西', mobilephone: '12345678901' },
  { school: '南京二中', name: '王武', mobilephone: '12345678902' },
]);
const columns: TdTableColumnProps[] = [
  {
    label: '学校',
    prop: 'school',
  },
  {
    label: '类型',
    prop: 'category',
    columns: [
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '联系电话',
        prop: 'mobilephone',
      },
    ],
  },
];
</script>

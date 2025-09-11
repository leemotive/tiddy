<template>
  <TdTable :columns="columns" :data="data" @rowDblclick="onRowDblclick" />
</template> 
<script setup lang="ts">
import { TdTable, type TdTableColumnProps } from 'tiddy';
import { ref } from 'vue';

function onRowDblclick(row: any) {
  alert(`双击表格行: ${row.name}`);
}
const data = ref([
  {
    name: '张三',
    age: 20,
    education: '本科',
  },
  {
    name: '李四',
    age: 22,
    education: '硕士',
  },
]);
const columns: TdTableColumnProps[] = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'education',
    label: '学历',
    width: 120,
  },
];
</script>
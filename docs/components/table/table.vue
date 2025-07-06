<template>
  <TdTable :columns="columns" :data="data" />
</template>

<script setup lang="ts">
import { TdTable, type TdTableColumnProps } from 'tiddy';
import { ref } from 'vue';

const data = ref([
  {
    name: '张三',
    age: 20,
    education: '本科',
    address: '北京市海淀区',
  },
  {
    name: '李四',
    age: 22,
    education: '硕士',
    address: '上海市浦东新区',
  },
]);
const columns: TdTableColumnProps[] = [
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 120,
  },
  {
    prop: 'education',
    label: '学历',
    width: 120,
  },
  {
    prop: 'address',
    label: '地址',
  },
];
</script>
<template>
  <TdTable :columns="columns" :data="data" />
</template> 
<script setup lang="ts">
import { TdTable, type TdTableColumnProps } from 'tiddy';
import { ref } from 'vue';
import DecimalFormat from 'decimal-format';

const data = ref([
  {
    name: '张三',
    age: 20,
    education: '本科',
    address: '北京市海淀区',
    money: 1564873,
  },
  {
    name: '李四',
    age: 22,
    education: '硕士',
    address: '上海市浦东新区',
    money: 3659425,
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
    transform: [(v) => `${v}<br />毕业`],
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'money',
    label: '金额',
    width: 140,
    transform: [
      (value: number) => {
        return value / 100;
      },
      (value: number) => {
        return new DecimalFormat('￥#,##0.00元').format(value);
      },
    ],
  },
];
</script>
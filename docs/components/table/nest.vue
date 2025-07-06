<template>
<TdTable :columns="columns" :data="data" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TdTable, type TdTableColumnProps } from 'tiddy';

const data = ref([
  {
    businessName: '业务1',
    startTime: '2022-01-01',
    contacts: {
      name: '张三',
      phone: '13800000000',
    },
  },
  {
    businessName: '业务2',
    startTime: '2022-01-02',
    contacts: {
      name: '李四',
      phone: '13900000000',
    },
  },
]);

// 字段有嵌套表格
const columns: TdTableColumnProps[] = [
  {
    prop: 'businessName',
    label: '业务名称',
  },
  {
    prop: 'startTime',
    label: '开始时间',
  },
  {
    label: '负责人',
    columns: [
      {
        prop: 'contacts.name',
        label: '姓名',
      },
      {
        prop: 'contacts.phone',
        label: '电话',
      },
    ],
  },
];
</script>
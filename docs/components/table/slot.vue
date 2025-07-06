<template>
  <TdTable :columns="columns" :data="data">
    <template #status_default="{ row }">
      <ElTag :type="row.status === '在职' ? 'primary': 'danger'">{{ row.status }}</ElTag>
    </template>
  </TdTable>
</template>
<script setup lang="ts">
import { TdTable, type TdTableColumnProps } from 'tiddy';
import { ref, h } from 'vue';
import { ElTag } from 'element-plus';

const data = ref([
  {
    name: '张三',
    age: 20,
    education: '本科',
    address: '北京市海淀区',
    status: '在职',
  },
  {
    name: '李四',
    age: 61,
    education: '硕士',
    address: '上海市浦东新区',
    status: '已离职',
  },
  {
    name: '王五',
    age: 45,
    education: '本科',
    address: '广州市天河区',
    status: '在职',
  },
  {
    name: '赵六',
    age: 10,
    education: '本科',
    address: '重庆市渝中区',
    status: '已离职',
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
    label: '年龄段',
    slots: {
      name: 'default',
      component: (scope: any) =>
        h('div', scope.row.age > 60 ? '老年' : scope.row.age > 40 ? '中年' : scope.row.age > 18 ? '少年' : '儿童'),
    },
  },
  {
    prop: 'education',
    label: '学历',
  },
  {
    prop: 'address',
    label: '地址',
    width: 150,
  },
  {
    prop: 'status',
    label: '状态',
    slots: 'status_default',
  },
];
</script>
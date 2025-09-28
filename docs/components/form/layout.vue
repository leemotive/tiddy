<template>
<TdForm :fields="fields" :model="model" label-width="80" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { ElInput } from 'element-plus';
import { type TdFormFieldProps, TdForm } from 'tiddy';

const model = ref({});
const fields: TdFormFieldProps[] = [
  {
    type: 'layout',
    prop: '',
    slots: [
      {
        name: 'prefix',
        component: () =>
          h('div', { style: { fontSize: '18px', fontWeight: 'bold', paddingBottom: '15px' } }, '用户信息'),
      },
    ],
    fields: [
      {
        label: '姓名',
        prop: 'name',
        component: ElInput,
      },
      {
        label: '年龄',
        prop: 'age',
        component: ElInput,
      },
    ],
  },
];
</script>
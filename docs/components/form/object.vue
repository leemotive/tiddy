<template>
  <TdForm :fields="fields" :model="data" label-width="80" />
</template>
<script setup lang="ts">
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ElInput } from 'element-plus';
import { ref } from 'vue';

const data = ref({});

const fields: TdFormFieldProps[] = [
  {
    label: '联系人',
    prop: 'contacts',
    type: 'object',
    fields: [
      {
        label: '姓名',
        prop: 'username',
        component: ElInput,
      },
      {
        label: '联系方式',
        prop: 'phone',
        component: ElInput,
      },
    ],
  },
];
</script>
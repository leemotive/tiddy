<template>
  <TdForm :fields="fields" :model="model" label-width="80" />
</template>
<script setup lang="ts">
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ElInput } from 'element-plus';
import { ref } from 'vue';

const model = ref({});
const fields: TdFormFieldProps[] = [
  {
    label: '姓名',
    prop: 'name',
    component: ElInput,
  },
  {
    label: '密码',
    prop: 'password',
    component: ElInput,
    widget: {
      type: 'password',
    },
  },
];
</script>
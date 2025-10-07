<template>
  <TdForm ref="formRef" :fields="fields" :model="model" label-width="80" />
</template>
<script setup lang="ts">
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ElInput } from 'element-plus';
import { ref, useTemplateRef } from 'vue';

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

const formRef = useTemplateRef('formRef');
console.log(formRef);
</script>
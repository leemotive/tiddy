<template>
  <ElButton type="primary" @click="openDialog">添加用户</ElButton>
  <TdDialog ref="dialog" title="标题" :show-close="false">
    <template #default="scope">
      <TdForm :fields="fields" :model="formData" :id="formId" @submit="scope.ok" label-width="80" />
    </template>
    <template #footer="scope">
      <ElButton type="default" @click="scope.close">取消</ElButton>
      <ElButton type="primary" native-type="submit" :form="formId" >确定</ElButton>
    </template>
  </TdDialog>
</template>

<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus';
import { TdDialog, TdForm } from 'tiddy';
import { useId, ref, useTemplateRef } from 'vue';

const formId = useId();

const formData = ref({});
const fields = [
  {
    label: '姓名',
    prop: 'name',
    component: ElInput,
    rules: [{ required: true }],
  },
  {
    label: '年龄',
    prop: 'age',
    component: ElInput,
    rules: [{ required: true }],
  },
  {
    label: '手机号',
    prop: 'phone',
    component: ElInput,
    rules: [{ required: true }],
  },
  {
    label: '邮箱',
    prop: 'email',
    component: ElInput,
  },
  {
    label: '地址',
    prop: 'address',
    component: ElInput,
  },
];

const dialogRef = useTemplateRef('dialog');
async function openDialog() {
  await dialogRef.value?.open().promise;
}
</script>
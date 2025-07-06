<template>
  <TdForm :fields="fields" :model="model" label-width="80">
    <template #suffix>
      <ElButton type="primary" native-type="submit" >提交</ElButton>
    </template>
  </TdForm>

</template>

<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus';
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ref } from 'vue';

const model = ref({});
const fields: TdFormFieldProps[] = [
  {
    label: '姓名',
    prop: 'name',
    component: ElInput,
    rules: [{ required: true }],
  },
  {
    label: '编号',
    prop: 'code',
    component: ElInput,
    rules: [{ pattern: /^\d{6}$/ }],
  },
];
</script>
<style lang="scss" scoped>
</style>
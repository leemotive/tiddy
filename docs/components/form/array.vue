<template>
  <TdForm :fields="fields" :model="data" label-width="80">
    <template #ratio-action_outer="scope">
      <ElButton plain @click="scope.add">增加系数配置</ElButton>
    </template>

    <template #ratio-action_row="scope">
      <div class="action">
        <ElLink underline="never" plain @click="scope.add">➕</ElLink>
        <ElLink underline="never" plain @click="scope.remove">➖</ElLink>
        <ElLink underline="never" plain @click="scope.up">⬆️</ElLink>
        <ElLink underline="never" plain @click="scope.down">⬇️</ElLink>
      </div>
    </template>
  </TdForm>
</template>

<script setup lang="ts">
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ElInput, ElButton, ElLink } from 'element-plus';
import { ref } from 'vue';

const data = ref({});
const fields: TdFormFieldProps[] = [
  {
    label: (index: number) => (index < 0 ? '' : `系数${index + 1}`),
    prop: 'ratio',
    type: 'array',
    fields: [
      {
        label: '起始',
        prop: 'start',
        component: ElInput,
      },
      {
        label: '结束',
        prop: 'end',
        component: ElInput,
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.action {
  display: flex; 
  gap: 5px; 
  padding-left: 8px;

  :deep(.el-link) {
    text-decoration: none;
  }
}
</style>

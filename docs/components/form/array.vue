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
import { TdForm, widget, type TdFormFieldProps } from 'tiddy';
import { ElInput, ElButton, ElLink } from 'element-plus';
import { computed, ref } from 'vue';

const data = ref<{ ratio?: any[] }>({});
const fields: TdFormFieldProps[] = [
  {
    label: (index: number) => (index < 0 ? '' : `系数${index + 1}`),
    prop: 'ratio',
    type: 'array',
    fields: (v) => [
      {
        label: '起始',
        prop: 'start',
        ...widget(ElInput, { title: 'html原生属性支持', placeholder: computed(() => v?.end) }),
      },
      {
        label: '结束',
        prop: 'end',
        ...widget(
          ElInput,
          computed(() => ({
            title: 'html原生属性支持',
            clearable: true,
          })),
        ),
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

<template>
<TdForm :fields="fields" :model="data">
  <template #prefix>{{ data }}</template>
</TdForm>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElInput } from 'element-plus';
import { TdForm } from 'tiddy';

const data = ref({});
const fields = [
  {
    prop: 'code',
    label: '编号',
    formatter: (v: string) => v?.slice(1),
    parser: (v: string) => `A${v}`,
    component: ElInput,
  },
];
</script>
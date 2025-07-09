<template>
  <TdForm :fields="fields" :model="model" label-width="80" />
</template>

<script setup lang="ts">
import { ElInput, ElOption, ElSelect } from 'element-plus';
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { computed, h, ref } from 'vue';

const model = ref<any>({});
const fields: TdFormFieldProps[] = [
  {
    label: '姓名',
    prop: 'name',
    component: ElInput,
  },
  {
    label: '职业',
    prop: 'job',
    component: ElSelect,
    slots: {
      name: 'default',
      component: () => {
        return [
          h(ElOption, { label: '学生', value: 'student' }),
          h(ElOption, { label: '企业员工', value: 'employee' }),
        ];
      },
    },
  },
  {
    label: '学校',
    prop: 'school',
    hide: computed(() => model.value.job !== 'student'),
    component: ElSelect,
    slots: {
      name: 'default',
      component: () => {
        return [
          h(ElOption, { label: '大学', value: 'university' }),
          h(ElOption, { label: '中学', value: 'middle' }),
          h(ElOption, { label: '小学', value: 'primary' }),
        ];
      },
    },
  },
  {
    label: '公司',
    prop: 'company',
    component: ElInput,
    hide: computed(() => model.value.job !== 'employee'),
  },
];
</script>

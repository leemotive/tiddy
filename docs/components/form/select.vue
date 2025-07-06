<template>
<TdForm :fields="fields" :model="data" label-width="80">
  <template #subject_default>
    <ElOption label="语文" value="chinese" />
    <ElOption label="数学" value="math" />
    <ElOption label="英语" value="english" />
    <ElOption label="物理" value="physics" />
  </template>
</TdForm>
</template>
<script setup lang="ts">
import { TdForm, type TdFormFieldProps } from 'tiddy';
import { ref, h } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

const data = ref({});
const fields: TdFormFieldProps[] = [
  {
    type: 'widget',
    label: '科目',
    prop: 'subject',
    component: ElSelect,
    // 在模板中使用 #subject_default 来定义默认插槽的内容，
    // 下划线后面的部分是组件的插槽名称，为与其它组件避免冲突，所以在下划线前面加上自定义名称，以作区分
    slots: ['subject_default'],
  },
  {
    type: 'widget',
    label: '等级',
    prop: 'score',
    component: ElSelect,
    slots: [
      {
        // 以对象方式定义插槽，name 为插槽名称, 这里就需要有什么前缀了，component 为插槽内容
        name: 'default',
        component: () => [
          h(ElOption, { label: '优秀', value: 'A' }),
          h(ElOption, { label: '良好', value: 'B' }),
          h(ElOption, { label: '及格', value: 'C' }),
          h(ElOption, { label: '不及格', value: 'D' }),
        ],
      },
    ],
  },
];
</script>
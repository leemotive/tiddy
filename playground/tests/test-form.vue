<template>
  <TdForm ref="formRef" :fields="fields" :model="model" label-width="120">
    <template #prefix>{{ model }}</template>
    <template #outer_empty_action="scope">
      <ElButton type="primary" @click="scope.add">添加联系人</ElButton>
    </template>
    <template #row_action="scope">
      <ElButton  type="primary" @click="scope.add"> + </ElButton>
    </template>
    <template #range-out-empty="scope">
      <ElButton type="warning" @click="scope.add">添加区间</ElButton>
    </template>
  </TdForm>
</template>

<script setup lang="ts">
import { computed, h, markRaw, ref } from 'vue';
import { type TdFormFieldProps, TdForm } from '../../src';
import { useI18n } from 'vue-i18n';
import { ElInput, ElOption, ElSelect, ElSwitch, ElButton } from 'element-plus';

const { t } = useI18n();

const cardOptions = [
  { label: '身份证', value: 'id' },
  { label: '驾驶证', value: 'driver' },
  { label: '护照', value: 'passport' },
];

const fields: TdFormFieldProps[] = [
  {
    type: 'widget',
    label: computed(() => t('school')),
    itemMessageLabel: computed(() => t('labelSchool')),
    prop: 'school',
    component: markRaw(ElInput),
    item: {
      hideRequiredAsterisk: true,
    },
    rules: [{ max: 5, required: true }],
  },
  {
    label: '申请原因',
    prop: 'reason',
    component: markRaw(ElSelect),
    slots: [
      {
        name: 'default',
        component: () => cardOptions.map((option) => h(ElOption, { ...option })),
      },
    ],
  },
  {
    type: 'object',
    prop: 'user',
    label: '负责人',
    fields: [
      {
        type: 'widget',
        label: '姓名',
        prop: 'name',
        component: markRaw(ElInput),
        slots: {
          name: 'suffix',
          text: 'T',
        },
        rules: [{ required: true }, { min: 2 }],
      },
      {
        type: 'widget',
        label: '证件类型',
        prop: 'category',
        component: markRaw(ElSelect),
        slots: [
          {
            name: 'default',
            component: () => cardOptions.map((option) => h(ElOption, { ...option })),
          },
        ],
      },
      {
        type: 'widget',
        prop: 'gender',
        component: markRaw(ElSwitch),
        label: '性别',
        widget: {
          activeValue: 1,
          inactiveValue: 0,
        },
      },
    ],
  },
  {
    type: 'array',
    label: (index) => (index === -1 ? '' : `联系人${index + 1}`),
    prop: 'contacts',
    fields: [
      {
        type: 'widget',
        label: '姓名',
        prop: 'name',
        component: markRaw(ElInput),
        rules: [{ max: 5 }],
      },
      {
        type: 'widget',
        label: '联系电话',
        prop: 'mobilephone',
        component: markRaw(ElInput),
      },
      {
        prop: 'fre',
        type: 'array',
        outerEmptyAction: 'range-out-empty',
        fields: [
          {
            type: 'widget',
            prop: 'rangeStart',
            label: '起始时间',
            component: markRaw(ElInput),
            widget: {
              disabled: computed(() => true),
            },
          },
          {
            type: 'widget',
            prop: 'rangeEnd',
            label: '结束时间',
            component: markRaw(ElInput),
          },
        ],
      },
    ],
  },
];

const model = ref({ contacts: [], school: '23' });
</script>
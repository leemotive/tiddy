<template>
  <TdForm ref="formRef" :fields="fields" :model="model" label-width="120">
    <template #prefix><div style="white-space: pre;">{{ model }}</div></template>
    <template #contacts-action_empty="scope">
      <ElButton type="primary" @click="scope.add">添加联系人</ElButton>
    </template>
    <template #row_action="scope">
      <ElButton  type="primary" @click="scope.add"> + </ElButton>
    </template>
    <template #range-out-empty="scope">
      <ElButton type="warning" @click="scope.add">添加区间</ElButton>
    </template>
    <template #suffix>
      <ElButton type="primary" native-type="submit">Submit</ElButton>
      <ElButton type="primary" @click="revalidate">Reset</ElButton>
    </template>
  </TdForm>
</template>

<script setup lang="ts">
import { computed, h, markRaw, ref, useTemplateRef } from 'vue';
import { type TdFormFieldProps, TdForm } from '../../src';
import { useI18n } from 'vue-i18n';
import { ElInput, ElOption, ElSelect, ElSwitch, ElButton, ElRadioGroup, type FormItemRule } from 'element-plus';

const { t } = useI18n();

const formRef = useTemplateRef('formRef');

const cardOptions = [
  { label: '身份证', value: 'id' },
  { label: '驾驶证', value: 'driver' },
  { label: '护照', value: 'passport' },
];

const fields: TdFormFieldProps[] = [
  {
    type: 'layout',
    hide: computed(() => model.value.school === '22'),
    fields: [
      {
        prop: 'state',
        label: '状态',
        component: markRaw(ElRadioGroup),
        hide: computed(() => model.value.school === '23'),
        widget: {
          options: [
            { label: '未提交', value: '0' },
            { label: '已提交', value: '1' },
            { label: '已通过', value: '2' },
            { label: '已拒绝', value: '3' },
          ],
        },
        on: {
          change: (value) => {
            console.log(value);
          },
        },
      },
      {
        label: 'DNS',
        prop: 'dns',
        hide: computed(() => model.value.state === '0'),
        component: markRaw(ElInput),
        widget: computed(() => ({
          disabled: model.value.state === '1',
        })),
        rules: [
          {
            validator: (rule: FormItemRule, value: any) => {
              if (model.value.reason === 'passport') {
                return Error('错误格式');
              }
              return true;
            },
          },
          { required: true },
        ],
      },
    ],
  },
  {
    type: 'widget',
    label: computed(() => t('school')),
    modifiers: ['trim'],
    itemMessageLabel: computed(() => t('labelSchool')),
    prop: 'school',
    component: ElInput,
    widget: computed(() => ({
      disabled: model.value.state === '1',
    })),
    item: {
      hideRequiredAsterisk: true,
    },
    rules: [{ required: true }],
    on: {
      blur() {
        console.log('blur');
      },
    },
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
        item: {errorLayout: 'expand'},
        component: markRaw(ElInput),
        slots: {
          name: 'suffix',
          text: 'T',
        },
        rules: [{ required: true, message: '这是一个很长很长很长很长的错误信息' }, { min: 2 }],
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
    label: (index: number) => (index === -1 ? '联系人' : `联系人${index + 1}`),
    prop: 'contacts',
    fields: [
      {
        type: 'widget',
        label: '姓名',
        prop: 'name',
        component: ElInput,
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

const model = ref({ contacts: [], school: '23', state: '0', reason: 'id' });

function revalidate() {
  formRef.value?.reValidateErrorFields('school');
}
</script>

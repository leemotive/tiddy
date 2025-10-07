<template>
  <TdForm :fields="fields" v-bind="$attrs">
    <template #contacts-action_outer="scope">
      <ElButton class="add-first" plain @click="scope.add">增加联系人</ElButton>
    </template>
  </TdForm>
</template>
<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus';
import TdForm from '../../src/form/form.vue';
import type { TdFormFieldProps } from '../../src/form/utils';

const fields: TdFormFieldProps[] = [
  { label: 'First Name', prop: 'firstName', component: ElInput },
  { label: 'Last Name', prop: 'lastName', component: ElInput },
  {
    label: '',
    labelWidth: '0',
    prop: 'range',
    fields: [
      { label: 'Start', prop: 'start', itemClass: 'range-start', component: ElInput },
      { label: 'End', prop: 'end', itemClass: 'range-end', component: ElInput },
    ],
  },
  {
    type: 'array',
    label: 'Contacts',
    prop: 'contacts',

    fields: [
      {
        label: 'name',
        prop: 'name',
        component: ElInput,
        item: {
          class: 'contact-name',
        },
      },
      {
        label: 'phone',
        prop: 'phone',
        component: ElInput,
        item: {
          class: 'contact-phone',
        },
      },
    ],
  },
];
</script>
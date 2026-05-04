<template>
  <ElButton type="primary" @click="activeTab = activeTab === 'basic' ? 'detail' : 'basic'">切换Tab</ElButton>
  <ElButton type="primary" @click="changeTabPosition">切换Tab位置</ElButton>
<TdForm :fields="fields" :model="model" label-width="80" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElTabPane, ElTabs, ElButton } from 'element-plus';
import { type TdFormFieldProps, TdForm, widget } from 'tiddy';

const activeTab = ref('detail');
const tabPosition = ref('top');
function changeTabPosition() {
  tabPosition.value = tabPosition.value === 'top' ? 'left' : 'top';
}

const model = ref({});
const fields: TdFormFieldProps[] = [
  {
    type: 'layout',
    prop: '',
    component: ElTabs,
    widget: { modelValue: activeTab, tabPosition },
    on: {'update:modelValue': v => {activeTab.value = v}},
    fields: [
      {
        type: 'layout',
        ...widget(ElTabPane, {label: '基本信息', name: 'basic'}),
        fields: [
          {
            label: '姓名',
            prop: 'name',
            component: ElInput,
          },
        ]
      },
      {
        type: 'layout',
        ...widget(ElTabPane, {label: '详细信息', name: 'detail'}),
        fields: [
          {
            label: '年龄',
            prop: 'age',
            component: ElInput,
          },
        ]
      }
      
    ],
  },
];
</script>
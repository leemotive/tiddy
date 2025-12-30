<template>
  <ElConfigProvider :lcoale="zhCn">
    <ElRadioGroup v-model="test">
      <ElRadioButton type="primary" value="form">测试表单</ElRadioButton>
      <ElRadioButton type="primary" value="table">测试表格</ElRadioButton>
      <ElRadioButton type="primary" value="dialog">测试弹窗</ElRadioButton>
      <ElRadioButton type="primary" value="select">测试枚举选择器</ElRadioButton>
    </ElRadioGroup>

    <TestForm v-if="test === 'form'" />
    <TestTable v-if="test === 'table'" />
    <TestDialog v-if="test === 'dialog'" />
    <TestSelect v-if="test === 'select'" />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider, ElRadioButton, ElRadioGroup } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs';
import Schema from 'async-validator';

import TestForm from '../tests/test-form.vue';
import TestTable from '../tests/test-table.vue';
import TestDialog from '../tests/test-dialog.vue';
import TestSelect from '../tests/test-select.vue';

import { ref } from 'vue';

const test = ref('form');

// 设置 async-validator 的默认中文错误消息
Object.assign(Schema.messages, {
  default: '字段 %s 验证失败',
  required: '%s是必填字段',
  enum: '%s 必须是 %s 中的一个',
  whitespace: '%s 不能为空',
  date: {
    format: '%s 日期 %s 无效, 格式应为 %s',
    parse: '%s 日期无法解析, %s 无效',
    invalid: '%s 日期 %s 无效',
  },
  types: {
    string: '%s 不是有效的 %s',
    method: '%s 不是有效的 %s (function)',
    array: '%s 不是有效的 %s',
    object: '%s 不是有效的 %s',
    number: '%s 不是有效的 %s',
    date: '%s 不是有效的 %s',
    boolean: '%s 不是有效的 %s',
    integer: '%s 不是有效的 %s',
    float: '%s 不是有效的 %s',
    regexp: '%s 不是有效的 %s',
    email: '%s 不是有效的 %s',
    url: '%s 不是有效的 %s',
    hex: '%s 不是有效的 %s',
  },
  string: {
    len: '%s 长度必须为 %s 个字符',
    min: '%s 长度不能少于 %s 个字符',
    max: 'el.errors.string.max\0%s\0%s',
    range: '%s 长度应在 %s 和 %s 个字符之间',
  },
  number: {
    len: '%s 必须等于 %s',
    min: '%s 不能小于 %s',
    max: '%s 不能大于 %s',
    range: '%s 应在 %s 和 %s 之间',
  },
  array: {
    len: '%s 长度必须为 %s',
    min: '%s 长度不能少于 %s',
    max: '%s 长度不能超过 %s',
    range: '%s 长度应在 %s 和 %s 之间',
  },
  pattern: {
    mismatch: '%s 值 %s 不匹配模式 %s',
  },
});
</script>



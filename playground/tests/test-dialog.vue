<template>
  <div>
    <ElButton type="primary" @click="openDialog">打开弹窗</ElButton>
    <TdDialog ref="dialog" title="测试">
      <div>测试内容</div>
      <template #footer="scope">
        <ElButton type="primary" @click="scope.step">确定</ElButton>
      </template>
    </TdDialog>
  </div>
</template>
<script setup lang="ts">
import { TdDialog } from '../../src';
import { useTemplateRef } from 'vue';
import { ElButton } from 'element-plus';

const dialogRef = useTemplateRef('dialog');
async function openDialog() {
  const { close } = await dialogRef.value!.open();
  close();
}
</script>

<template>
  <ElButton type="primary" @click="openDialog">打开弹窗</ElButton>
  <TdDialog ref="dialog" title="标题" :show-close="false">
    <div>内容</div>
    <template #footer="scope">
      <ElButton type="primary" @click="scope.step()">确定</ElButton>
    </template>
  </TdDialog>
</template>

<script setup lang="ts">
import { TdDialog } from 'tiddy';
import { useTemplateRef } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';

const dialogRef = useTemplateRef('dialog');

async function openDialog() {
  const { promise, close } = dialogRef.value!.open();
  await promise;
  const { value } = await ElMessageBox.prompt('自定义操作，比如提交表单，1：成功并关闭弹窗，0：失败不关闭弹窗', '提示');
  if (value === '1') {
    close();
  }
}
</script>


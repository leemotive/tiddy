<template>
  <ElButton type="primary" @click="openDialog">打开弹窗</ElButton>
  <ElButton type="primary" @click="openDialog2">打开弹窗</ElButton>

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
  const { close } = dialogRef.value!.open();

  // 使用循环
  while (true) {
    await dialogRef.value!.wait();
    const { value } = await ElMessageBox.prompt(
      '自定义操作，比如提交表单，1：成功并关闭弹窗，0：失败不关闭弹窗',
      '提示',
    );
    if (value === '1') {
      close();
      break;
    }
  }
  // 后续其它处理逻辑
}

async function openDialog2() {
  const { close } = dialogRef.value!.open();

  await afterClose();

  // 使用递归
  async function afterClose() {
    await dialogRef.value!.wait();
    const { value } = await ElMessageBox.prompt(
      '自定义操作，比如提交表单，1：成功并关闭弹窗，0：失败不关闭弹窗',
      '提示',
    );
    if (value !== '1') {
      return afterClose();
    }
    close();
  }
}
</script>


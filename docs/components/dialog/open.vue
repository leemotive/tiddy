<template>
  <ElButton type="primary" @click="openDialog">打开弹窗</ElButton>
  <TdDialog ref="dialog" title="标题" :show-close="false">
    <div>内容</div>
    <template #footer="scope">
      <ElButton type="default" @click="scope.close">取消</ElButton>
      <ElButton type="primary" @click="scope.ok">确定</ElButton>
    </template>
  </TdDialog>
</template>

<script setup lang="ts">
import { TdDialog } from 'tiddy';
import { useTemplateRef } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';

const dialogRef = useTemplateRef('dialog');

async function openDialog() {
  try {
    await dialogRef.value?.open().promise;
    ElMessageBox.alert('你通过确定关闭弹窗', '提示');
  } catch {
    ElMessageBox.alert('你通过取消关闭弹窗', '提示');
  }
}
</script>


<template>
  <ElButton type="primary" @click="openDialog">打开弹窗</ElButton>
  <TdDialog ref="dialog" title="标题">
    <div>内容</div>
    <template #footer="scope">
      <ElButton type="primary" @click="scope.ok('confirm1')">确定一</ElButton>
      <ElButton type="primary" @click="scope.ok('confirm2')">确定二</ElButton>
      <ElButton type="primary" @click="scope.close('cancel')">取消</ElButton>
    </template>
  </TdDialog>
</template>

<script setup lang="ts">
import { TdDialog } from 'tiddy';
import { useTemplateRef } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';

const dialogRef = useTemplateRef('dialog');

async function openDialog() {
  let res!: any;
  try {
    res = await dialogRef.value!.open().promise;
  } catch (e) {
    res = e;
  }
  ElMessageBox.alert(res, '提示');
}
</script>


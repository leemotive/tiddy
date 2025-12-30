<template>
  <TdEnumSelect code="order_status" :fetch="fetchOp" v-model="status" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TdEnumSelect } from '../../src';

const status = ref('pending');
async function fetchOp(code: string) {
  return new Promise<any>((resolve) =>
    setTimeout(() => {
      resolve([
        { label: '待付款', value: 'pending' },
        { label: '已付款', value: 'paid' },
        { label: '已发货', value: 'shipped' },
        { label: '已完成', value: 'completed' },
        { label: '已取消', value: 'canceled' },
      ]);
    }, 6000),
  );
}
</script>
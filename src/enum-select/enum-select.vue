<template>
  <ElSelect ref="selectRef" :options="options" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
      <slot v-bind="scope" :name="name"></slot>
    </template>
  </ElSelect>
</template>

<script lang="ts" setup>
import { ElSelect, type SelectInstance } from 'element-plus';
import { useTemplateRef } from 'vue';
import { getOptions, type DataOption } from './store';

const props = defineProps<{
  code: string;
  fetch?: DataOption<any>['fetch'];
}>();

const selectRef = useTemplateRef('selectRef');

const options = getOptions(props.code, props.fetch);

defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return Reflect.get(selectRef.value || {}, key);
      },
      has(target, key) {
        return Reflect.has(selectRef.value || {}, key);
      },
    },
  ) as SelectInstance,
);
</script>

<style lang="scss" scoped></style>
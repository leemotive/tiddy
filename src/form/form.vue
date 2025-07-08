<template>
  <ElForm ref="form" v-bind="subProps" @submit.prevent="submit">
    <slot name="prefix" />
    <slot>
      <FormField v-for="field in fields" :key="getKey(field)" v-bind="field" />
    </slot>
    <slot name="suffix" />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, formProps, type FormInstance, type FormEmits, type FormItemProps } from 'element-plus';
import { computed, provide, useSlots, useTemplateRef } from 'vue';
import FormField from './form-field.vue';
import { formCtxKey, formPropsDef } from './utils';
import { getKey, getSlotsFactory } from '../utils';
import { cut } from 'yatter';

const formRef = useTemplateRef<FormInstance>('form');
const props = defineProps({
  ...formProps,
  ...formPropsDef,
});

const emit = defineEmits<
  FormEmits & {
    submit: [data: any];
  }
>();

const slots = useSlots();

const subProps = computed(() => cut(props, Object.keys(formPropsDef)));

async function submit() {
  await formRef.value?.validate();
  emit('submit', props.model);
}

provide(formCtxKey, {
  model: props.model,
  itemOption: props.item as FormItemProps,
  getParentSlots: getSlotsFactory(slots),
});

function reValidateErrorFields() {
  for (const field of formRef.value?.fields ?? []) {
    if (field.validateStatus === 'error') {
      field.validate('');
    }
  }
}

const expose = {
  reValidateErrorFields,
  model: computed(() => props.model),
};
defineExpose(
  new Proxy(expose, {
    get(target, key) {
      return Reflect.get(target, key) || Reflect.get(formRef.value || {}, key);
    },
    has(target, key) {
      return Object.hasOwn(target, key) || Reflect.has(formRef.value || {}, key);
    },
  }),
);
</script>

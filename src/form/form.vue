<template>
  <ElForm ref="form" v-bind="$attrs" @submit.prevent="submit">
    <slot name="prefix" />
    <slot>
      <FormField v-for="field in fields" :key="getKey(field)" v-bind="field" />
    </slot>
    <slot name="suffix" />
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus';
import type { FormInstance, FormItemProp } from 'element-plus';
import { computed, provide, reactive, toRef, useAttrs, useSlots, useTemplateRef } from 'vue';
import FormField from './form-field.vue';
import { formCtxKey, formPropsDef } from './utils';
import { getKey, getSlotsFactory } from '../utils';
import { ensureArray } from 'yatter';

const formRef = useTemplateRef('form');
const props = defineProps(formPropsDef);

const emit = defineEmits<{
  submit: [data: any];
}>();

const slots = useSlots();

const attrs = useAttrs();
async function submit() {
  await formRef.value?.validate();
  emit('submit', attrs.model);
}

provide(
  formCtxKey,
  reactive({
    model: toRef(attrs, 'model'),
    itemOption: props.item,
    getParentSlots: getSlotsFactory(slots),
  }),
);

function reValidateErrorFields(props?: FormItemProp) {
  let fields = formRef.value?.fields ?? [];
  if (props) {
    fields = fields.filter((f) => {
      return ensureArray(props).includes(f.propString);
    });
  }
  for (const field of fields) {
    if (field.validateState === 'error') {
      field.validate('');
    }
  }
}

const expose = {
  reValidateErrorFields,
  model: computed(() => attrs.model),
};
type __TdFormExpose = typeof expose & FormInstance;
defineExpose(
  new Proxy(expose, {
    get(target, key) {
      return Reflect.get(target, key) || Reflect.get(formRef.value || {}, key);
    },
    has(target, key) {
      return Object.hasOwn(target, key) || Reflect.has(formRef.value || {}, key);
    },
  }) as __TdFormExpose,
);
</script>

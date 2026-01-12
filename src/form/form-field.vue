<template>
<Transition name="field">
  <component :is="FieldComponents" v-bind="fieldAttrs" :full-prop="fullProp" />
</Transition>
</template>
<script setup lang="ts">
import { computed, isRef, markRaw, toRaw, useAttrs } from 'vue';
import ObjectField from './object-field.vue';
import WidgetField from './widget-field.vue';
import ArrayField from './array-field.vue';
import LayoutField from './layout-field.vue';
import { getDeepValue, isFunction } from 'yatter';
import { formCtxKey, type FormContext } from './utils';
import { inject } from 'vue';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const fullProp = computed(() => attrs['full-prop'] || attrs.prop);
const formCtx = inject<FormContext>(formCtxKey)!;

const fieldAttrs = computed(() => {
  const attr: Record<string, any> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'component' && v) {
      attr[k] = markRaw(toRaw(v));
    } else if (k === 'fields' && isFunction(v) && !attrs.type) {
      attr[k] = v(getDeepValue(formCtx.model, attrs['full-prop'] as string));
    } else {
      attr[k] = v;
    }
  }
  return attr;
});

function isHidden() {
  if (attrs.hide === true) {
    return true;
  }
  if (isFunction(attrs.hide)) {
    return attrs.hide(attrs);
  }
  if (isRef(attrs.hide)) {
    return attrs.hide.value;
  }
  return false;
}
const FieldComponents = computed(() => {
  if (isHidden()) {
    return 'div';
  }
  if (attrs.type === 'array') {
    return ArrayField;
  }
  if (attrs.type === 'layout') {
    return LayoutField;
  }
  if (attrs.type === 'object' || (!attrs.type && !!attrs.fields)) {
    return ObjectField;
  }
  if (attrs.type === 'widget' || (!attrs.type && !!attrs.component)) {
    return WidgetField;
  }
  return 'div';
});
</script>
<style lang="css">
.field-enter-active, .field-leave-active {
  transition: all 0.2s;
  overflow: hidden;
}

.field-enter-to, .field-leave-from {
  height: calc-size(auto, size) !important;
  opacity: 1 !important;
}

.field-enter-from, .field-leave-to {
  height: 0 !important;
  margin-bottom: 0 !important;
  opacity: 0 !important;
}
</style>
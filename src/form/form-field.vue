<template>
<component :is="FieldComponents" v-bind="fieldAttrs" :full-prop="fullProp" />
</template>
<script setup lang="ts">
import { computed, Fragment, isRef, markRaw, toRaw, useAttrs } from 'vue';
import ObjectField from './object-field.vue';
import WidgetField from './widget-field.vue';
import ArrayField from './array-field.vue';
import LayoutField from './layout-field.vue';
import { isFunction } from 'yatter';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const fullProp = computed(() => attrs['full-prop'] || attrs.prop);

const fieldAttrs = computed(() => {
  const attr: Record<string, any> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'component' && v) {
      attr[k] = markRaw(toRaw(v));
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
    return Fragment;
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
  return Fragment;
});
</script>
<style lang="scss" scoped>
</style>
<template>
<component :is="FieldComponents" v-bind="attrs" :full-prop="fullProp" />
</template>
<script setup lang="ts">
import { computed, Fragment, useAttrs } from 'vue';
import ObjectField from './object-field.vue';
import WidgetField from './widget-field.vue';
import ArrayField from './array-field.vue';
import LayoutField from './layout-field.vue';

const attrs = useAttrs();

const fullProp = computed(() => attrs['full-prop'] || attrs.prop);

const FieldComponents = computed(() => {
  if (attrs.hide) {
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
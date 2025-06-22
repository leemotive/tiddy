import type { Component, InjectionKey, PropType, Slot } from 'vue';
import type { OrFunction, SlotDef } from '../types';
import type { FormContext } from '../form/utils';

export const deepSlotPropsDef = {
  name: {
    type: String,
    required: true as const,
  },
  component: {
    type: Object as PropType<Component | Slot>,
  },
  props: {
    type: Function as PropType<(scope?: any) => Record<string, any>>,
    default: (p: any) => p || {},
  },
  text: {
    type: [String, Function] as PropType<OrFunction<string>>,
  },
  slots: {
    type: [Array, String] as PropType<SlotDef[] | string>,
  },
  isSlot: {
    type: Boolean,
  },

  ctxKey: {
    type: Symbol as PropType<InjectionKey<FormContext>>,
    required: true as const,
  },
  scope: {
    type: Object as PropType<any>,
  },
};

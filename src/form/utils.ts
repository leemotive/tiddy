import type { FormItemProps, FormItemRule, FormProps } from 'element-plus';
import type {
  AllowedComponentProps,
  Component,
  ComputedRef,
  CSSProperties,
  DefineComponent,
  ExtractPublicPropTypes,
  InjectionKey,
  PropType,
  Raw,
} from 'vue';
import type { AnyFunction, GetSlotsFunction, MakeOptional, OrArray, OrFunction, SlotDef } from '../types';

const fieldsPropsDef = {
  fields: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
};
export type TdFieldsProps = {
  fields: TdFormFieldProps[];
};

const commonFieldPropsDef = {
  prop: {
    type: [String, Function] as PropType<OrFunction<string>>,
    required: true as const,
  },
  hide: {
    type: [Boolean, Function, Object] as PropType<OrFunction<boolean> | ComputedRef>,
    default: false,
  },
  label: {
    type: [String, Function, Object] as PropType<OrFunction<string> | ComputedRef<string>>,
  },
  labelWidth: {
    type: [String, Number, Function] as PropType<OrFunction<string | number>>,
  },
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'auto'>,
  },
};
export const objectFieldPropsDef = {
  type: {
    type: String as PropType<'object'>,
    default: 'object',
  },
  ...fieldsPropsDef,
  ...commonFieldPropsDef,
};

export type TdObjectFieldProps = TdFieldsProps &
  Omit<ExtractPublicPropTypes<typeof objectFieldPropsDef>, 'fields'> &
  AllowedComponentProps;

export const widgetFieldPropsDef = {
  type: {
    type: String as PropType<'widget'>,
    default: 'widget',
  },
  component: {
    type: [String, Object, Function] as PropType<string | Component | Raw<Component>>,
  },
  modifiers: {
    type: Array as PropType<Array<'lazy' | 'number' | 'trim'>>,
    default: () => [],
  },
  parser: {
    type: Function as PropType<AnyFunction>,
    default: (value: any) => value,
  },
  formatter: {
    type: Function as PropType<AnyFunction>,
    default: (value: any) => value,
  },
  item: {
    type: Object as PropType<TdFormItemProps>,
    default: () => ({}),
  },
  widget: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  on: {
    type: Object as PropType<Record<string, AnyFunction>>,
    default: () => ({}),
  },
  rules: {
    type: [Array, Object] as PropType<OrArray<FormItemRule>>,
    default: () => [],
  },
  slots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => null,
  },
  prependSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => null,
  },
  appendSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => null,
  },
  itemSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => null,
  },
  default: {
    type: [String, Number, Boolean, Array, Object] as PropType<any>,
    default: undefined,
  },
  ...commonFieldPropsDef,
};
type PropsOf<C> =
  // .vue SFC and many typed components
  C extends DefineComponent<infer P, any, any, any, any> ? P :
  // class-style / constructor components
  C extends new (...args: any) => any ? InstanceType<C> extends { $props: infer P } ? P : Record<string, any> :
  // fallback
  Record<string, any>;
export type TdWidgetFieldProps = ExtractPublicPropTypes<typeof widgetFieldPropsDef> & AllowedComponentProps & Record<PropertyKey, any>;

export const arrayFieldPropsDef = {
  type: {
    type: String as PropType<'array'>,
    default: 'array',
    required: true as const,
  },
  rawValue: {
    type: Function as PropType<AnyFunction>,
  },
  outerEmptyAction: {
    type: String,
    default: null,
  },
  emptyAction: {
    type: String,
    default: null,
  },
  rowAction: {
    type: String,
    default: null,
  },
  lineStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
  ...fieldsPropsDef,
  ...commonFieldPropsDef,
};
export type TdArrayFieldProps = TdFieldsProps &
  ExtractPublicPropTypes<typeof arrayFieldPropsDef> &
  AllowedComponentProps;

export const layoutFieldPropsDef = {
  type: {
    type: String as PropType<'layout'>,
    default: 'layout',
    required: true as const,
  },
  slots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => [],
  },
  ...fieldsPropsDef,
  ...commonFieldPropsDef,
};
export type TdLayoutFieldProps = Partial<TdFieldsProps> &
  MakeOptional<ExtractPublicPropTypes<typeof layoutFieldPropsDef>, "prop"> &
  AllowedComponentProps;

export type TdFormFieldProps = TdObjectFieldProps | TdWidgetFieldProps | TdArrayFieldProps | TdLayoutFieldProps;

export const formPropsDef = {
  fields: {
    type: Array as PropType<TdFormFieldProps[]>,
    default: () => [],
  },
  item: {
    type: Object as PropType<FormItemProps>,
    default: () => ({}),
  },
};
export type TdFormProps = ExtractPublicPropTypes<typeof formPropsDef> & FormProps;

export interface FormContext {
  model: any;
  itemOption?: FormItemProps;
  getParentSlots: GetSlotsFunction;
}
export const formCtxKey: InjectionKey<FormContext> = Symbol('formCtxKey');

export type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};


export const tdformItemProps = {
  messageLabel: {
    type: [String, Object] as PropType<string | ComputedRef<string>>,
    default: '',
  },
  formatMessage: {
    type: Function as PropType<AnyFunction>,
    default: null,
  },
  hideRequiredAsterisk: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export type TdFormItemProps = ExtractPublicPropTypes<typeof tdformItemProps> & Partial<FormItemProps>;

export function widget<T>(c: T, props?: PropsOf<T>) {
  return { component: c, widget: props };
};
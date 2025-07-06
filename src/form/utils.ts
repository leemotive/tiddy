import { formItemProps, type FormItemProps, type FormItemRule, type FormProps } from 'element-plus';
import type {
  AllowedComponentProps,
  Component,
  ComputedRef,
  CSSProperties,
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
    type: [Boolean, Object] as PropType<boolean | ComputedRef>,
    default: false,
  },
  hideLabel: {
    type: [Boolean, Function] as PropType<OrFunction<boolean>>,
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
    type: [String, Object] as PropType<string | Component | Raw<Component>>,
    required: true,
  },
  modifiers: {
    type: Array as PropType<Array<'lazy' | 'number' | 'trim'>>,
    default: () => [],
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
    default: () => [],
  },
  prependSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => [],
  },
  appendSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => [],
  },
  itemSlots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => [],
  },
  default: {
    type: [String, Number, Boolean, Array, Object] as PropType<any>,
    default: undefined,
  },
  ...commonFieldPropsDef,
};
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
    default: 'outer_empty_action',
  },
  emptyAction: {
    type: String,
    default: 'empty_action',
  },
  rowAction: {
    type: String,
    default: 'row_action',
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
export const formItemPropsDef = {
  ...formItemProps,
  ...tdformItemProps,
}

export type TdFormItemProps = ExtractPublicPropTypes<typeof formItemPropsDef>;
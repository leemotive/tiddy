import TdForm from './form.vue';
import TdFormItem from './form-item.vue';
import TdFormField from './form-field.vue';
import type { FormInstance } from 'element-plus';

export { type TdFormFieldProps, type TdFormProps, formPropsDef, widget } from './utils';
type Instance = InstanceType<typeof TdForm>;
export type TdFormInstance = Instance & Omit<FormInstance, keyof Instance>;
export type TdFormItemInstance = InstanceType<typeof TdFormItem>;

export { TdForm, TdFormItem, TdFormField };

import type { DialogInstance } from 'element-plus';
import TdDialog from './dialog.vue';

export { type TdDialogProps, dialogPropsDef } from './utils';
type Instance = InstanceType<typeof TdDialog>;
export type TdDialogInstance = Instance & Omit<DialogInstance, keyof Instance & string>;
export { TdDialog };

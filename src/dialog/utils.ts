import { dialogProps } from "element-plus";
import type { ExtractPublicPropTypes } from "vue";
import { cut } from "yatter";

export const dialogPropsDef = {
  ...cut(dialogProps, ['modelValue'])
}

export type TdDialogProps = ExtractPublicPropTypes<typeof dialogPropsDef>;
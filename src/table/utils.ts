import type { ExtractPublicPropTypes, PropType } from "vue"
import type { AnyFunction, GetSlotsFunction, OrArray, SlotDef } from "../types";

import type { InjectionKey } from 'vue';
import tableProps from 'element-plus/es/components/table/src/table/defaults.mjs';
import tableColumnProps from 'element-plus/es/components/table/src/table-column/defaults.mjs';

export interface TableContext {
  getParentSlots: GetSlotsFunction;
}
export const tableCtxKey: InjectionKey<TableContext> = Symbol('tableCtxKey');

export const tableColumnPropsDef = {
  slots: {
    type: [Array, Object] as PropType<OrArray<SlotDef>>,
    default: () => null,
  },
  columns: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  transform: {
    type: Array as PropType<AnyFunction[]>,
    default: () => [],
  },
  ...tableColumnProps,
};

type ColumnsType = {
  columns?: TdTableColumnProps[];
};

export type TdTableColumnProps = ColumnsType & ExtractPublicPropTypes<Omit<typeof tableColumnPropsDef, "columns">>;

export const tablePropsDef = {
  columns: {
    type: Array as PropType<TdTableColumnProps[]>,
    default: () => [],
  },
  ...tableProps,
};

export type TdTableProps = ExtractPublicPropTypes<typeof tablePropsDef>;
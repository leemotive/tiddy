import type { ExtractPublicPropTypes, PropType, Ref } from "vue"
import type { AnyFunction, GetSlotsFunction, OrArray, SlotDef } from "../types";
import type { TableColumnInstance } from 'element-plus'

import type { InjectionKey } from 'vue';

export interface TableContext {
  getParentSlots: GetSlotsFunction;
}
export const tableCtxKey: InjectionKey<TableContext> = Symbol('tableCtxKey');

type TableColumnProp = {
  slots: {
    type: PropType<OrArray<SlotDef>>;
    default: null;
  };
  columns: {
    type: PropType<TdTableColumnProps[]>;
    default: () => never[];
  };
  transform: {
    type: PropType<AnyFunction[]>;
    default: () => never[];
  };
  hide: {
    type: PropType<boolean | Ref<boolean>>,
    default: false,
  }
  dangerouslyUseHTMLString: {
    type: PropType<boolean | Ref<boolean>>,
    default: false,
  }
}
export type TdTableColumnProps = ExtractPublicPropTypes<TableColumnProp> & TableColumnInstance["$props"];
export const tableColumnPropsDef: TableColumnProp = {
  slots: {
    type: [Array, Object, String] as PropType<OrArray<SlotDef>>,
    default: null,
  },
  columns: {
    type: Array as PropType<TdTableColumnProps[]>,
    default: () => [],
  },
  transform: {
    type: Array as PropType<AnyFunction[]>,
    default: () => [],
  },
  hide: {
    type: [Boolean, Object] as PropType<boolean | Ref<boolean>>,
    default: false,
  },
  dangerouslyUseHTMLString: {
    type: [Boolean, Object] as PropType<boolean | Ref<boolean>>,
    default: false,
  }
};



export const tablePropsDef = {
  columns: {
    type: Array as PropType<TdTableColumnProps[]>,
    default: () => [],
  },
};

export type TdTableProps = ExtractPublicPropTypes<typeof tablePropsDef>;
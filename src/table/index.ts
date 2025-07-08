import TdTable from './table.vue';
import TdTableCol from './table-col.vue';
import type { TableInstance } from 'element-plus';

export { type TdTableProps, type TdTableColumnProps, tablePropsDef, tableColumnPropsDef } from './utils';
type Instance = InstanceType<typeof TdTable>;
export type TdTableInstance = Instance & Omit<TableInstance, keyof Instance>;

export { TdTable, TdTableCol };
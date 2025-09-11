# Table

对`ElTable`的二次封装, 不需要反复写`ElTableColumn`, 通过`columns`属性即可完成表格的配置
```ts
import {TdTable, type TdTableColumnProps} from 'tiddy';
```

`TdTable` 除了支持 `ElTable` 的所有属性外, 还支持以下属性:
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| columns | `TdTableColumnProps[]` | - | 表格列配置 |

`columns`是配置 `TdTableCol` 属性，除了支持 `ElTableColumn` 的属性外, 还支持以下属性:
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| slots | `string \| array \| object` | - | 插槽配置, 支持字符串配合模板，或者直接使用对象配合h函数 |
| transform | `Array<(value: any) => any)>` | - | 依次调用，前一个函数的结果作为后一个函数的输入，页面显示最一个函数的返回值 |
| columns | `TdTableColumnProps[]` | - | 同`TdTable`, 用于嵌套表头时配置 |


## 基础用法
<demo vue="table.vue" />

## 事件
<demo vue="events.vue" />

## 表头嵌套
<demo vue="nest.vue" />

## 可选择行
<demo vue="select.vue" />

## 列插槽
<demo vue="slot.vue" />

## 数值转换
<demo vue="format.vue" />
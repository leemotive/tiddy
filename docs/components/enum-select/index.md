# EnumSelect

通过`code`，使用自定义的逻辑，自动获取`ElSelect`的option数据,并自动更新

`TdEnumSelect` 除了支持 `ElSelect` 的所有属性外, 还支持以下属性:
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fetch | `(code: string) => Promise<{label: string; value: string}[]>` | - | 自定义获取options数据的函数 |
| code | `string` | - | 传递给fetch函数的参数 |

## 基础使用
<demo vue="base.vue" />
# Form
对`ElForm`的二次封装，通过 json 配置生成表单, 支持对象类型和数组类型以及布局类等, 不内置任何输入组件，按需引入，避免打包用不到的组件。

```ts
import {TdForm, TdFormField, TdFormItem, type TdFormFieldProps, } from 'tiddy';

const fields: TdFormFieldProps[] = [];
```

`TdForm` 组件用于替代 `ElForm` 组件，`TdFormItem` 组件用于替代 `ElFormItem` 组件

`TdForm` 组件相比 `ElForm` 组件，新增了以下属性：
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fields | TdFormFieldProps[] | [] | 表单字段配置 |

使用 `TdForm` 组件时，不需要重复使用 `FormItem`, 而是在 `fields` 中配置表单字段。支持以下配置项：
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | enum | - | 表单字段类型, 支持的值有 `object`, `array`, `layout`, `widget` |
| label | string \| function \| ComputedRef\<string> | - | 表单字段标签, 在数组件型字段时，可以使用函数来生成带序号的label |
| component | string | - | 用在widget型字段，声明具体的控件，如`ElInput`, `ElSelect`, `ElSwitch` 等 |
| prop | string | - | 字段属性 |
| slots | string \| array | - | 当前仅在`layout`, `widget`类型字段中生效, 给控制传递的slot, 如果使用字符串，则需要在`TdForm`中使用模板定义插槽，也可以使用对象配置`h`函数直接在js定义插槽内容 |
| fields | TdFormFieldProps[] | - | 子字段配置, 可以进行数组对象布局的嵌套，而`widget`型字段就需要再有子字段了 |
| hide | boolean \| ComputedRef\<boolean> \| function | false | 是否隐藏字段 |
| labelWidth | string \| number \| function | - | 同`ElFormItem`配置， 在数组型字段中可以使用函数 |
| labelPosition | enum | - | 同`ElFormItem`配置，在数组型字段中可以使用函数 |
| modifiers | enum | - | 当前仅支持 `lazy` \| `number` \| `trim` |
| item | object | - | FormItem的属性项 |
| widget | object | - | 输入控件的属性项，如需要给`ElInput`, `ElSelect`设置属性 |
| on | object | - | 输入控件事件配置 |
| rules | object | - | 表单验证规则, 配置方式同 `ElForm` |
| prependSlots | | | 在`widget`型字段生效，配置方式同slots, 入在控件前的内容 |
| appendSlots | | | 在`widget`型字段生效，配置方式同slots, 入在控件后的内容 |
| default | any | - | 字段默认值 |
| outerEmptyAction | string | - | 在`array`型字段生效，定义在没有数据时的插槽，此时不会显示label |
| emptyAction | string | - | 在`array`型字段生效，定义在没有数据时的插槽, 此时会显示label |
| rowAction | string | - | 在`array`型字段生效，定义每一行操作插槽 |
| rawValue | function |  | 在增加一行时，通过此函数返回行的初始值 |
| mandatory | boolean | false | 初始化时，是否默认自动插入一条 |

`FormItem` 组件除了支持 `ElFormItem` 的属性外，还支持以下属性：
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| messageLabel | string \| ComputedRef\<string> | - | 当`FormItem`label没有显示的时候，可以使用这个字段定义表单验证消息中的字段名，在验证消息中优先使用这个字段  |
| formatMessage | function | - | 对错误消息进行格式化，可以在这里引入`i18n`等 |
| hideRequiredAsterisk | boolean | false | 是否隐藏`required`字段的星号 |


## 基础使用
<demo vue="base.vue" />

## 对象结构
<demo vue="object.vue" />

## 数组结构
<demo vue="array.vue" />

## 数据转换
<demo vue="format.vue" />

## 布局类
<demo vue="layout.vue" />

## 组件插槽
<demo vue="select.vue" />

## 字段关联
<demo vue="relation.vue" />

## 表单验证
<demo vue="rules.vue" />

## 自定义消息
<demo vue="message.vue" />
`async-validator` 内置了多种规则，在项目中可以根据需要设置
```json
{
  "default": 'Validation error on field %s',
  required: '%s is required',
  "enum": '%s must be one of %s',
  whitespace: '%s cannot be empty',
  date: {
    format: '%s date %s is invalid for format %s',
    parse: '%s date could not be parsed, %s is invalid ',
    invalid: '%s date %s is invalid'
  },
  types: {
    string: '%s is not a %s',
    method: '%s is not a %s (function)',
    array: '%s is not an %s',
    object: '%s is not an %s',
    number: '%s is not a %s',
    date: '%s is not a %s',
    "boolean": '%s is not a %s',
    integer: '%s is not an %s',
    "float": '%s is not a %s',
    regexp: '%s is not a valid %s',
    email: '%s is not a valid %s',
    url: '%s is not a valid %s',
    hex: '%s is not a valid %s'
  },
  string: {
    len: '%s must be exactly %s characters',
    min: '%s must be at least %s characters',
    max: '%s cannot be longer than %s characters',
    range: '%s must be between %s and %s characters'
  },
  number: {
    len: '%s must equal %s',
    min: '%s cannot be less than %s',
    max: '%s cannot be greater than %s',
    range: '%s must be between %s and %s'
  },
  array: {
    len: '%s must be exactly %s in length',
    min: '%s cannot be less than %s in length',
    max: '%s cannot be greater than %s in length',
    range: '%s must be between %s and %s in length'
  },
  pattern: {
    mismatch: '%s value %s does not match pattern %s'
  },
}
```

## 配合vue-i18n
上面的例子中，仅仅是对验证消息进行了单一语言的翻译配置。在多语言项目中，可以通过`formatMessage`属性对错误消息进行格式化，在格式化函数中引入`i18n`等

比如将async-validator内置的验证消息配置成如下格式， 以`required`为例
```ts
import Schema from 'async-validator';

Object.assign(Schema.messages, {
  required: 'el.errors.messages.required\0%s',
});

TdFormItem.props.formatMessage.default = (message) => {
  // message 'el.errors.messages.required\0姓名'
  // 用\0分割，提取出 key: el.errors.messages.required 和 param: 姓名
  return t(key, param);
};

```
这样表单验证时async-validator生成的错误消息就会变成`el.errors.messages.required\0姓名`。这个消息现在是无法直接显示的。此时就需要`formatMessage`属性对错误消息进行格式化，在格式化函数中引入`i18n`等，这样你只需要在i18n配置文件中为`el.errors.messages.required`配置不同的语言即可。

对于多参数的验证类型，比如range，`range: '%s must be between %s and %s in length'`,这里而的参数顺序对于async-validator是固定的，所以如果你需要在`formatMessage`函数中对参数顺序进行调整。最好是把模板定义成 `range: 'el.errors.messages.range\0{"field": "%s", "min": "%s", "max": "%s"}'`，这样在`formatMessage`函数中就可以把参数解析成对象，再调用`i18n`就可以不考虑顺序，而是命名参数了

在多语言环境下 `label` 也是需要支持语言切换的，在以往通常是在模板中使用`<ElFormItem :label="t('m.label.name')"></ElFormItem>`。 而现在通过fileds配置，可以使用`computed`
```ts
const fields: TdFormFieldProps[] = [
  {
    label: computed(() => t('m.label.name')),
    prop: 'name',
    component: 'ElInput',
  },
];
```
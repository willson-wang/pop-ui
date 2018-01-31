# Tag 标签

---
用于标记和选择。

## 基础用法

<div class="demo-block demo-tags">
    <pop-tag>标签一</pop-tag>
    <pop-tag type="gray">标签二</pop-tag>
    <pop-tag type="primary">标签三</pop-tag>
    <pop-tag type="success">标签四</pop-tag>
    <pop-tag type="warning">标签五</pop-tag>
    <pop-tag type="danger">标签六</pop-tag>
</div>

::: demo

``` html
<pop-tag>标签一</pop-tag>
<pop-tag type="gray">标签二</pop-tag>
<pop-tag type="primary">标签三</pop-tag>
<pop-tag type="success">标签四</pop-tag>
<pop-tag type="warning">标签五</pop-tag>
<pop-tag type="danger">标签六</pop-tag>
```
:::

## 可移除标签

<div class="demo-block demo-tags">
    <pop-tag :closeable="true">标签一</pop-tag>
    <pop-tag type="gray" :closeable="true">标签二</pop-tag>
    <pop-tag type="primary" :closeable="true">标签三</pop-tag>
    <pop-tag type="success" :closeable="true">标签四</pop-tag>
    <pop-tag type="warning" :closeable="true">标签五</pop-tag>
    <pop-tag type="danger" :closeable="true">标签六</pop-tag>
</div>

::: demo
``` html
<pop-tag :closeable="true">标签一</pop-tag>
<pop-tag type="gray" :closeable="true">标签二</pop-tag>
<pop-tag type="primary" :closeable="true">标签三</pop-tag>
<pop-tag type="success" :closeable="true">标签四</pop-tag>
<pop-tag type="warning" :closeable="true">标签五</pop-tag>
<pop-tag type="danger" :closeable="true">标签六</pop-tag>
```
:::

## Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---  | ---  | --- | ---   | ----- |
| type | 主题 | String | primary/gray/success/warning/danger | _ | 
| closable | 是否可关闭 | Boolean | —— | false |
| close-transition | 是否禁用渐变动画 | Boolean | —— | false |
| class-name | 自定义类名 | String | —— | —— |


## 事件
| 事件名称 | 说明 | 回调参数 |
|---      | ---- | ------- |
| close   |  关闭tag时触发的事件 | ——|

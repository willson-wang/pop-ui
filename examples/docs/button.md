# Button 按钮

---

常用的操作按钮

## 基础用法
基础的按钮用法

<div class="demo-block">
    <div>
        <pop-button >默认按钮</pop-button>
        <pop-button :is-round="true">默认按钮</pop-button>
        <pop-button type="primary" >默认按钮</pop-button>
        <pop-button type="text" >默认按钮</pop-button>
    </div>
    <div style="margin-top: 10px;">
        <pop-button :is-plain="true">默认按钮</pop-button>
        <pop-button :is-plain="true" :is-round="true">默认按钮</pop-button>
        <pop-button type="primary" :is-plain="true">默认按钮</pop-button>
        <pop-button type="text" :is-plain="true">默认按钮</pop-button>
    </div>
</div>

::: demo

``` html

<pop-button>默认按钮</pop-button>
<pop-button :is-round="true">默认按钮</pop-button>
<pop-button type="primary">默认按钮</pop-button>
<pop-button type="text">默认按钮</pop-button>

<pop-button :is-plain="true">默认按钮</pop-button>
<pop-button :is-plain="true" :is-round="true">默认按钮</pop-button>
<pop-button type="primary" :is-plain="true">默认按钮</pop-button>
<pop-button type="text" :is-plain="true">默认按钮</pop-button>
```
:::

## 禁用状态
按钮不可用状态

<div class="demo-block">
    <pop-button :disabled="true">禁用按钮</pop-button>
    <pop-button :disabled="true" type="primary">禁用按钮</pop-button>
    <pop-button :disabled="true" type="text">禁用按钮</pop-button>
</div>

::: demo

``` html
<pop-button :disabled="true">禁用按钮</pop-button>
<pop-button :disabled="true" type="primary">禁用按钮</pop-button>
<pop-button :disabled="true" type="text">禁用按钮</pop-button>
```
:::

## 状态按钮
根据不同的状态来显示不同的颜色按钮
<div class="demo-block">
    <div>
        <pop-button  type="success">成功按钮</pop-button>
        <pop-button  type="warning">警告按钮</pop-button>
        <pop-button  type="danger">危险按钮</pop-button>
        <pop-button  type="info">信息按钮</pop-button>
    </div>
    <div style="margin-top: 10px;">
        <pop-button  type="success" :is-plain="true">成功按钮</pop-button>
        <pop-button  type="warning" :is-plain="true">警告按钮</pop-button>
        <pop-button  type="danger" :is-plain="true">危险按钮</pop-button>
        <pop-button  type="info" :is-plain="true">信息按钮</pop-button>
    </div>
</div>

::: demo

``` html
<pop-button  type="success">成功按钮</pop-button>
<pop-button  type="warning">警告按钮</pop-button>
<pop-button  type="danger">危险按钮</pop-button>
<pop-button  type="info">信息按钮</pop-button>

<pop-button  type="success" :is-plain="true">成功按钮</pop-button>
<pop-button  type="warning" :is-plain="true">警告按钮</pop-button>
<pop-button  type="danger" :is-plain="true">危险按钮</pop-button>
<pop-button  type="info" :is-plain="true">信息按钮</pop-button>
```

:::

## 图标按钮
带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。

<div class="demo-block">
    <pop-button icon="search" type="primary"></pop-button>
    <pop-button icon="pullup" type="primary"></pop-button>
    <pop-button icon="delete" type="primary">icon按钮</pop-button>
    <pop-button icon="down" type="primary">icon按钮</pop-button>
</div>

::: demo

``` html
<pop-button icon="search" type="primary"></pop-button>
<pop-button icon="pullup" type="primary"></pop-button>
<pop-button icon="delete" type="primary">icon按钮</pop-button>
<pop-button icon="down" type="primary">icon按钮</pop-button>
```

:::

## 加载中按钮
点击按钮后进行数据加载操作，在按钮上显示加载状态。

<div class="demo-block">
    <pop-button type="primary" :loading="true">加载中</pop-button>
</div>

::: demo

``` html
<pop-button type="primary" :loading="true">加载中</pop-button>
```

:::

## 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<div class="demo-block">
    <div>
        <pop-button icon="search" type="primary" size="large">large</pop-button>
        <pop-button icon="pullup" type="primary" >normal</pop-button>
        <pop-button icon="delete" type="primary" size="small">small</pop-button>
        <pop-button icon="down" type="primary" size="mini">mini</pop-button>
    </div>
    <div style="margin-top: 10px;">
        <pop-button icon="search" type="primary" size="large" :is-round="true">large</pop-button>
        <pop-button icon="pullup" type="primary" :is-round="true">normal</pop-button>
        <pop-button icon="delete" type="primary" size="small" :is-round="true">small</pop-button>
        <pop-button icon="down" type="primary" size="mini" :is-round="true">mini</pop-button>
    </div>
</div>

::: demo

``` html
<pop-button icon="search" type="primary" size="large">large</pop-button>
<pop-button icon="pullup" type="primary" >normal</pop-button>
<pop-button icon="delete" type="primary" size="small">small</pop-button>
<pop-button icon="down" type="primary" size="mini">mini</pop-button>

<pop-button icon="search" type="primary" size="large" :is-round="true">large</pop-button>
<pop-button icon="pullup" type="primary" :is-round="true">normal</pop-button>
<pop-button icon="delete" type="primary" size="small" :is-round="true">small</pop-button>
<pop-button icon="down" type="primary" size="mini" :is-round="true">mini</pop-button>
```

:::

## 按钮组
以按钮组的方式出现，常用于多项类似操作。

<div class="demo-block">
    <pop-button-group>
        <pop-button type="primary" icon="home"></pop-button>
        <pop-button type="primary" icon="forward"></pop-button>
        <pop-button type="primary" icon="delete"></pop-button>
    </pop-button-group>
    <pop-button-group style="margin-top: 10px;">
        <pop-button type="primary" icon="forward"></pop-button>
        <pop-button type="primary" icon="delete"></pop-button>
    </pop-button-group>
</div>

::: demo 
``` html
<pop-button-group>
    <pop-button type="primary" icon="home"></pop-button>
    <pop-button type="primary" icon="forward"></pop-button>
    <pop-button type="primary" icon="delete"></pop-button>
</pop-button-group>
<pop-button-group style="margin-top: 10px;">
    <pop-button type="primary" icon="forward"></pop-button>
    <pop-button type="primary" icon="delete"></pop-button>
</pop-button-group>
```
:::

## Attributes
| 参数          | 说明                      | 类型      | 可选值                                    | 默认值 |
| ----          | ---                      |  ---      | ----                                      | ----  |
|size	        | 尺寸                      | string   | large,small,mini                          |	—  |
|type	        | 类型                      | string   | primary,success,warning,danger,info,text  |	—  |
|plain	        | 是否朴素按钮               | Boolean  | —                                         |	false |
|loading        | 是否加载中状态             | Boolean  | —                                         |	false  |
|disabled       | 是否禁用状态                | Boolean  | —                                        |	false  |
|icon	        | 图标，已有的图标库中的图标名 | string  | —                                          |	—  |
|native-type	| 原生 type 属性             | string  | button,submit,reset                        |button  |



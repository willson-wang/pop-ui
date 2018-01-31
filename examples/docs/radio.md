<script>
  module.exports = {
    data() {
      return {
        radio: '1',
        radio2: '1',
        radio3: '1',
        radio4: '1'
      };
    }
  };
</script>
# Radio 单选框
在一组备选项中进行单选

## 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。
<div class="demo-block">
    <pop-radio v-model="radio" label="1">游泳</pop-radio>
    <pop-radio v-model="radio" label="2">跑步</pop-radio>
</div>

:::demo 

```html
<template>
    <pop-radio v-model="radio" label="1">游泳</pop-radio>
    <pop-radio v-model="radio" label="2">跑步</pop-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

## 禁用状态
单选框不可用的状态。
<div class="demo-block">
    <pop-radio v-model="radio2" disabled label="1">游泳</pop-radio>
    <pop-radio v-model="radio2" label="2">跑步</pop-radio>
</div>

:::demo 

```html
<template>
    <pop-radio v-model="radio2" disabled label="1">游泳</pop-radio>
    <pop-radio v-model="radio2" label="2">跑步</pop-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

## 单选框组
适用于在多个互斥的选项中选择的场景
<div class="demo-block">
    <pop-radio-group v-model="radio3">
        <pop-radio  label="1">游泳</pop-radio>
        <pop-radio  label="2">跑步</pop-radio>
        <pop-radio  label="3">打球</pop-radio>
    </pop-radio-group>
</div>

:::demo 

```html
<template>
    <pop-radio-group v-model="radio3">
        <pop-radio  label="1">游泳</pop-radio>
        <pop-radio  label="2">跑步</pop-radio>
        <pop-radio  label="3">打球</pop-radio>
    </pop-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio3: '1'
      };
    }
  }
</script>
```
:::

## 单选按钮组
按钮样式的单选组合。
<div class="demo-block">
    <pop-radio-group v-model="radio4">
        <pop-radio-button  label="1">游泳</pop-radio-button>
        <pop-radio-button  label="2">跑步</pop-radio-button>
        <pop-radio-button  label="3">打球</pop-radio-button>
    </pop-radio-group>
</div>

:::demo 

```html
<template>
    <pop-radio-group v-model="radio4">
        <pop-radio-button  label="1">游泳</pop-radio-button>
        <pop-radio-button  label="2">跑步</pop-radio-button>
        <pop-radio-button  label="3">打球</pop-radio-button>
    </pop-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio4: '1'
      };
    }
  }
</script>
```
:::

## Radio Attributes
| 参数    | 说明           | 类型                   | 可选值 | 默认值 |
| -----   | ----           | ----                  | --     | ----   |
|label    | Radio的Vlaue值 | string,number,boolean | ——     | ——    |
|disabled | 是否禁用       | boolean                | ——     | false |
|name     | 原生 name 属性 | string                 | ——     | ——    |

## Radio-group Events
| 事件名称    | 说明                 | 回调参数              |
| -----      | ----                 | ----                 |
|change      | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

## Radio-button Attributes
| 参数    | 说明           | 类型                   | 可选值 | 默认值 |
| -----   | ----           | ----                  | --     | ----   |
|label    | Radio的Vlaue值 | string,number,boolean | ——     | ——    |
|disabled | 是否禁用       | boolean                | ——     | false |
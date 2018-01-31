<script>
  module.exports = {
    data() {
      return {
        check: true,
        check1: true,
        check2: false,
        check4: '1',
        checkList: [],
        checkList1: []
      };
    }
  };
</script>
# checkbox 复选框
在一组备选项中进行多选

## 基础用法
单独使用可以表示两种状态之间的切换
<div class="demo-block">
    <pop-checkbox  :reveser="true" :disabled="false" v-model="check">备选项</pop-checkbox>
</div>

:::demo 

```html
<template>
    <pop-checkbox  :reveser="true" :disabled="false" v-model="check">备选项</pop-checkbox>
</template>

<script>
  export default {
    data () {
      return {
        check: true
      };
    }
  }
</script>
```
:::

## 禁用状态
复选框不可用的状态。
<div class="demo-block">
    <pop-checkbox  :reveser="true" :disabled="true" v-model="check1">备选项1</pop-checkbox>
    <pop-checkbox  :reveser="true" :disabled="false" v-model="check2">备选项2</pop-checkbox>
</div>

:::demo 

```html
<template>
    <pop-checkbox  :reveser="true" :disabled="true" v-model="check1">备选项1</pop-checkbox>
    <pop-checkbox  :reveser="true" :disabled="false" v-model="check2">备选项2</pop-checkbox>
</template>

<script>
  export default {
    data () {
      return {
        check1: true,
        check2: false
      };
    }
  }
</script>
```
:::

## 复选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
<div class="demo-block">
    <pop-checkbox-group v-model="checkList">
        <pop-checkbox  label="1">游泳</pop-checkbox>
        <pop-checkbox  label="2">跑步</pop-checkbox>
        <pop-checkbox  label="3">打球</pop-checkbox>
    </pop-checkbox-group>
</div>

:::demo 

```html
<template>
    <pop-checkbox-group v-model="checkList">
        <pop-checkbox  label="1">游泳</pop-checkbox>
        <pop-checkbox  label="2">跑步</pop-checkbox>
        <pop-checkbox  label="3">打球</pop-checkbox>
    </pop-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: []
      };
    }
  }
</script>
```
:::

## 复选按钮组
按钮样式
<div class="demo-block">
    <pop-checkbox-group v-model="checkList1">
        <pop-checkbox-button  label="1">游泳</pop-checkbox-button>
        <pop-checkbox-button  label="2">跑步</pop-checkbox-button>
        <pop-checkbox-button  label="3">打球</pop-checkbox-button>
    </pop-checkbox-group>
</div>

:::demo 

```html
<template>
    <pop-checkbox-group v-model="checkList1">
        <pop-checkbox-button  label="1">游泳</pop-checkbox-button>
        <pop-checkbox-button  label="2">跑步</pop-checkbox-button>
        <pop-checkbox-button  label="3">打球</pop-checkbox-button>
    </pop-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList1: []
      };
    }
  }
</script>
```
:::

## Checkbox Attributes
| 参数        | 说明                                                          | 类型                   | 可选值 | 默认值 |
| -----       | ----                                                          | ----                  | --     | ----   |
|label        | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string                | ——     | ——    |
|true-label   | 选中时的值                                                     | string, number        | ——     | ——    |
|false-label  | 没有选中时的值                                                  | string, number        | ——     | ——    |
|disabled     | 是否禁用                                                       | boolean                | ——     | false |
|name         | 原生 name 属性                                                 | string                 | ——     | ——    |
|checked      | 当前是否勾选                                                   | string                 | ——     | false   |

## Checkbox Events
| 事件名称    | 说明                   | 回调参数              |
| -----      | ----                   | ----                 |
|change      | 当绑定值变化时触发的事件 | 	event 事件对象      |


<script>
    export default {
        data () {
            return {
                num1: 1
            }
        }
    }
</script>
# InputNumber 计数器

---
仅允许输入标准的数字值，可定义范围

## 基础用法
<div class="demo-block">
    <pop-input-number v-model="num1" :max="20" :min="2"></pop-input-number>
</div>

::: demo
``` html
<pop-input-number v-model="num1"></pop-input-number>

<script>
    export default {
        data () {
            return {
                num1: 1
            }
        }
    }
</script>
```
:::

## 禁用状态

<div class="demo-block">
    <pop-input-number v-model="num1" :disabled="true"></pop-input-number>
</div>

::: demo
``` html
<pop-input-number v-model="num1" :disabled="true"></pop-input-number>

<script>
    export default {
        data () {
            return {
                num1: 1
            }
        }
    }
</script>
```
:::

## 步数
允许定义递增or递减的步数控制

<div class="demo-block">
    <pop-input-number v-model="num1" :step="5"></pop-input-number>
</div>

::: demo
``` html
<pop-input-number v-model="num1" :step="5"></pop-input-number>

<script>
    export default {
        data () {
            return {
                num1: 1
            }
        }
    }
</script>
```
:::

## 尺寸
额外提供了 large、small 两种尺寸的数字输入框

<div class="demo-block">
    <pop-input-number v-model="num1"  size="large"></pop-input-number>
    <pop-input-number v-model="num1"  ></pop-input-number>
    <pop-input-number v-model="num1"  size="small"></pop-input-number>
</div>

::: demo
``` html
<pop-input-number v-model="num1"  size="large"></pop-input-number>
<pop-input-number v-model="num1"  ></pop-input-number>
<pop-input-number v-model="num1"  size="small"></pop-input-number>

<script>
    export default {
        data () {
            return {
                num1: 1
            }
        }
    }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value    | 绑定值         | number | — | — |
| min      | 设置计数器允许的最小值 | number | — | 0 |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| step     | 计数器步长           | number   | — | 1 |
| size     | 计数器尺寸           | string   | large, small | — |
| disabled | 是否禁用计数器        | boolean | — | false |
| controls | 是否使用控制按钮        | boolean | — | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 绑定值被改变时触发 | 最后变更的值 |

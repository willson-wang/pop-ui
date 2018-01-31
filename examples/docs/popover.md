<script>
    export default {
        data () {
            return {
                isShow: false
            }
        }
    }
</script>
# Popover 弹出框

---
基础用法
Popover 的属性与 Tooltip 很类似，它们都是基于Vue-popper开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

<div class="demo-block">
    <pop-popover
        ref="popover1"
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
    </pop-popover>
    <pop-popover
        ref="popover2"
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
    </pop-popover>
    <pop-button v-pop-popover:popover1>hover 激活</pop-button>
    <pop-button v-pop-popover:popover2>click 激活</pop-button>
        <pop-popover
        placement="right"
        title="标题"
        width="200"
        trigger="focus"
        content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
        <pop-button slot="reference">focus 激活</pop-button>
    </pop-popover>
</div>

::: demo

``` html
<pop-popover
    ref="popover1"
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
</pop-popover>
<pop-popover
    ref="popover2"
    placement="bottom"
    title="标题"
    width="200"
    trigger="click"
    content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
</pop-popover>
<pop-button v-pop-popover:popover1>hover 激活</pop-button>
<pop-button v-pop-popover:popover2>click 激活</pop-button>
    <pop-popover
    placement="right"
    title="标题"
    width="200"
    trigger="focus"
    content="王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看">
    <pop-button slot="reference">focus 激活</pop-button>
</pop-popover>
```

:::

## 嵌套信息与操作
可以在 Popover 中嵌套多种类型信息，如下所示。
<div class="demo-block">
    <pop-popover
        ref="popover4"
        placement="top"
        title="标题"
        width="200"
        v-model="isShow"
        trigger="click">
        <div>
            <div>王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看</div>
            <div style="text-align: right">
                <pop-button type="primary" size="mini" @click="isShow = false">关闭</pop-button>  
                <pop-button type="primary" size="mini" @click="isShow = false">确认</pop-button>  
            </div>
        </div>
    </pop-popover>
    <pop-button v-pop-popover:popover4>click 激活</pop-button>
</div>

::: demo
``` html
<pop-popover
    ref="popover4"
    placement="top"
    title="标题"
    width="200"
    v-model="isShow"
    trigger="click">
    <div>
        <div>王二狗大战张三丰的新闻上了今日头条了，你不信的话可以打开今日头条看看</div>
        <div style="text-align: right">
            <pop-button type="primary" size="mini" @click="isShow = false">关闭</pop-button>  
            <pop-button type="primary" size="mini" @click="isShow = false">确认</pop-button>  
        </div>
    </div>
</pop-popover>
<pop-button v-pop-popover:popover4>click 激活</pop-button>

<script>
    export default {
        data () {
            return {
                isShow: false
            }
        }
    }
</script>
```
:::

## Attributes

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| trigger | 触发方式 | String  | click/focus/hover/manual |    click    |
|  title              | 标题 | String | — | — |
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  width        |  宽度  | String, Number            | — | 最小宽度 150px |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  disabled       |  Popover 是否可用  | Boolean           | — |  false |
|  value(v-model)        |  状态是否可见  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | fade-in-linear |
|  visible-arrow   |  是否显示 Tooltip 箭头 | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| class-name | 为 popper 添加类名 | String | — | — |
| open-delay | 触发方式为 hover 时的显示延迟，单位为毫秒 | Number | — | — |

### Slot
| 参数      | 说明                         |
|---        | ---                          |
| —         | Popover 内嵌 HTML 文本       |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events
| 事件名称 | 说明      | 回调参数 |
|---------|--------   |---------|
| show    | 显示时触发 | —       |
| hide    | 隐藏时触发 | —       |

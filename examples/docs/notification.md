<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$notification({
                    title: '提示',
                    message: '王二狗大战张三疯！',
                    showClose: true,
                    type: 'info'
                });
            },
            open2 () {
                this.$notification({
                    title: '提示',
                    message: '这是一条不会自动关闭的消息',
                    duration: 0,
                    showClose: true
                });
            },
            open3() {
                this.$notification({
                message: '恭喜你，这是一条成功消息',
                    title: '成功',
                    type: 'success'
                });
            },

            open4() {
                this.$notification({
                    message: '警告哦，这是一条警告消息',
                    title: '警告',
                    type: 'warning'
                });
            },

            open5() {
                this.$notification.error({
                    title: '失败',
                    message: '错了哦，这是一条错误消息'
                });
            }
        }
    }
</script>
# Notification 通知

---
悬浮出现在页面右上角，显示全局的通知提醒消息。

## 基础用法
从顶部出现，3 秒后自动消失,也可添加close关闭按钮。

<div class="demo-block">
    <pop-button :plain="true" @click="open">可自动关闭</pop-button>
    <pop-button :plain="true" @click="open2">不可自动关闭</pop-button>
</div>

::: demo
``` html
<pop-button :plain="true" @click="open">可自动关闭</pop-button>
<pop-button :plain="true" @click="open2">不可自动关闭</pop-button>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$notification({
                    title: '提示',
                    message: '王二狗大战张三疯！',
                    showClose: true
                });
            },
            open2 () {
                this.$notification({
                    title: '提示',
                    message: '这是一条不会自动关闭的消息',
                    duration: 0,
                    showClose: true
                });
            }
        }
    }
</script>
```
:::

## 状态通知框
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

<div class="demo-block">
    <pop-button :plain="true" @click="open3">成功</pop-button>
    <pop-button :plain="true" @click="open4">警告</pop-button>
    <pop-button :plain="true" @click="open">消息</pop-button>
    <pop-button :plain="true" @click="open5">错误</pop-button>
</div>

::: demo
``` html
<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$notification({
                    title: '提示',
                    message: '王二狗大战张三疯！',
                    showClose: true,
                    type: 'info'
                });
            },
            open3() {
                this.$notification({
                message: '恭喜你，这是一条成功消息',
                    title: '成功',
                    type: 'success'
                });
            },

            open4() {
                this.$notification({
                    message: '警告哦，这是一条警告消息',
                    title: '警告',
                    type: 'warning'
                });
            },

            open5() {
                this.$notification.error({
                    title: '失败',
                    message: '错了哦，这是一条错误消息'
                });
            }
        }
    }
</script>
```
:::

## 全局方法
POPUI 为 Vue.prototype 添加了全局方法 $notification。因此在 vue instance 中可以采用本页面中的方式调用 Notification。

## 单独引入
单独引入 Notification： `import { Notification } from 'pop-ui';`
此时调用方法为 Notification(options)。我们也为每个 type 定义了各自的方法，如 Notification.success(options)。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| message | 说明文字 | string/Vue.VNode | — | — |
| type | 主题样式，如果不在可选值内将被忽略 | string | success/warning/info/error | — |
| icon | 自定义图标的类名。若设置了 `type`，则 `iconClass` 会被覆盖 | string | — | — |
| className | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 4500 |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| onClose | 关闭时的回调函数 | function | — | — |
| onClick | 点击 Notification 时的回调函数 | function | — | — |
| offset | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number | — | 0 |

### 方法
调用 `Notification` 或 `this.$notification` 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Notification |
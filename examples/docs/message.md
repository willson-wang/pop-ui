<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$message({
                    type: 'info',
                    message: '王二狗大战张三疯',
                    showClose: true
                });
            },
            openVn () {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ])
                })
            },
            open2() {
                this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
                });
            },

            open3() {
                this.$message({
                message: '警告哦，这是一条警告消息',
                type: 'warning'
                });
            },

            open4() {
                this.$message.error('错了哦，这是一条错误消息');
            }
        }
    }
</script>
## Message 消息提示框

---
常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法
从顶部出现，3 秒后自动消失,也可添加close关闭按钮。

<div class="demo-block">
    <pop-button :plain="true" @click="open">打开消息提示</pop-button>
    <pop-button :plain="true" @click="openVn">VNode</pop-button>
</div>

::: demo 

``` html 
<pop-button :plain="true" @click="open">打开消息提示</pop-button>
<pop-button :plain="true" @click="openVn">VNode</pop-button>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$message({
                    type: 'info',
                    message: '王二狗大战张三疯',
                    showClose: true
                });
            },
            openVn () {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ])
                })
            }
        }
    }
</script>
```

:::

## 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。

<div class="demo-block">
    <pop-button :plain="true" @click="open2">成功</pop-button>
    <pop-button :plain="true" @click="open3">警告</pop-button>
    <pop-button :plain="true" @click="open">消息</pop-button>
    <pop-button :plain="true" @click="open4">错误</pop-button>
</div>

::: demo
``` html
<pop-button :plain="true" @click="open2">成功</pop-button>
<pop-button :plain="true" @click="open3">警告</pop-button>
<pop-button :plain="true" @click="open">消息</pop-button>
<pop-button :plain="true" @click="open4">错误</pop-button>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            open () {
                this.$message({
                    type: 'info',
                    message: '王二狗大战张三疯',
                    showClose: true
                });
            },
            openVn () {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ])
                })
            },
            open2() {
                this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
                });
            },

            open3() {
                this.$message({
                message: '警告哦，这是一条警告消息',
                type: 'warning'
                });
            },

            open4() {
                this.$message.error('错了哦，这是一条错误消息');
            }
        }
    }
</script>
```
:::


## 全局方法
POPUI 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 Message。

## 单独引用
单独引入 Message：
`import { Message } from 'pop-ui';`

此时调用方法为 Message(options)。我们也为每个 type 定义了各自的方法，如 Message.success(options)。 并且可以调用 Message.closeAll() 手动关闭所有实例。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string / VNode | — | — |
| type | 主题 | string | success/warning/info/error | info |
| className | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| center | 文字是否居中 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |

### 方法
调用 `Message` 或 `this.$message` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |



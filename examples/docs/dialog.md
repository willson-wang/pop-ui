<script>
    export default {
        data () {
            return {
                dialogVisible: false,
                dialogVisible1: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                select1: '选项2'
            }
        }
    }
</script>
# Dialog 对话框

---
在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基本用法
Dialog 弹出一个对话框，适合需要定制性更大的场景。

<div class="demo-block">
    <pop-button type="text" @click="dialogVisible = true">点击打开dialog</pop-button>
    <pop-dialog :visible.sync="dialogVisible" title="提示">
        <span>这是一段信息</span>
        <span slot="footer">
            <pop-button @click="dialogVisible = false">取 消</pop-button>
            <pop-button type="primary" @click="dialogVisible = false">确 定</pop-button>
        </span>
    </pop-dialog>
</div>

::: demo
``` html
<pop-button type="text" @click="dialogVisible = true">点击打开dialog</pop-button>
<pop-dialog :visible.sync="dialogVisible" title="提示">
    <span>这是一段信息</span>
    <span slot="footer">
        <pop-button @click="dialogVisible = false">取 消</pop-button>
        <pop-button type="primary" @click="dialogVisible = false">确 定</pop-button>
    </span>
</pop-dialog>

<script>
    export default {
        data () {
            return {
                dialogVisible: false
            }
        }
    }
</script>
```
:::

## 自定义内容

<div class="demo-block">
    <pop-button type="text" @click="dialogVisible1 = true">打开嵌套表单的dialog</pop-button>
    <pop-dialog :visible.sync="dialogVisible1" title="提示">
        <div>
            <div>
                <pop-input></pop-input>   
            </div>
            <div style="margin-top: 10px;">
                <pop-select v-model="select1" placeholder="请选择">
                <pop-select-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </pop-select-option>
                </pop-select>
            </div>
        </div> 
        <span slot="footer">
            <pop-button @click="dialogVisible1 = false">取 消</pop-button>
            <pop-button type="primary" @click="dialogVisible1 = false">确 定</pop-button>
        </span>
    </pop-dialog>
</div>

::: demo
``` html
<pop-button type="text" @click="dialogVisible1 = true">打开嵌套表单的dialog</pop-button>
<pop-dialog :visible.sync="dialogVisible1" title="提示">
    <div>
        <div>
            <pop-input></pop-input>   
        </div>
        <div style="margin-top: 10px;">
            <pop-select v-model="select1" placeholder="请选择">
            <pop-select-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </pop-select-option>
            </pop-select>
        </div>
    </div> 
    <span slot="footer">
        <pop-button @click="dialogVisible1 = false">取 消</pop-button>
        <pop-button type="primary" @click="dialogVisible1 = false">确 定</pop-button>
    </span>
</pop-dialog>

<script>
    export default {
        data () {
            return {
                dialogVisible: false,
                dialogVisible1: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                select1: '选项2'
            }
        }
    }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| visible   | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title     | Dialog 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| width     | Dialog 的宽度 | string    | — | 30% |
| top       | Dialog CSS 中的 margin-top 值 | string | — | 15% |
| modal     | 是否需要遮罩层   | boolean   | — | true |
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上   | boolean   | — | true |
| lock-scroll | 是否在 Dialog 出现时将 body 滚动锁定 | boolean | — | true |
| class-name      | Dialog 的自定义类名 | string    | — | — |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |

### Slot
| name | 说明 |
|------|--------|
| — | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | Dialog 关闭的回调 | — |
| open  | Dialog 打开的回调 | — |


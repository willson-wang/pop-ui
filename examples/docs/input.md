<script>
    export default {
        data () {
            return {
                input: '222',
                select: ''
            }
        },
        watch: {
           input (val) {
               console.log(val);
           } 
        },
        methods: {
            handlerIconClick (e) {
                console.log(e);
            }
        }
    }
</script>
# Input 输入框

---
通过鼠标或键盘输入字符

<div class="demo-block">
    <pop-input icon="search" v-model="input" @iconClick="handlerIconClick"></pop-input>   
</div>

::: demo
``` html
<pop-input icon="search" v-model="input" @iconClick="handlerIconClick"></pop-input>

<script>
    export default {
        data () {
            return {
                input: '222'
            }
        },
        methods: {
            handlerIconClick (e) {
                console.log(e);
            }
        }
    }
</script>
```
:::

## 禁用状态
<div class="demo-block">
    <pop-input icon="search" :disabled="true" v-model="input"></pop-input>   
</div>

::: demo
``` html
<pop-input icon="search" :disabled="true" v-model="input"></pop-input>

<script>
    export default {
        data () {
            return {
                input: '222'
            }
        }
    }
</script>
```
:::

## 复合型输入框
可前置或后置元素，一般为标签或按钮

<div class="demo-block">
    <div>
        <pop-input icon="search"  v-model="input">
            <template slot="prepend">Http://</template>
        </pop-input>  
    </div> 
    <div style="margin-top: 10px;">
        <pop-input icon="search"  v-model="input">
            <template slot="append">.com</template>
        </pop-input>  
    </div> 
    <div style="margin-top: 10px;">
        <pop-input  v-model="input">
            <pop-select  width="100px" v-model="select" slot="prepend" placeholder="请选择">
                <pop-select-option label="餐厅名" value="1"></pop-select-option>
                <pop-select-option label="订单号" value="2"></pop-select-option>
                <pop-select-option label="用户电话" value="3"></pop-select-option>
            </pop-select>
            <pop-button slot="append" icon="search"></pop-button>
        </pop-input>  
    </div> 
</div>

::: demo
``` html
<div>
    <pop-input icon="search"  v-model="input">
        <template slot="prepend">Http://</template>
    </pop-input>  
</div> 
<div style="margin-top: 10px;">
    <pop-input icon="search"  v-model="input">
        <template slot="append">.com</template>
    </pop-input>  
</div> 
<div style="margin-top: 10px;">
    <pop-input  v-model="input">
        <pop-select  width="100px" v-model="select" slot="prepend" placeholder="请选择">
            <pop-select-option label="餐厅名" value="1"></pop-select-option>
            <pop-select-option label="订单号" value="2"></pop-select-option>
            <pop-select-option label="用户电话" value="3"></pop-select-option>
        </pop-select>
        <pop-button slot="append" icon="search"></pop-button>
    </pop-input>  
</div>

<script>
    export default {
        data () {
            return {
                input: '222',
                select: ''
            }
        }
    }
</script>
```
:::

## 尺寸

<div class="demo-block">
    <pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="large"></pop-input>   
    <pop-input icon="search" v-model="input" @iconClick="handlerIconClick" ></pop-input>   
    <pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="small"></pop-input>   
    <pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="mini"></pop-input>   
</div>

::: demo
``` html
<pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="large"></pop-input>   
<pop-input icon="search" v-model="input" @iconClick="handlerIconClick" ></pop-input>   
<pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="small"></pop-input>   
<pop-input icon="search" v-model="input" @iconClick="handlerIconClick" size="mini"></pop-input>   

<script>
    export default {
        data () {
            return {
                input: '222',
                select: ''
            }
        }
    }
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text / textarea | text |
| value         | 绑定值           | string / number  | — | — |
| maxlength     | 最大输入长度      | number          |  —  | — |
| minlength     | 最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸      | string          | large / small / mini  | — |
| auto-complete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |

### Input slots
| name | 说明 |
|------|--------|
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |


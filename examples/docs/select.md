<script>
export default {
    data() {
        return {
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
            select1: '选项2',
            options2: [{
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
                label: '龙须面',
                disabled: true
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            select2: '',
            options3: [{
                label: '热门城市',
                options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                label: '城市名',
                options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
            select3: ''
        }
    }
}
</script>
# Select 选择器

---
当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法
适用广泛的基础单选

<div class="demo-block">
    <pop-select v-model="select1" placeholder="请选择">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<pop-select v-model="select1" placeholder="请选择">
    <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </pop-select-option>
</pop-select>

<script>
export default {
    data() {
        return {
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

## 不同尺寸
<div class="demo-block">
    <pop-select v-model="select1" placeholder="请选择" size="large">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
    <pop-select v-model="select1" placeholder="请选择">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
    <pop-select v-model="select1" placeholder="请选择" size="small">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
    <pop-select v-model="select1" placeholder="请选择" size="mini">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

## 有禁用选项
<div class="demo-block">
    <pop-select v-model="select2" placeholder="请选择">
        <pop-select-option
        v-for="item in options2"
        :key="item.value"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<pop-select v-model="select2" placeholder="请选择">
    <pop-select-option
        v-for="item in options2"
        :key="item.value"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value">
    </pop-select-option>
</pop-select>
<script>
export default {
    data() {
        return {
            options2: [{
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
                label: '龙须面',
                disabled: true
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            select2: ''
        }
    }
}
</script>
```
:::

## 禁用状态
选择器不可用状态

<div class="demo-block">
    <pop-select v-model="select1" placeholder="请选择" :disabled="true"> 
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<script>
export default {
    data() {
        return {
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
            select1: ''
        }
    }
}
</script>
```
:::

## 可清空单选
包含清空按钮，可将选择器清空为初始状态
<div class="demo-block">
    <pop-select v-model="select1" placeholder="请选择" :clearable="true"> 
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<pop-select v-model="select1" placeholder="请选择" :clearable="true"> 
    <pop-select-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </pop-select-option>
</pop-select>
<script>
export default {
    data() {
        return {
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
            select1: ''
        }
    }
}
</script>
```
:::

## 自定义模板
<div class="demo-block">
    <pop-select v-model="select1" placeholder="请选择" > 
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<pop-select v-model="select1" placeholder="请选择" > 
    <pop-select-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </pop-select-option>
</pop-select>

<script>
export default {
    data() {
        return {
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
            select1: ''
        }
    }
}
</script>
```
:::

## 分组

<div class="demo-block">
    <pop-select v-model="select3" placeholder="请选择">
        <pop-select-option-group
        v-for="group in options3"
        :key="group.label"
        :label="group.label">
        <pop-select-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </pop-select-option>
        </pop-select-option-group>
    </pop-select>
</div>

::: demo
``` html
<script>
export default {
    data() {
        return {
            options3: [{
                label: '热门城市',
                options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                label: '城市名',
                options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
            select3: ''
        }
    }
}
</script>
```
:::

## 可搜索
<div class="demo-block">
    <pop-select v-model="select1" :filterable="true" placeholder="请选择">
        <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </pop-select-option>
    </pop-select>
</div>

::: demo
``` html
<pop-select v-model="select1" placeholder="请选择">
    <pop-select-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </pop-select-option>
</pop-select>

<script>
export default {
    data() {
        return {
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
            select1: ''
        }
    }
}
</script>
``` 
:::

### Select Attributes 
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| no-match-text | 搜索条件无匹配时显示的文字 | string | — | 无匹配数据 |
| no-data-text | 选项为空时显示的文字 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
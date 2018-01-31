<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
            }
        },
        watch: {
           value1 (val) {
               console.log(val);
           } 
        }
    }
</script>
# Timepicker 时间选择器

---
用于选择或输入日期

## 固定时间点
提供几个固定的时间点供用户选择

<div class="demo-block">
    <pop-timepicker v-model="value1" :picker-options="{start: '08:30', step: '00:15', end: '18:30'}"></pop-timepicker>
</div>

::: demo
``` html
<pop-timepicker v-model="value1" :picker-options="{start: '08:30', step: '00:15', end: '18:30'}"></pop-timepicker>

<script>
    export default {
        data () {
            return {
                value1: ''
            }
        }
    }
</script>
``` 
:::

## 任意时间点

<div class="demo-block">
    <pop-timepicker v-model="value2" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"></pop-timepicker>
</div>

<template>
    <div class="pop-input-number" :class="[{'is-focus': isFocus, 'is-disabled': disabled}]"> 
        <pop-input v-model="number" :width="width" @focus="isFocus = true" @blur="isFocus = false" :disabled="disabled" :size="size" placeholder=""></pop-input>
        <button type="button" class="pop-input-number__decrease" v-if="controls" :disabled="disabled"  :class="[{'is-disabled': number === this.min}, 'is-'+size]" @click="handlerDecrease">-</button>
        <button type="button" class="pop-input-number__increase" v-if="controls" :disabled="disabled" :class="[{'is-disabled': number === this.max}, 'is-'+size]" @click="handlerIncrease">+</button>
    </div>
</template>

<script>
    export default {
        name: 'popInputNumber',
        componentName: 'popInputNumber',
        props: {
            value: {
                type: Number
                //  prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。
                // validator: function (value) {
                //     if (value < this.min) {
                //         return this.min;
                //     } else if (value > this.max) {
                //         return this.max;
                //     }
                //     return value;
                // }
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: String,
            controls: {
                type: Boolean,
                default: true
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: Infinity
            },
            step: {
                type: Number,
                default: 1
            },
            width: String
        },
        data () {
            return {
                number: this.value || '',
                isFocus: false
            };
        },
        watch: {
            value: {
                immediate: true,
                handler (value) {
                    let newVal = Number(value);
                    if (isNaN(newVal)) return;
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    this.number = newVal;
                    this.$emit('input', newVal);
                }
            }
        },
        methods: {
            fixNumber (newValue) {
                const oldValue = this.number;
                if (newValue < this.min) {
                    newValue = this.min;
                } else if (newValue > this.max) {
                    newValue = this.max;
                }
                if (newValue === oldValue) return;
                this.$emit('change', newValue, oldValue);
                this.number = newValue;
                this.$emit('input', newValue);
            },
            handlerDecrease () {
                if (isNaN(this.number)) return;
                this.number = Number(this.number);
                let newValue = this.number || 0;
                newValue -= this.step;
                this.fixNumber(newValue);
            },
            handlerIncrease () {
                if (isNaN(this.number)) return;
                this.number = Number(this.number);
                let newValue = this.number || 0;
                newValue += this.step;
                this.fixNumber(newValue);
            }
        }
    };
</script>

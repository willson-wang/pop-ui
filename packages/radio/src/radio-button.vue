<template>
    <label class="pop-radio-button" :class="[{
        'is-disabled': isDisabled,
        'is-active': value === label
      }]"
           @click="handlerClick">
        <input type="radio" 
            :value="label" 
            v-model="value"
            :name="name"
            :disabled="isDisabled"
            class="pop-radio-button__original"
        >
        <span class="pop-radio-button__label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'popRadioButton',
        componentName: 'popRadioButton',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {},
            name: {
                type: String
            },
            isScreen: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {};
        },
        computed: {
            isDisabled () {
                return this.disabled || this._radioGroup.disabled;
            },
            // 判断是否是radio组
            _radioGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'popRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent;
                    }
                }
                return false;
            },
            value: {
                get () {
                    return this._radioGroup.value;
                },
                set (val) {
                    // v-model的绑定的值，都可以直接通过$emit('input')来进行传值
                    this._radioGroup.$emit('input', val);
                }
            }
        },
        methods: {
            handlerClick () {
                // 在计算旧值与新值时能够取得正确的值
                this.$emit('click');
            }
        }
    };
</script>






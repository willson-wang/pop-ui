<template>
    <label class="pop-radio"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }">
        <input type="radio" 
            class="pop-radio__original"
            :value="label" 
            v-model="model"
            :name="name"
            :disabled="isDisabled"
        >
        <span class="pop-radio__input"></span>
        <span class="pop-radio__label" :style="styles">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    import emitter from 'src/utils/emitter.js';
    export default {
        name: 'popRadio',
        componentName: 'popRadio',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {},
            styles: {},
            value: {},
            name: {
                type: String
            }
        },
        mixin: [emitter],
        data () {
            return {
                focus: false
            };
        },
        computed: {
            isDisabled () {
                return this.isGroup
                ? this._radioGroup.disabled || this.disabled
                : this.disabled;
            },
            // 判断是否是radio组
            isGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'popRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        this._radioGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            model: {
                get () {
                    return this.isGroup ? this._radioGroup.value : this.value;
                },
                set (val) {
                    if (this.isGroup) {
                        // 向父组件sRadioGroup传递值
                        this.dispatch('popRadioGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                    }
                }
            }
        }
    };
</script>
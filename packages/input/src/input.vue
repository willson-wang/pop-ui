<template>
    <div class="pop-input">
        <div class="pop-input__group" >
            <label class="pop-input__prepend" v-if="$slots.prepend" :class="['is-'+size]">
                <slot name="prepend"></slot>
            </label>
            <label class="pop-input__content" :class="['is-'+size]">
                <input 
                    :style="{width: width, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius}" 
                    type="text" 
                    :placeholder="placeholder" 
                    :name="name" 
                    :value="label"
                    @input="handlerInput"
                    :maxlength="maxlength"
                    :minlength="minlength"
                    :disabled="disabled"
                    :readonly="readonly"
                    @focus="handlerFocus"
                    @blur="handlerBlur"
                    @click="handlerClick"
                    >
                <span class="pop-input__icon" @click="handlerIconClick">
                    <i :class="['pop-icon-' + icon]"></i>
                </span>
            </label>
            <label class="pop-input__append" v-if="$slots.append" :class="['is-'+size]">
                <slot name="append"></slot>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'popInput',
        componentName: 'popInput',
        props: {
            name: String,
            value: [String, Number],
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            width: String,
            icon: String,
            size: {
                type: String,
                default: 'normal'
            },
            maxlength: Number,
            minlength: Number,
            disabled: Boolean,
            readonly: Boolean
        },
        data () {
            return {
                label: this.value || ''
            };
        },
        computed: {
            borderTopLeftRadius () {
                return this.$slots.prepend ? 0 : '';
            },
            borderBottomLeftRadius () {
                return this.$slots.prepend ? 0 : '';
            },
            borderTopRightRadius () {
                return this.$slots.append ? 0 : '';
            },
            borderBottomRightRadius () {
                return this.$slots.append ? 0 : '';
            }
        },
        watch: {
            value (val) {
                this.setCurrentValue(val);
            }
        },
        methods: {
            handlerIconClick (e) {
                this.$emit('iconClick', e);
            },
            handlerFocus () {
                this.$emit('focus');
            },
            handlerBlur () {
                this.$emit('blur');
            },
            handlerClick () {
                this.$emit('click');
            },
            handlerInput (e) {
                const val = e.target.value;
                this.$emit('input', val);
                this.setCurrentValue(val);
                this.$emit('change', val);
            },
            setCurrentValue (val) {
                if (val === this.label) return;
                this.label = val;
            }
        }
    };
</script>

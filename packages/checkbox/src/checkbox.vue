<template>
    <label class="pop-checkbox" :class="{
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-selectAll': isSelectAll,
        'is-reveser': reveser
    }" >
        <input
        v-if="trueLabel || falseLabel"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        class="pop-checkbox__original"
        >
        <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        class="pop-checkbox__original"
        @change="handleChange">
        <span @click.stop="stopHandler" class="pop-checkbox__input"></span>
        <span  class="pop-checkbox__label" :style="styles" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    import emitter from 'src/utils/emitter.js';
    export default {
        name: 'popCheckbox',
        componentName: 'popCheckbox',
        data () {
            return {
                selfModel: false
            };
        },
        mixin: [emitter],
        props: {
            value: {},
            label: {},
            isSelectAll: Boolean,
            disabled: Boolean,
            checked: Boolean,
            reveser: Boolean,
            name: String,
            styles: {},
            trueLabel: [String, Number],
            falseLabel: [String, Number]
        },
        computed: {
            model: {
                get () {
                    return this.isGroup
                        ? this.store : this.value !== undefined
                        ? this.value : this.selfModel;
                },
                set (val) {
                    if (this.isGroup) {
                        let isLimitExceeded = false;
                        (this._checkboxGroup.min !== undefined &&
                        val.length < this._checkboxGroup.min &&
                        (isLimitExceeded = true));

                        (this._checkboxGroup.max !== undefined &&
                        val.length > this._checkboxGroup.max &&
                        (isLimitExceeded = true));

                        isLimitExceeded === false &&
                        this.dispatch('popCheckboxGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                        this.selfModel = val;
                    }
                }
            },
            isChecked () {
                if ({}.toString.call(this.model) === '[object Boolean]') {
                    return this.model;
                } else if (Array.isArray(this.model)) {
                    return this.model.indexOf(this.label) > -1;
                } else if (this.model !== null && this.model !== undefined) {
                    return this.model === this.trueLabel;
                }
            },
            isGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'popCheckboxGroup') {
                        parent = parent.$parent;
                    } else {
                        this._checkboxGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            store () {
                return this._checkboxGroup ? this._checkboxGroup.value : this.value;
            }
        },
        methods: {
            addToStore () {
                if (
                Array.isArray(this.model) &&
                this.model.indexOf(this.label) === -1
                ) {
                    this.model.push(this.label);
                } else {
                    this.model = this.trueLabel || true;
                }
            },
            handleChange (ev) {
                this.$emit('change', ev);
                if (this.isGroup) {
                    this.$nextTick(_ => {
                        this.dispatch('popCheckboxGroup', 'change', [this._checkboxGroup.value]);
                    });
                }
            },
            // 阻止冒泡，即这里span会冒泡一次，input checkbox也会冒泡一次，所以需要阻止span的冒泡
            stopHandler () {
                return false;
            }
        },
        created () {
            this.checked && this.addToStore();
        }
    };
</script>



<template>
    <li class="pop-select-item" 
        :class="[{'is-disabled': disabled || groupDisabled, 'is-selected': itemSelected}]"
        @click.stop="getCurrentItem"
        v-show="visible"
    >
        <slot>{{currentLabel}}</slot>
    </li>
</template>

<script>
    import Emitter from 'src/utils/emitter.js';
    export default {
        name: 'popSelectOption',
        componentName: 'popSelectOption',
        props: {
            value: {
                required: true
            },
            label: [String, Number],
            created: Boolean,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mixins: [Emitter],
        data () {
            return {
                groupDisabled: false,
                visible: true
            };
        },
        computed: {
            currentLabel () {
                return this.label || (this.isObject ? '' : this.value);
            },
            currentValue () {
                return this.value || this.label || '';
            },
            parent () {
                let parent = this.$parent;
                while (parent.$options.componentName !== 'popSelect') {
                    parent = parent.$parent;
                }
                return parent;
            },
            itemSelected () {
                return this.currentValue === this.parent.value;
            }
        },
        methods: {
            getCurrentItem () {
                if (!this.disabled) {
                    this.dispatch('popSelect', 'handleOptionClick', {value: this.currentValue, label: this.currentLabel});
                }
            },
            handleGroupDisabled (val) {
                this.groupDisabled = val;
            }
        },
        created () {
            this.$on('handleGroupDisabled', this.handleGroupDisabled);
        }
    };
</script>

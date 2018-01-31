<template>
    <div class="pop-select-wrap">
        <label class="pop-select" v-clickOutSide="handlerClose">
            <input 
                class="pop-select__input" 
                :class="[{'is-disabled': disabled}, 'is-' + size]"
                :disabled="disabled"
                :style="{'width': width}"
                type="text" 
                ref="reference"
                :placeholder="placeholder"
                v-model="currentLabel"
                :readonly="!filterable"
                @click="handlerClick"
                @focus="handlerFocus"
                @blur="handlerBlur"
                :name="name"
            >
            <transition name="pop-zoom-in-top" @after-leave="doDestroy">
                <pop-select-menu ref="popper" v-show="visible" > 
                    <slot></slot>
                    <div slot="none" class="pop-select-menu__empty" v-if="hasMatchData">{{noMatchText}}</div>
                </pop-select-menu>
            </transition>
        </label>
        <span class="pop-select__down" @mouseenter="showCloseIconHandler" @mouseleave="hideCloseIconHandler" @click="closeIconHandler">
            <i :class="['pop-icon-' + toggleIcon, {'pop-icon-close_light': newClearable}]" ></i>
        </span>
    </div>
    
</template>

<script>
    import popSelectMenu from './select-menu.vue';
    import Emitter from 'src/utils/emitter.js';
    import clickOutSide from 'src/utils/clickoutside.js';
    export default {
        name: 'popSelect',
        componentName: 'popSelect',
        components: {
            popSelectMenu
        },
        data () {
            return {
                visible: false,
                inputWidth: 0,
                currentLabel: '',
                newClearable: false,
                hasMatchData: false
            };
        },
        props: {
            placeholder: {
                type: String,
                default: '请选择'
            },
            value: {
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 单选时是否可清空选项
            clearable: {
                type: Boolean,
                default: false
            },
            // kesuosuo
            filterable: {
                type: Boolean,
                default: false
            },
            name: String,
            noMatchText: {
                type: String,
                default: '无匹配数据'
            },
            size: {
                type: String,
                default: 'normal'
            },
            width: {
                type: String
            }
        },
        directives: {
            clickOutSide
        },
        mixins: [Emitter],
        watch: {
            visible (val) {
                if (!val) {
                    this.$refs.reference.blur();
                    this.broadcast('popSelectMenu', 'destroyPopper');
                } else {
                    this.resetInputWidth();
                    this.broadcast('popSelectMenu', 'updatePopper');
                }
                this.$emit('visible-change', val);
            },
            currentLabel (val) {
                if (this.filterable) {
                    if (val) {
                        this.queryOption(val);
                    } else {
                        this.resetOption();
                        this.hasMatchData = false;
                    }
                }
                this.$emit('change', val);
            }
        },
        methods: {
            handlerClose () {
                this.visible = false;
            },
            handlerFocus () {
                this.$emit('focus');
            },
            handlerBlur () {
                this.$emit('blur');
            },
            handleOptionSelect (option) {
                console.log(option);
                this.visible = false;
                this.$emit('input', option.value);
                this.currentLabel = option.label;
            },
            closeIconHandler (e) {
                console.log(e);
                e.stopPropagation();
                this.$emit('input', '');
                this.visible = false;
                this.$emit('clear');
                this.currentLabel = '';
                return false;
            },
            showCloseIconHandler () {
                if (!this.clearable) return;
                if (this.currentLabel) {
                    this.newClearable = true;
                }
            },
            hideCloseIconHandler () {
                this.newClearable = false;
            },
            toggleMenu () {
                if (this.visible) {
                    this.visible = !this.visible;
                }
            },
            handlerClick (e) {
                this.visible = !this.visible;
            },
            queryOption (val) {
                const childs = this.$children[0].$children;
                let result = 0;
                let optionNumber = 0;
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (childs[i].$options.componentName === 'popSelectOption') {
                        optionNumber += 1;
                        if (childs[i].label.indexOf(val) === -1) {
                            childs[i].visible = false;
                            if (!childs[i].visible) {
                                result += 1;
                            }
                        }
                    }
                }

                this.hasMatchData =  result === optionNumber ? true : false; // eslint-disable-line
            },
            resetOption () {
                const childs = this.$children[0].$children;
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (childs[i].$options.componentName === 'popSelectOption') {
                        childs[i].visible = true;
                    }
                }
            },
            setSelectOption () {
                const childs = this.$children[0].$children;
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (childs[i].$options.componentName === 'popSelectOption' && childs[i].value === this.value) {
                        this.currentLabel = childs[i].label;
                    }
                }
            },
            resetInputWidth () {
                this.inputWidth = this.$refs.reference.getBoundingClientRect().width;
            },
            doDestroy () {
                this.$refs.popper && this.$refs.popper.doDestroy();
            }
        },
        computed: {
            toggleIcon () {
                return this.visible ? 'triangleupfill' : 'triangledownfill';
            }
        },
        created () {
            this.$on('handleOptionClick', this.handleOptionSelect);
        },
        mounted () {
            this.$nextTick(() => {
                if (this.$refs.reference) {
                    this.inputWidth = this.$refs.reference.getBoundingClientRect().width;
                }
            });
            // shezhichushizhi
            this.setSelectOption();
        }
    };
</script>


<template>
    <transition name="dialog-fade" >
        <div class="pop-dialog-wrap" ref="dialogWrap" v-show="visible" :style="{zIndex: zIndex}" @click.self="handlerModalClick" @keypress="handlerModalClick">
            <div class="pop-dialog" :style="{width: width, top: top}">
                <div class="pop-dialog__header">
                    <slot name="title">
                        <span class="pop-dialog__title">{{title}}</span>
                    </slot>
                    <span class="pop-dialog__close" v-if="showClose" @click="handlerModalClick">
                        <i class="pop-icon-close_light"></i>
                    </span>
                </div>
                <div class="pop-dialog__content">
                    <slot></slot>
                </div>
                <div class="pop-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import getScrollBarWidth from 'src/utils/scrollbar-width.js';
    import {getStyle} from 'src/utils/dom.js';
    import Emitter from 'src/utils/emitter.js';
    export default {
        name: 'popDialog',
        componentName: 'popDialog',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title: String,
            top: {
                type: [String, Number],
                default: '15%'
            },
            modal: {
                type: Boolean,
                default: true
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            lockScroll: {
                type: Boolean,
                default: true
            },
            className: {},
            closeOnClickModal: {
                type: Boolean,
                default: true
            },
            closeOnPressEscape: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            width: {
                type: [String, Number],
                default: '30%'
            }
        },
        data () {
            return {
                modalEle: null,
                modalParent: null,
                zIndex: 100,
                bodyOverflow: null,
                bodyPaddingRight: null
            };
        },
        mixins: [Emitter],
        watch: {
            visible (val) {
                console.log(val);
                this.$emit('update:visible', val);
                if (val) {
                    this.open();
                    this.$emit('open');
                } else {
                    this.close();
                    this.$emit('close');
                }
            }
        },
        methods: {
            open () {
                this.openModal();
                this.updatePopper();
            },
            close () {
                this.closeModal();
            },
            updatePopper () {
                this.broadcast('popSelectDropdown', 'updatePopper');
            },
            lockScrollScreen () {
                let scrollBarWidth;
                if (!this.lockScroll) return;
                if (!this.bodyOverflow) {
                    this.bodyPaddingRight = document.body.style.paddingRight;
                    this.bodyOverflow = document.body.style.overflow;
                }
                scrollBarWidth = getScrollBarWidth();
                let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
                let bodyOverflowY = getStyle(document.body, 'overflowY');
                if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll')) {
                    document.body.style.paddingRight = scrollBarWidth + 'px';
                }
                document.body.style.overflow = 'hidden';
            },
            unlockScrollScreen () {
                if (!this.lockScroll) return;
                if (this.modal && this.bodyOverflow !== 'hidden') {
                    document.body.style.overflow = this.bodyOverflow;
                    document.body.style.paddingRight = this.bodyPaddingRight;
                }
                this.bodyOverflow = null;
                this.bodyPaddingRight = null;
            },
            openModal () {
                if (!this.modal) return;
                this.modalEle = document.createElement('div');
                this.modalEle.className = 'pop-dialog__modal';
                this.modalEle.style.zIndex = this.zIndex - 1;
                this.modalParent = document.querySelectorAll(this.appendTo)[0];
                this.modalParent && this.modalParent.appendChild(this.modalEle);
                this.lockScrollScreen();
            },
            closeModal () {
                if (!this.modal) return;
                this.modalParent.removeChild(this.modalEle);
                this.modalEle = null;
                this.modalParent = null;
                this.unlockScrollScreen();
            },
            handlerModalClick () {
                this.$emit('update:visible', false);
            },
            handlerModalKeydown (e) {
                if (e.keyCode === 27 && this.closeOnPressEscape) {
                    this.handlerModalClick();
                }
            }
        },
        mounted () {
            window.addEventListener('keydown', this.handlerModalKeydown);
        },
        beforeDestroy () {
            window.removeEventListener('keydown', this.handlerModalKeydown);
        }
    };
</script>

<template>
    <span>
        <transition name="transition" @after-leave="doDestroy">
            <div class="pop-popover"
                :class="className"
                ref="popper"
                v-show="!disabled && showPopper"
                :style="{'width': width + 'px'}"
            >
                <div class="pop-popover__title" v-if="title">{{title}}</div>
                <div class="pop-popover__content"><slot>{{content}}</slot></div>
            </div>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>

<script>
    import vuePopover from 'src/utils/vue-popover.js';
    export default {
        name: 'popPopover',
        component: 'popPopover',
        props: {
            trigger: {
                default: 'hover',
                type: String
            },
            title: String,
            content: String,
            width: {
                default: '150',
                type: String
            },
            placement: {
                default: 'bottom',
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {},
            offset: {
                type: Number,
                default: 0
            },
            transition: {
                type: String,
                default: 'fade-in-linear'
            },
            visibleArrow: {
                type: Boolean,
                default: true
            },
            className: String,
            openDelay: {
                type: Number,
                default: 0
            }
        },
        mixins: [vuePopover],
        watch: {
            showPopper (newValue, oldValue) {
                newValue ? this.$emit('show') : this.$emit('hide');
            }
        },
        mounted () {
            let reference = this.reference || this.$refs.reference;
            let popper = this.popper || this.$refs.popper;

            if (!reference && this.$slots.reference && this.$slots.reference[0]) {
                reference = this.referenceEle = this.$slots.reference[0].elm;
            }

            switch (this.trigger) {
                case 'hover':
                    this.bindEvent(reference, 'mouseenter', this.handleMouseEnter);
                    this.bindEvent(popper, 'mouseenter', this.handleMouseEnter);
                    this.bindEvent(reference, 'mouseleave', this.handleMouseLeave);
                    this.bindEvent(popper, 'mouseleave', this.handleMouseLeave);
                    break;
                case 'click':
                    this.bindEvent(reference, 'click', this.handleToggleClick);
                    this.bindEvent(document, 'click', this.handleDocumentClick);
                    break;
                case 'focus':
                    let found = false;

                    if ([].slice.call(reference.children).length) {
                        const children = reference.childNodes;
                        const len = children.length;
                        for (let i = 0; i < len; i++) {
                            if (children[i].nodeName === 'INPUT' ||
                                children[i].nodeName === 'TEXTAREA') {
                                this.bindEvent(children[i], 'focus', this.doShow);
                                this.bindEvent(children[i], 'blur', this.doClose);
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) return;
                    if (reference.nodeName === 'INPUT' ||
                        reference.nodeName === 'TEXTAREA') {
                        this.bindEvent(reference, 'focus', this.doShow);
                        this.bindEvent(reference, 'blur', this.doClose);
                    } else {
                        this.bindEvent(reference, 'mousedown', this.doShow);
                        this.bindEvent(reference, 'mouseup', this.doClose);
                    }
                    break;
            }
        },
        methods: {
            bindEvent (ele, eventName, callback) {
                ele && ele.addEventListener(eventName, callback, false);
            },
            unbindEvent (ele, eventName, callback) {
                ele && ele.removeEventListener(eventName, callback);
            },
            handleMouseEnter () {
                clearTimeout(this._timer);
                if (this.openDelay) {
                    this._timer = setTimeout(() => {
                        this.showPopper = true;
                    }, this.openDelay);
                } else {
                    this.showPopper = true;
                }
            },
            handleMouseLeave () {
                clearTimeout(this._timer);
                this._timer = setTimeout(() => {
                    this.showPopper = false;
                }, 200);
            },
            handleToggleClick () {
                this.showPopper = !this.showPopper;
            },
            handleDocumentClick (e) {
                let reference = this.reference || this.$refs.reference;
                let popper = this.popper || this.$refs.popper;

                if (!reference && this.$slots.reference && this.slots.reference[0]) {
                    reference = this.referenceEle = this.slots.reference[0].elm;
                }

                if (!this.$el ||
                !reference ||
                this.$el.contains(e.target) ||
                reference.contains(e.target) ||
                !popper ||
                popper.contains(e.target)) return;

                this.showPopper = false;
            },
            doShow () {
                this.showPopper = true;
            },
            doClose () {
                this.showPopper = false;
            }
        },
        destroyed () {
            const reference = this.reference;

            this.unbindEvent(reference, 'click', this.doToggle);
            this.unbindEvent(reference, 'mouseup', this.doClose);
            this.unbindEvent(reference, 'mousedown', this.doShow);
            this.unbindEvent(reference, 'focus', this.doShow);
            this.unbindEvent(reference, 'blur', this.doClose);
            this.unbindEvent(reference, 'mouseleave', this.handleMouseLeave);
            this.unbindEvent(reference, 'mouseenter', this.handleMouseEnter);
            this.unbindEvent(document, 'click', this.handleDocumentClick);
        }
    };
</script>

import Vue from 'vue';
import popper from 'popper.js';
const PopperJS = Vue.prototype.$isServer ? function () {} : popper;
const stop = e => e.stopPropagation();

const PopupManager = {
    zIndex: 2000,
    nextZIndex: function () {
        return PopupManager.zIndex++;
    }
};

export default {
    props: {
        // 出现的位置
        placement: {
            type: String,
            default: 'bottom'
        },
        // 默认边框padding
        boundariesPadding: {
            type: Number,
            default: 5
        },
        // 关联dom
        reference: {},
        // popper
        popper: {},
        // 偏移位置
        offset: {
            default: 0
        },
        // v-model绑定是否显示与隐藏
        value: Boolean,
        // 是否显示箭头
        visibleArrow: Boolean,
        // 过渡动画
        transition: String,
        // 默认append到body元素
        appendToBody: {
            type: Boolean,
            default: true
        },
        // 默认popper配置项
        popperOptions: {
            type: Object,
            default () {
                return {
                    gpuAcceleration: false
                };
            }
        }
    },
    data () {
        return {
            showPopper: false,
            currentPlacement: ''
        };
    },
    watch: {
        value: {
            immediate: true,
            handler (val) {
                this.showPopper = val;
                this.$emit('input', val);
            }
        },
        showPopper (val) {
            val ? this.updatePopper() : this.destroyPopper();
            this.$emit('input', val);
        }
    },
    methods: {
        createPopper () {
            // 服务端渲染直接return
            if (this.$isServer) return;
            this.currentPlacement = this.currentPlacement || this.placement;
            // 检测位置参数，如果不符合要求直接return
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
                return;
            }
            const options = this.popperOptions;
            // 获取popover元素
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
            // 获取reference元素，注意这里是通过指令来this.$refs.reference来赋值
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

            if (!reference &&
                this.$slots.reference &&
                this.$slots.reference[0]) {
                // 如果reference为空，则取this.$slots.reference[0]内的第一个元素
                reference = this.referenceElm = this.$slots.reference[0].elm;
            }

            if (!popper || !reference) return;
            // 是否生成箭头
            if (this.visibleArrow) this.appendArrow(popper);
            // 是否直接append到body
            if (this.appendToBody) document.body.appendChild(this.popperElm);
            // 创建的时候如果有this.popperJS，则先destory，在create
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
            }

            options.placement = this.currentPlacement;

            options.offset = this.offset;
            // new 一个popover出来
            this.popperJS = new PopperJS(reference, popper, options);
            // 创建的时候重置下位置
            this.popperJS.options.onCreate(_ => {
                this.$emit('created', this);
                this.resetTransformOrigin();
                this.$nextTick(this.updatePopper);
            });
            // 如果有onUpdate则调用onUpdate方法
            if (typeof options.onUpdate === 'function') {
                this.popperJS.onUpdate(options.onUpdate);
            }
            // 设置popper的z-index
            this.popperJS.popper.style.zIndex = PopupManager.nextZIndex();
            // 阻止popover上点击事件冒泡
            this.popperElm.addEventListener('click', stop);
        },
        updatePopper () {
            this.popperJS ? this.popperJS.update() : this.createPopper();
        },
        doDestroy () {
            if (this.showPopper || !this.popperJS) return;
            this.popperJS.destroy();
            this.popperJS = null;
        },
        // 重置位置
        destroyPopper () {
            if (this.popperJS) {
                this.resetTransformOrigin();
            }
        },
        resetTransformOrigin () {
            let placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };
            let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
            let origin = placementMap[placement];
            this.popperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
        },
        appendArrow (element) {
            if (this.appended) {
                return;
            }

            this.appended = true;

            const arrow = document.createElement('div');

            arrow.setAttribute('x-arrow', '');
            arrow.className = 'pop-popover__arrow';
            element.appendChild(arrow);
        }
    },
    beforeDestroy () {
        this.doDestroy();
        if (this.popperElm && this.popperElm.parentNode === document.body) {
            this.popperElm.removeEventListener('click', stop);
            document.body.removeChild(this.popperElm);
        }
    },
    // keep-alive 组件停用时调用。
    deactivated () {
        this.$options.beforeDestroy[0].call(this);
    }
};

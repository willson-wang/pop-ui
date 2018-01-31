<template>
    <div class="pop-select-menu" :style="{minWidth: minWidth}">
        <template v-if="hasOptionGroup">
            <slot ></slot>
        </template>
        <ul v-if="!hasOptionGroup">
            <slot></slot>
        </ul>
        <slot name="none"></slot>
    </div>
</template>

<script>
    import vuePopover from 'src/utils/vue-popover.js';
    export default {
        name: 'popSelectMenu',
        componentName: 'popSelectMenu',
        data () {
            return {
                minWidth: '',
                hasOptionGroup: false
            };
        },
        props: {
            placement: {
                default: 'bottom-start'
            },
            boundariesPadding: {
                default: 0
            },
            popperOptions: {
                default () {
                    return {
                        gpuAcceleration: false
                    };
                }
            }
        },
        mixins: [vuePopover],
        watch: {
            '$parent.inputWidth' () {
                this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
            }
        },
        methods: {
            judgeOptionGroup () {
                const childs = this.$children;
                for (let i = 0, len = childs.length; i < len; i++) {
                    let name = childs[i].$options.componentName;
                    if (name === 'popSelectOptionGroup') {
                        this.hasOptionGroup = true;
                        break;
                    }
                }
            }
        },
        mounted () {
            this.referenceElm = this.$parent.$refs.reference;
            this.$parent.popperElm = this.popperElm = this.$el;
            this.$on('updatePopper', () => {
                if (this.$parent.visible) this.updatePopper();
            });
            this.$on('destroyPopper', this.destroyPopper);
            this.judgeOptionGroup();
        }
    };
</script>

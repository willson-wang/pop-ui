<template>
    <transition name="pop-message-fade">
        <div  
        class="pop-message clearFix"
        :class="[className]"
        v-show="visible"
        @mouseenter="clearTimer"
        @mouseleave="startTimer">
            <div class="pop-message__logo" :class="'pop-message__logo--' + type"><i :class="'pop-icon-' + newType"></i></div>
            <div class="pop-message__group">
                <slot><p class="pop-message__content">{{ message }}</p></slot>
                <div v-if="showClose" class="pop-message__closeBtn" @click="close">
                    <i class="pop-icon-close_light"></i>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'message',
        data () {
            return {
                visible: false,
                message: '',
                duration: 3000,
                type: 'info',
                iconClass: '',
                className: '',
                onClose: null,
                showClose: false,
                closed: false,
                timer: null
            };
        },
        watch: {
            closed (newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        computed: {
            newType () {
                return this.iconClass ? this.iconClass : this.type;
            }
        },
        methods: {
            destroyElement () {
                // 需要注意的时当该元素没有设置transition过渡属性的时候transitionend是没有触发的
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            close () {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            },

            clearTimer () {
                clearTimeout(this.timer);
            },

            startTimer () {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            }
        },
        mounted () {
            this.startTimer();
        }
    };
</script>

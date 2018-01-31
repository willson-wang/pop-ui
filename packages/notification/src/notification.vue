<template>
    <transition name="pop-notification-fade">
        <div class="pop-notification clearFix" 
            :class="className"
            v-show="showNotification"
            @mouseenter="clearTime"
            @mouseleave="startTime"
            @click="click"
            :style="{'padding-left': newType ? '40px' : '10px'}"
            >
            <div class="pop-notification__icon"  :class="'pop-notification__icon--' + type" v-if="newType">
                <i :class="'pop-icon-' + newType"></i>
            </div>
            <div class="pop-notification__group">
                <div class="pop-notification__title" v-if="title">{{title}}</div>
                <div class="pop-notification__content">
                    <p><slot>{{message}}</slot></p>
                </div>
            </div>
            <div class="pop-notification__closeBtn" v-if="showClose" @click="close">
                <i class="pop-icon-close_light"></i>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'popNotification',
        componentName: 'popNotification',
        data () {
            return {
                showNotification: false,
                title: '',
                message: '',
                showClose: false,
                type: '',
                icon: '',
                duration: 3000,
                closed: false,
                onClose: null,
                timer: null,
                className: ''
            };
        },
        computed: {
            newType () {
                return this.icon ? this.icon : this.type;
            }
        },
        watch: {
            closed (newValue) {
                if (newValue) {
                    this.showNotification = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        methods: {
            close () {
                this.closed = true;
                if (typeof onClose === 'function') {
                    this.onClose();
                }
            },
            click () {
                if (typeof this.onClick === 'function') {
                    this.onClick();
                }
            },
            clearTime () {
                clearTimeout(this.timer);
            },
            startTime () {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            },
            destroyElement () {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        mounted () {
            this.startTime();
        }
    };
</script>

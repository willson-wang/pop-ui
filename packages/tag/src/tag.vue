<template>
    <transition :name="closeTransition ? '' : 'pop-zoom-in-center'">
        <span class="pop-tag"
            :class="[className, 'pop-tag--' + type]"
        >
            <slot></slot>
            <span class="pop-tag__close" @click="close" v-if="closeable">
                <i class="pop-icon-close_light"></i>
            </span>
        </span>
    </transition>
</template>

<script>
    export default {
        name: 'popTag',
        componentName: 'popTag',
        props: {
            className: {},
            type: {
                type: String,
                default: 'default'
            },
            closeable: {
                type: Boolean,
                default: false
            },
            closeTransition: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close () {
                this.$emit('close');
            }
        }
    };
</script>

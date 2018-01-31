<template>
    <button 
        :disabled="disabled"
        :type="nativeType"
        class="pop-button"
        @click="handleClick"
        :class="['pop-button--' + type , 'pop-button--' + size, {'is-plain': isPlain, 'is-round': isRound}]"
    >
        <template v-if="!loading && icon">
            <i :class="'pop-icon-' + icon" @click="handleInnerClick"></i>
        </template>
        <template v-if="loading">
            <i class="pop-icon-loading" @click="handleInnerClick"></i>
        </template>
        <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
    </button>  
</template>

<script>
    export default {
        name: 'popButton',
        props: {
            type: {
                validator (value) {
                    if (typeof value === 'string') {
                        const isExist = ['primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(value);
                        return (isExist !== -1 ? value : 'default');
                    } else {
                        return 'default';
                    }
                },
                default: 'default'
            },
            size: {
                validator (value) {
                    if (typeof value === 'string') {
                        const isExist = ['large', 'small', 'mini', 'normal'].indexOf(value);
                        return (isExist !== -1 ? value : 'normal');
                    } else {
                        return 'normal';
                    }
                },
                default: 'normal'
            },
            isPlain: {
                type: Boolean,
                default: false
            },
            isRound: {
                type: Boolean,
                default: false
            },
            icon: String,
            loading: Boolean,
            nativeType: {
                validator (value) {
                    if (typeof value === 'string') {
                        const isExist = ['button', 'submit', 'reset'].indexOf(value);
                        return (isExist !== -1 ? value : 'button');
                    } else {
                        return 'button';
                    }
                },
                default: 'button'
            },
            disabled: Boolean
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            },
            handleInnerClick (event) {
                if (this.disabled) {
                    event.stopPropagation();
                    return false;
                }
            }
        }
    };
</script>

<template>
    <ul class="pop-option-group__wrap">
        <li class="pop-option-group__title">{{label}}</li>
        <li>
            <ul class="pop-option-group">
                <slot></slot>
            </ul>
        </li>
    </ul>
</template>

<script>
    import Emitter from 'src/utils/emitter.js';
    export default {
        name: 'popSelectOptionGroup',
        componentName: 'popSelectOptionGroup',
        props: {
            label: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mixins: [Emitter],
        watch: {
            disabled (val) {
                this.broadcast('popOption', 'handleGroupDisabled', val);
            }
        },
        mounted () {
            if (this.disabled) {
                this.broadcast('popOption', 'handleGroupDisabled', this.disabled);
            }
        }
    };
</script>
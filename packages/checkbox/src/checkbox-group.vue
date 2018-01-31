<template>
  <div class="pop-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
    import emitter from 'src/utils/emitter.js';
    export default {
        name: 'popCheckboxGroup',
        componentName: 'popCheckboxGroup',
        props: {
            value: {},
            min: Number,
            max: Number,
            size: String,
            fill: String,
            textColor: String
        },
        mixin: [emitter],
        watch: {
            value (value) {
                // this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        }
    };
</script>




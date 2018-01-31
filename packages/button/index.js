import Button from './src/button.vue';

Button.install = function (Vue) {
    Vue.component('pop-button', Button);
};

export default Button;

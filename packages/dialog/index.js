import Dialog from './src/dialog.vue';

Dialog.install = function (Vue) {
    Vue.component('pop-dialog', Dialog);
};

export default Dialog;

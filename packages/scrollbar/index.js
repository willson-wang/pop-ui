import Scrollbar from './src/scrollbar.vue';

Scrollbar.install = function (Vue) {
    Vue.component('pop-scrollbar', Scrollbar);
};

export default Scrollbar;

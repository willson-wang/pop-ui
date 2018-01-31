import Pagination from './src/pagination.vue';

Pagination.install = function (Vue) {
    Vue.component('pop-pagination', Pagination);
};

export default Pagination;

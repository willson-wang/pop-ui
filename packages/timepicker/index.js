import Timepicker from './datepicker/src/timepicker.vue';

Timepicker.install = function (Vue) {
    Vue.component('pop-timepicker', Timepicker);
};

export default Timepicker;

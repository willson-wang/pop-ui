import SelectOption from '../select/src/select-option.vue';

SelectOption.install = function (Vue) {
    Vue.component('pop-select-option', Selection);
};

export default SelectOption;

import Popover from './src/main';
import directive from './src/directive';
import Vue from 'vue';

Vue.directive('popPopover', directive);

/* istanbul ignore next */
Popover.install = function (Vue) {
    Vue.directive('popPopover', directive);
    Vue.component(Popover.name, Popover);
};
Popover.directive = directive;

export default Popover;

import Vue from 'vue';
import App from './App';
import router from './router';
import DemoBlock from './views/demo-block';
import PopUI from '../src/index.js';
import '../packages/theme-default/lib/index.css';

Vue.config.productionTip = false;
Vue.component('demo-block', DemoBlock);
Vue.use(PopUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

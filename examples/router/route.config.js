import Layout from '@/views/layout/layout';
import Home from '@/views/layout/home';
import MainGuide from '@/views/main-guide';
import navConfig from './nav.config';

let routes = [{
    path: '/home',
    component: Layout,
    redirect: '/home/home_one',
    hidden: true,
    name: 'home',
    desc: '首页',
    children: [{ path: 'home_one', component: Home, name: 'home_one' }]
},
{
    path: '/mian_guide',
    component: Layout,
    redirect: '/mian_guide/mian_guide_one',
    hidden: true,
    name: 'mian_guide',
    desc: '指南',
    children: [{ path: 'mian_guide_one', component: MainGuide, name: 'mian_guide_one' }]
},
{
    path: '/component',
    name: 'component',
    desc: '组件',
    component: Layout,
    redirect: '/component/original',
    hidden: true,
    children: []
},
{
    path: '*',
    redirect: '/home'
}
];

let componentRoutes = [];

Object.keys(navConfig).forEach((header) => {
    componentRoutes = componentRoutes.concat(navConfig[header]);
});
console.log(componentRoutes);
let addComponent = (router) => {
    router.forEach((route) => {
        if (route.items) {
            addComponent(route.items);
            componentRoutes = componentRoutes.concat(route.items);
        } else {
            route.component = r => require.ensure([], () =>
                r(require(`../docs/${route.name}.md`)));
        }
    });
};

addComponent(componentRoutes);

routes.forEach((item) => {
    if (item.name === 'component') {
        item.children = componentRoutes.slice();
    }
});
console.log(routes);

export default routes;

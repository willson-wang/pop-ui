<template>
    <ul class="ui-top-nav f-l clearFix">
        <li v-for="item in routeList" :key="item.name" v-if="item.name">
            <router-link :to="item.path">{{item.desc}}</router-link>
        </li>
    </ul>
</template>

<script>
    import routes from '@/router/route.config.js';
    export default {
        name: 'topNav',
        computed: {
            routeList () {
                return routes.slice();
            }
        }
    };
</script>

<style lang="less" scoped>
@import (reference) '../../assets/less/index.less';

.ui-top-nav {
    li {
        float: left;
        
        a {
            display: block;
            padding: 0 30px;
            color: @color-white;
            margin-right: 10px;
        }
    }
}
</style>

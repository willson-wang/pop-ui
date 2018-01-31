<template>
    <ul class="ui-sidebar-wrap f-l">
        <li v-for="(value, key, index) in sideBarList" :key="index">
            <span>{{key}}</span>
            <ul>
                <li v-for="item in value" :key="item.name">
                    <span v-if="item.type" >{{item.desc}}</span>
                    <router-link v-else :to="item.path">{{item.desc}}</router-link>
                    <ul v-if="item.items">
                        <li v-for="val in item.items" :key="val.name">
                            <router-link :to="val.path">{{val.desc}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>  
    </ul>
</template>

<script>
    import navRouters from '@/router/nav.config.js';
    export default {
        name: 'sideNav',
        data () {
            return {
                sideBarList: navRouters
            };
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';

    .ui-sidebar-wrap {
        width: 300px;
        text-align: left;
        padding-top: 32px;
        >li {
            >span {
                display: block;
                height: 30px;
                line-height: 30px;
                color: @color-info1;
                font-size: 16px;
                text-indent: 30px;
            }

            >ul {
                >li {
                    
                   >a, >span {
                       display: block;
                       font-size: 14px;
                       text-indent: 50px;
                       height: 30px;
                       line-height: 30px;
                   } 

                   >span {
                       color: @color-info3;
                   }

                   >ul li a{
                       display: block;
                       font-size: 12px;
                       text-indent: 70px;
                       height: 20px;
                       line-height: 20px;
                   }
                }
            }
        }
    }
</style>

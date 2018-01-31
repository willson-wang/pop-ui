<template>
    <div class='ui-app-wrap'>
        <main-header></main-header>
        <div class='ui-main-wrap'>
            <div>
                <side-bar v-show="isShow"></side-bar>
                <transition name='fade' mode='out-in'>
                    <router-view :key="key" :class="{'ui-view' : isShow}"></router-view>
                </transition>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>

<script>
    import {mainHeader, mainFooter, SideBar} from '@/views/layout';
    export default {
        name: 'layout',
        components: {
            mainHeader,
            mainFooter,
            SideBar
        },
        data () {
            return {};
        },
        computed: {
            key () {
                console.log(this.$route);
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
            },
            isShow () {
                let show = false;
                if (this.$route.fullPath.indexOf('component') !== -1) {
                    show = true;
                }
                return show;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-app-wrap {
        
        width: 100%;
        .ui-main-wrap {
            width: 100%;
            padding: 40px;
            background-color: @color-body-bg;

            >div {
                background-color: @color-white;
                min-height: 680px;
                border-radius: 10px;
                overflow: hidden;
            }

            .ui-view {
                width: auto;
                margin-left: 300px;
                text-align: left;
                padding-top: 16px;
                padding-bottom: 20px;
            }
        }
    }
    
</style>


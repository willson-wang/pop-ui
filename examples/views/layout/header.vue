<template>
    <div class="ui-header-wrap clearFix">
        <div class="f-l ui-header-logo">
            <img src="../../assets/logo.png" alt="logo">
        </div>
        <top-nav></top-nav>
    </div>
</template>

<script>
    import TopNav from './top-nav';
    export default {
        name: 'mainHeader',
        components: {
            TopNav
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-header-wrap {
        height: 80px;
        line-height: 80px;
        background-color: @color-primary;

        .ui-header-logo {
            width: 70%;
            height: 80px;
            line-height: 80px;
            text-align: left;
            
            img {
                width: 40px;
                height: 40px;
                line-height: 40px;
                margin: 20px 0 0 10%;
            }
        }
    }
</style>


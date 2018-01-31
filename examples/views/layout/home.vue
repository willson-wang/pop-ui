<template>
    <div class="ui-home-wrap">
        <div class="ui-home-logo">
            <img src="../../assets/logo.png" alt="logo">
        </div>
        <p>一款轻量级、模块化、易维护的前端 Vue UI 组件库</p>
        <div class="ui-home-btn">
            <button type="button">开始使用</button>
            <button type="button">GitHub</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home'
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-home-wrap {

        .ui-home-logo {
            padding: 200px 0 80px;
            img {
                width: 200px;
                height: 200px;
            }
        }

        >p {
            font-size: 20px;
        }

        .ui-home-btn {
            padding: 60px 0 50px;
            font-size: 0;

            button {
                display: inline-block;
                width: 200px;
                height: 60px;
                line-height: 60px;
                border: 1px solid @color-bdr;
                border-radius: 30px;
                cursor: pointer;
                font-size: 16px;
                outline: none;

                &:first-of-type {
                    color: @color-white;
                    // background: linear-gradient(90deg, #00aeff,#3369e7);
                    background: linear-gradient(90deg, #00aeff, @color-primary);
                }

                &:last-of-type {
                    background-color: @color-white;
                    color: @color-info1;
                    border-color: @color-primary;
                }
            }
        }
    }
</style>

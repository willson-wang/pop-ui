<template>
    <div class="ui-footer-wrap">
        <div class="f-l ui-footer-userinfo">
            <p>author: willson-wang</p>
            <p>email: 4556@qq.com</p>
            <p>github: https://github.com</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'mainFooter'
    };
</script>

<style lang="less" scoped>
    .ui-footer-wrap {
        height: 100px;
        line-height: 100px;

        .ui-footer-userinfo {
            width: 100%;
            font-size: 14px;
            p {
                line-height: 16px;
                text-align: center;
            }
        }

    }
</style>

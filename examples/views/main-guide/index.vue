<template>
    <div class="ui-main-guide">
        <p>指南</p>
        <pop-row>
        <pop-col :span="24"><div class="grid-content bg-purple"></div></pop-col>
        </pop-row>
        <pop-row >
        <pop-col :span="8"><div class="grid-content bg-purple"></div></pop-col>
        <pop-col :span="8"><div class="grid-content bg-purple-light"></div></pop-col>
        <pop-col :span="8"><div class="grid-content bg-purple"></div></pop-col>
        </pop-row>
        <pop-row >
        <pop-col :span="4"><div class="grid-content bg-purple"></div></pop-col>
        <pop-col :span="4"><div class="grid-content bg-purple-light"></div></pop-col>
        <pop-col :span="4"><div class="grid-content bg-purple"></div></pop-col>
        <pop-col :span="4"><div class="grid-content bg-purple-light"></div></pop-col>
        <pop-col :span="4"><div class="grid-content bg-purple"></div></pop-col>
        <pop-col :span="4"><div class="grid-content bg-purple-light"></div></pop-col>
        </pop-row>
    </div>
</template>

<script>
    export default {
        name: 'main_guide',
        computed: {
            items () {
                const arr = [];
                for (let i = 0; i < 40; i++) {
                    arr[i] = i;
                }
                return arr;
            },
            items2 () {
                const arr = [];
                for (let i = 0; i < 5; i++) {
                    arr[i] = i;
                }
                return arr;
            }
        }
    };
</script>



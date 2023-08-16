<template>
    <view>
        <u-tabs :list="list1" @click="click"></u-tabs>
    </view>
</template>

<script setup lang="ts">
   import { ref, reactive } from 'vue';
    const list1 = reactive([{
        name: '关注',
    }, {
        name: '推荐',
    }, {
        name: '电影'
    }, {
        name: '科技'
    }, {
        name: '音乐'
    }, {
        name: '美食'
    }, {
        name: '文化'
    }, {
        name: '财经'
    }, {
        name: '手工'
    }]);

    const click = () => {

    }

</script>

<style scoped lang="scss">

</style>
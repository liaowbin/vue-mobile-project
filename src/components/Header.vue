<template>
    <van-nav-bar :title="title" :left-text="leftText" :left-arrow="leftArrow" @click-left="onClickLeft"/>    
</template>

<script>
export default {
    props: [
        "title",
        "leftText",
        "leftArrow"    
    ],
    methods: {
        onClickLeft() {
            this.$emit("back");
        }
    },
}
</script>

<style lang="less">
    .van-nav-bar {
        background-color: #836afe;
        div {
            color: #fff!important;
        }
    }
</style>

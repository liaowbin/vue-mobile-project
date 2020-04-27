<template>
    <div class="home">
        <div class="banner">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item  in bannerList" :key="item.id">
                    <img v-lazy="item.img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="(item, index) in menuList" :key="index">
                <van-image :src="item.imgSrc" />
                <span>{{ item.text }}</span>
            </van-grid-item>
        </van-grid>
    </div>
</template>
<script>
export default {
    data() {
        return {
            bannerList: [],
            menuList: [
                {
                    imgSrc: require('@/assets/images/icon01.png'),
                    text: "定期理财"
                },
                {
                    imgSrc: require('@/assets/images/icon02.png'),
                    text: "充值管理"
                },
                {
                    imgSrc: require('@/assets/images/icon03.png'),
                    text: "提现管理"
                },
                {
                    imgSrc: require('@/assets/images/icon04.png'),
                    text: "邀请好友"
                }
            ]
        }
    },
    created() {
        this.$http.get('getBanner').then(response => {
            if (response.body.status) {
                this.bannerList = response.body.data;
            }
        }, response => {
            this.$toast("获取轮播图失败！");
        });
    },
}
</script>
<style lang="less">
    .home {
        .banner {
            box-sizing: border-box;
            width: 100%;
            height: 150px;
            padding: 10px 10px 0;
            .van-swipe {
                height: 100%;
            }
            img {
                width: 100%;
                height: 100%;
                border-radius: 15px;
            }
        }
        .van-grid {
            font-size: 14px;
            .van-grid-item__content {
                background-color: transparent !important;
            }
            .van-image {
                width: 40px;
                height: 40px;
            }
        }
    }
</style>

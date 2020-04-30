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
            <router-link tag="van-grid-item" :to="item.url" v-for="(item, index) in menuList" :key="index">
                <van-image :src="item.imgSrc" />
                <span>{{ item.text }}</span>
            </router-link>
        </van-grid>
        <div class="notice">
            <van-notice-bar color="#666" background="#f7f7f7" :left-icon="require('@/assets/images/notice.png')" :text="notice"></van-notice-bar>
        </div>
        <div class="link">
            <router-link to="/home/artice?id=1">平台介绍</router-link>
            <router-link to="/home/artice?id=5">合作代理</router-link>
            <router-link to="/home/artice?id=6">规则说明</router-link>
            <router-link to="/home/artice?id=8">常见问题</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            bannerList: [],
            menuList: [
                {
                    url: "/topup/financialmanage",
                    imgSrc: require('@/assets/images/icon01.png'),
                    text: "定期理财"
                },
                {
                    url: "/topup",
                    imgSrc: require('@/assets/images/icon02.png'),
                    text: "充值管理"
                },
                {
                    url: "/topup/withdrawalmanage",
                    imgSrc: require('@/assets/images/icon03.png'),
                    text: "提现管理"
                },
                {
                    url: "/mine/invitefriends",
                    imgSrc: require('@/assets/images/icon04.png'),
                    text: "邀请好友"
                }
            ],
            notice: ""
        }
    },
    created() {
        this.getBanner();
        this.getNotice();
    },
    methods: {
        getBanner() {
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });
            this.$http.get('Wap/Api/getBanner').then(response => {
                if (response.body.status) {
                    this.bannerList = response.body.data;
                    this.$toast.clear();
                }
            }, response => {
                this.$toast("获取轮播图失败！");
                this.$toast.clear();
            });
        },
        getNotice() {
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });
            this.$http.get('Wap/Api/getSystemNotice?id=9').then(response => {
                if (response.body.status) {
                    this.notice = response.body.data.content;
                    this.$toast.clear();
                }
            }, response => {
                this.$toast("获取失败！");
                this.$toast.clear();
            });
        }
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
        .notice {
            padding-bottom: 10px;
            .van-icon__image {
                width: auto;
                margin-right: 5px;
            }
        }
        .link {
            display: flex;
            justify-content: space-between;
            padding: 0 30px;
            a {
                font-size: 14px;
                color: #666;
            }
        }
    }
</style>

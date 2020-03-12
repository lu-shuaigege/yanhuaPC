<template>
    <div class="home">
        <!-- 导航 -->
        <navtop></navtop>
        <!-- 轮播 -->
        <div class="banner">
            <el-carousel
                indicator-position="none"
                arrow="always"
                :autoplay="true"
                type="card"
                height="400px"
            >
                <el-carousel-item v-for="(item,index) in banners" :key="index" v-show="index<5">
                    <a :href="item.photo_link_url"><img :src="item.photourl" /></a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 页面主题内容 -->
        <div class="content">
            <!-- 左边内容 -->
            <div class="content_left">
                <div class="content_left_list" v-for="(item,index) in typeList" :key="index" v-show="item.value.length">
                    <div class="content_left_list_top">
                        <div class="content_left_list_top_title">{{item.name}}</div>
                        <div class="more" @click="more(item.id)">更多</div>
                    </div>
                    <div class="content_left_list_bottom">
                        <div
                            class="content_left_list_bottom_item"
                            v-for="(item1,indexs) in item.value"
                            v-show="indexs<3"
                            :key="indexs"
                            @click="gotodetail(item1.id)"
                        >
                            <div class="notice" v-if="item1.status==1">预告</div>
                            <div class="live" v-if="item1.status==2">直播</div>
                            <div class="playback" v-if="item1.status==3">回放</div>
                            <div class="content_left_list_bottom_item_topimg">
                                <img :src="item1.image" />
                            </div>
                            <div class="content_left_list_bottom_item_bottom">
                                <div class="title">{{item1.title}}</div>
                                <div class="time">{{item1.date}}</div>
                                <div class="content_left_list_bottom_item_bottom_down">
                                    <div class="content_anchor">播主：{{item1.from}}</div>
                                    <div class="content_anchor_button" v-if="item1.status==1">立即预约</div>
                                    <div class="content_anchor_button" v-if="item1.status==2">进入直播</div>
                                    <div class="content_anchor_button" v-if="item1.VForm_Download_Flag=='ON'">下载资料</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右边内容 -->
            <div class="content_right">
                <!-- 右边内容 -->
                <div class="broadcast">
                    <el-carousel height="422px" arrow="never">
                        <el-carousel-item v-for="(item,index) in broadcast" :key="index" v-show="index<3">
                            <a :href="item.photo_link_url"><img class="broadcast_img" :src="item.photourl" /></a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="recommendList">
                    <div class="recommendList_title">专题推荐</div>
                    <div
                        class="list"
                        v-for="(item,index) in recommendList"
                        :key="index"
                        v-show="index<7"
                        @click="goto(item.id)"
                    >
                        <div class="title">{{item.title}}</div>
                        <div class="anchor">播主：{{item.from}}</div>
                    </div>
                </div>
            </div>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
// @ is an alias to /src
import navtop from "@/components/nav/navtop.vue";
import bottom from "@/components/bottom/bottom.vue";
export default {
    data() {
        return {
            id: "1",
            banners: [], //轮播
            broadcast: [], //广告位
            typeList: [], //分类
            recommendList: [] //专题推荐列表
        };
    },
    components: {
        navtop,
        bottom
    },
    created() {
        // this.histories();
        this.getBanners();
        this.getBroadcast();
        this.getTypeList();
        this.getRecommendList();
    },
    mounted() {
        document.documentElement.scrollTop = 0;
    },
    methods: {
        more(id) {
            this.$router.push({
                name: "list",
                query: {
                    id: id
                }
            });
        },
        gotodetail(id) {
            this.$router.push({
                name: "detail",
                query: {
                    id: id
                }
            });
        },
        goto(id) {
            this.$router.push({
                name: "detail",
                query: {
                    id: id
                }
            });
        },
        //axios请求
        histories() {
            this.$api.get(
                "/api/customizers/configs",
                {
                    page: 1
                },
                res => {
                    console.log(res.data);
                }
            );
        },
        //首页轮播图
        getBanners() {
            this.$api.get("/video/website/GetBanner", {}, res => {
                console.log(res)
                if (res.data.code == 0) {
                    this.banners = res.data.data;
                }
            });
        },
        //首页广告位轮播图
        getBroadcast() {
            this.$api.get("/video/website/GetADV", {}, res => {
                if (res.data.code == 0) {
                    this.broadcast = res.data.data.images;
                }
            });
        },
        //首页分类
        getTypeList() {
            this.$api.get("/video/website/GetContent", {}, res => {
                if (res.data.code == 0) {
                    this.typeList = res.data.data;
                }
            });
        },
        //首页专题推荐列表
        getRecommendList() {
            this.$api.get("/video/website/GetRecommend", {}, res => {
                if (res.data.code == 0) {
                    console.log(res.data.data)
                    this.recommendList = res.data.data[0].value;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./home.scss";
</style>

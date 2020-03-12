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
                <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <a :href="item.photo_link_url"><img :src="item.photourl" /></a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 页面主题内容 -->
        <div class="content">
            <!-- 左边内容 -->
            <div class="content_left">
                <div class="content_left_list">
                    <div class="content_left_list_top">
                        <div class="content_left_list_top_title">
                            <div class="gotohome" @click="gotohome()">首页></div>
                            <div class="over">{{list.name}}</div>
                        </div>
                    </div>
                    <div class="content_left_list_bottom">
                        <div
                            class="content_left_list_bottom_item"
                            v-for="(item,index) in list.data"
                            :key="index"
                            @click="gotodetail(item.id)"
                        >
                            <div class="notice" v-if="item.status==1">预告</div>
                            <div class="live" v-if="item.status==2">直播</div>
                            <div class="playback" v-if="item.status==3">回放</div>
                            <div class="content_left_list_bottom_item_topimg">
                                <img :src="item.image" />
                            </div>
                            <div class="content_left_list_bottom_item_bottom">
                                <div class="title">{{item.title}}</div>
                                <div class="time">{{item.date}}</div>
                                <div class="content_left_list_bottom_item_bottom_down">
                                    <div class="content_anchor">播主：{{item.from}}</div>
                                    <div class="content_anchor_button" v-if="item.status==1">立即预约</div>
                                    <div class="content_anchor_button" v-if="item.status==2">进入直播</div>
                                    <div class="content_anchor_button" v-if="item.VForm_Download_Flag=='ON'">下载资料</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <pagination :total="total" :current-page="current" @pagechange="pagechange"></pagination>
            </div>
            <!-- 右边内容 -->
            <div class="content_right">
                <!-- 右边内容 -->
                <div class="recommendList">
                    <div class="recommendList_title">专题推荐</div>
                    <div
                        class="list"
                        v-for="(item,index) in recommendList"
                        :key="index"
                        @click="goto(item.id)"
                        v-show="index<7"
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
import pagination from "../../components/pagination/pagination.vue";
export default {
    data() {
        return {
            id: "1",
            banners: [], //轮播
            list: [],

            recommendList: [
                {
                    id: 5,
                    title: "解构工业物联网数字转型",
                    from: "研华工业物联网-工业自动化"
                },
                {
                    id: 5,
                    title: "构建云+端感知平台，实现实现实现",
                    from: "研华工业物联网"
                },
                {
                    id: 5,
                    title: "构建云+端感知平台，实现实现实现",
                    from: "研华工业物联网"
                },
                {
                    id: 5,
                    title: "构建云+端感知平台，实现实现实现",
                    from: "研华工业物联网"
                },
                {
                    id: 5,
                    title: "构建云+端感知平台，实现实现实现",
                    from: "研华工业物联网"
                }
            ], //专题推荐列表
            total: 0, // 记录总条数
            display: 9, // 每页显示条数
            current: 1, // 当前的页数
            category: 1, //一级分类
            page: 1 //页码
        };
    },
    components: {
        navtop,
        bottom,
        pagination
    },
    created() {
        this.id = this.$route.query.id; //列表id
        console.log(this.id);
        this.getBanners();
        this.getRecommendList();
        this.getList();
    },
    mounted() {
        document.documentElement.scrollTop = 0;
    },
    methods: {
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
        gotohome() {
            this.$router.push({
                name: "home"
            });
        },
        //分页组件向后台发送请求
        pagechange: function(currentPage) {
            console.log(currentPage);
            this.page = currentPage;
            document.documentElement.scrollTop = 0;

            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
            this.getList();
        },
        //轮播图
        getBanners() {
            this.$api.get("/video/website/GetBanner", {}, res => {
                console.log(res)
                if (res.data.code == 0) {
                    this.banners = res.data.data;
                }
            });
        },
        //分类下产品列表
        getList() {
            this.$api.get("/video/website/getcontentlist?id=" +this.id, {page: this.page,per_page: 9}, res => {
                //此处假数据
                if (res.data.code == 0) {
                    this.list = res.data.data;
                    this.total = this.list.total
                }
            });
        },
        //专题推荐列表
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
@import "./list.scss";
</style>

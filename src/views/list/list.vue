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
                    <img :src="item" />
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
                            <div class="over">智能制造/智能装备</div>
                        </div>
                    </div>
                    <div class="content_left_list_bottom">
                        <div
                            class="content_left_list_bottom_item"
                            v-for="(item,index) in list"
                            :key="index"
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
                                    <div
                                        class="content_anchor_button"
                                        v-if="item.status==1"
                                        @click="gotodetail(item.id)"
                                    >立即预约</div>
                                    <div
                                        class="content_anchor_button"
                                        v-if="item.status==2"
                                        @click="gotodetail(item.id)"
                                    >进入直播</div>
                                    <div
                                        class="content_anchor_button"
                                        v-if="item.status==3"
                                        @click="gotodetail(item.id)"
                                    >下载资料</div>
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
            banners: [
                require("@/assets/img/banner1.png"),
                require("@/assets/img/banner2.png"),
                require("@/assets/img/banner1.png")
            ], //轮播
            list: [
                {
                    id: 1,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 1,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 2,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网研华工业物联网研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 3,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                },
                {
                    id: 1,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 1,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 2,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网研华工业物联网研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 3,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                },
                {
                    id: 1,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 1,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 2,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网研华工业物联网研华工业物联网"
                },
                {
                    id: 2,
                    image: require("@/assets/img/picture.png"),
                    title:
                        "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                    status: 3,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网"
                }
            ],
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
            total: 1000, // 记录总条数
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
        // this.getBanners();
        // this.getRecommendList();
        // this.getList();
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
        goto() {
            window.open("https://www.baidu.com/");
        },
        gotohome() {
            this.$router.push({
                name: "home"
            });
        },
        //分页组件向后台发送请求
        pagechange: function(currentPage) {
            this.page = currentPage;
            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
            this.getList();
        },
        //轮播图
        getBanners() {
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据
                res = {
                    code: 0,
                    msg: "操作成功",
                    data: {
                        images: [
                            require("@/assets/img/banner1.png"),
                            require("@/assets/img/banner2.png"),
                            require("@/assets/img/banner1.png")
                        ]
                    }
                };
                if (res.code == 0) {
                    this.banners = res.data.images;
                }
            });
        },
        //分类下产品列表
        getList() {
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据
                res = {
                    code: 0,
                    msg: "操作成功",
                    data: [
                        {
                            id: 1,
                            image: require("@/assets/img/picture.png"),
                            title:
                                "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                            status: 1,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        },
                        {
                            id: 2,
                            image: require("@/assets/img/picture.png"),
                            title:
                                "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                            status: 2,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网研华工业物联网研华工业物联网"
                        },
                        {
                            id: 2,
                            image: require("@/assets/img/picture.png"),
                            title:
                                "构建云+端感知平台，实现设备远程管理实现设备远程管理",
                            status: 3,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        }
                    ]
                };
                if (res.code == 0) {
                    this.list = res.data;
                }
            });
        },
        //专题推荐列表
        getRecommendList() {
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据
                res = {
                    code: 0,
                    msg: "操作成功",
                    data: [
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
                    ]
                };
                if (res.code == 0) {
                    this.recommendList = res.data;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./list.scss";
</style>

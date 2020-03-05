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
                <div class="content_left_list" v-for="(item,index) in typeList" :key="index">
                    <div class="content_left_list_top">
                        <div class="content_left_list_top_title">{{item.name}}</div>
                        <div class="more" @click="more(item.id)">更多</div>
                    </div>
                    <div class="content_left_list_bottom">
                        <div
                            class="content_left_list_bottom_item"
                            v-for="(item,indexs) in item.value"
                            :key="indexs"
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
                                    <div class="content_anchor_button" v-if="item.status==3">下载资料</div>
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
                        <el-carousel-item v-for="(item,index) in broadcast" :key="index">
                            <img class="broadcast_img" :src="item" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
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
export default {
    data() {
        return {
            id: "1",
            banners: [
                require("@/assets/img/banner1.png"),
                require("@/assets/img/banner2.png"),
                require("@/assets/img/banner1.png")
            ], //轮播
            broadcast: [
                require("@/assets/img/AD.png"),
                require("@/assets/img/AD.png")
            ], //广告位
            typeList: [
                {
                    id: 1,
                    name: "智能制造/智能装备",
                    value: [
                        {
                            id: 1,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 1,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        },
                        {
                            id: 2,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 2,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        },
                        {
                            id: 2,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 2,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "WISE-PaaS工业物联网云平台",
                    value: [
                        {
                            id: 3,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 3,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        },
                        {
                            id: 4,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 2,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        }
                    ]
                },
                {
                    id: 1,
                    name: "WISE-PaaS工业物联网云平台",
                    value: [
                        {
                            id: 5,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 1,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        },
                        {
                            id: 6,
                            image: require("@/assets/img/picture.png"),
                            title: "构建云+端感知平台，实现实现实现",
                            status: 2,
                            date: "2020-02-20  14:00",
                            from: "研华工业物联网"
                        }
                    ]
                }
            ], //分类
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
            ] //专题推荐列表
        };
    },
    components: {
        navtop,
        bottom
    },
    created() {
        // this.histories();
        // this.getBanners();
        // this.getBroadcast();
        // this.getTypeList();
        // this.getRecommendList();
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
        goto() {
            window.open("https://www.baidu.com/");
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
        //首页广告位轮播图
        getBroadcast() {
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据
                res = {
                    code: 0,
                    msg: "操作成功",
                    data: {
                        imagesPC: [
                            require("@/assets/img/AD.png"),
                            require("@/assets/img/AD.png")
                        ],
                        imagesYD: [
                            require("@/assets/img/AD.png"),
                            require("@/assets/img/AD.png")
                        ]
                    }
                };
                if (res.code == 0) {
                    this.broadcast = res.data.imagesYD;
                }
            });
        },
        //首页分类
        getTypeList() {
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据 status: 1为预告，2为直播，3为回放
                res = {
                    code: 0,
                    msg: "操作成功",
                    data: [
                        {
                            id: 1,
                            name: "智能制造/智能装备",
                            value: [
                                {
                                    id: 1,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 1,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                },
                                {
                                    id: 2,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 2,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                },
                                {
                                    id: 2,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 2,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: "WISE-PaaS工业物联网云平台",
                            value: [
                                {
                                    id: 3,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 3,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                },
                                {
                                    id: 4,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 2,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                }
                            ]
                        },
                        {
                            id: 1,
                            name: "WISE-PaaS工业物联网云平台",
                            value: [
                                {
                                    id: 5,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 1,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                },
                                {
                                    id: 6,
                                    image: require("@/assets/img/picture.png"),
                                    title: "构建云+端感知平台，实现实现实现",
                                    status: 2,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网"
                                }
                            ]
                        }
                    ]
                };

                if (res.code == 0) {
                    this.typeList = res.data;
                }
            });
        },
        //首页专题推荐列表
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
@import "./home.scss";
</style>

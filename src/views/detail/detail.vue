<template>
    <div class="detail">
        <!-- 导航 -->
        <navtop></navtop>
        <div class="detail_content">
            <div class="top">
                <div class="gohome">首页></div>
                <div class="golist">智能制造/智能装备></div>
                <div class="over">直播详情</div>
            </div>
            <div class="con">
                <div class="con_top">
                    <div class="left">
                        <div class="left_top">{{details.value.title}}</div>
                        <div class="left_bottom">
                            <div class="title">播主：{{details.value.from}}</div>
                            <div class="time">{{details.value.date}}</div>
                        </div>
                    </div>
                    <div class="right" v-if="details.type==1">进入直播</div>
                    <div class="right" v-if="details.type==2">下载资料</div>
                    <div class="right" v-if="details.type==3">预约报名</div>
                </div>
                <div class="video">
                    <img class="videoImg" :src="details.value.image" />
                    <img class="broadcast" src="../../assets/img/broadcast.png" />
                    <div class="hui"></div>
                </div>
                <div class="word_title">直播详情介绍</div>
                <div class="word">{{details.value.content}}</div>
            </div>
        </div>
        <div class="popup">
            <div class="popup_con">
                <div class="title" v-if="details.type==3">预约报名</div>
                <div class="title" v-if="details.type==2">下载资料</div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">姓名:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">公司:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">电话:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">E-mail:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">职称:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <!-- <div class="star">*</div> -->
                        <div class="text">所在城市:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <!-- <div class="star">*</div> -->
                        <div class="text">详细地址:</div>
                    </div>
                    <input type="text" class="item_right" />
                </div>
                <div class="btn">
                    <div class="btn_left">取消</div>
                    <div class="btn_right">确认</div>
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
            details: {
                id: 1,
                type: 1,
                name: "智能制造/智能装备",
                value: {
                    id: 1,
                    image: require("@/assets/img/picture.png"),
                    title: "构建云+端感知平台，实现设备远程管理",
                    status: 1,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网",
                    content:
                        "能够使用计算机控制手机。可以操纵鼠标，让左/中/右单击，拖动和下降等等"
                }
            }
        };
    },
    components: {
        navtop,
        bottom
    },
    created() {
        this.id = this.$route.query.id; //详情id，根据id获取详情
        console.log(this.id);
        // this.getDetail(this.id);
    },
    methods: {
        //详情数据
        getDetail(id) {
            console.log(id);
            this.$api.get("/api/travels/" + this.id, {}, res => {
                //此处假数据
                res = {
                    code: 0,
                    msg: "操作成功",
                    data:
                        // {
                        //     "id":1,
                        //     "type":1,
                        //     "name": "智能制造/智能装备",
                        //     "image": require("@/assets/img/picture.png"),
                        //     "title": "构建云+端感知平台，实现设备远程管理",
                        //     "status":2,
                        //     "date":"2020-02-20  14:00",
                        //     "from":"研华工业物联网",
                        //     "content":"能够使用计算机控制手机。可以操纵鼠标，让左/中/右单击，拖动和下降等等"
                        // },
                        {
                            id: 1,
                            type: 1,
                            name: "智能制造/智能装备",
                            value: [
                                {
                                    id: 1,
                                    image: require("@/assets/img/picture.png"),
                                    title:
                                        "构建云+端感知平台，实现设备远程管理",
                                    status: 1,
                                    date: "2020-02-20  14:00",
                                    from: "研华工业物联网",
                                    content:
                                        "能够使用计算机控制手机。可以操纵鼠标，让左/中/右单击，拖动和下降等等"
                                }
                            ]
                        }
                };
                if (res.code == 0) {
                    this.details = res.data;
                }
            });
        },

        //去播放
        toPlay(status) {
            if (status == 1) {
                this.$toast("直播时间未到，请耐心等待哦！");
            } else {
                window.open("https://www.baidu.com/");
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./detail.scss";
</style>

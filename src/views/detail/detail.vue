<template>
    <div class="detail">
        <!-- 导航 -->
        <navtop></navtop>
        <div class="detail_content">
            <div class="top">
                <div class="gohome" @click="gotohome(1)">首页></div>
                <div class="golist" @click="gotohome(2,details.id)">智能制造/智能装备></div>
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
                    <div class="right" v-if="details.type==1" @click="gofrom(1)">进入直播</div>
                    <div class="right" v-if="details.type==2" @click="gofrom(2)">下载资料</div>
                    <div class="right" v-if="details.type==3" @click="gofrom(3)">预约报名</div>
                </div>
                <div class="video">
                    <img class="videoImg" :src="details.value.image" />
                    <img
                        class="broadcast"
                        @click="lookimg(details.type)"
                        src="../../assets/img/broadcast.png"
                    />
                    <div class="hui"></div>
                </div>
                <div class="word_title">直播详情介绍</div>
                <div class="word">{{details.value.content}}</div>
            </div>
        </div>
        <div class="popup" v-if="ispopup==2||ispopup==3">
            <div class="popup_con">
                <div class="title" v-if="details.type==3">预约报名</div>
                <div class="title" v-if="details.type==2">下载资料</div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">姓名:</div>
                    </div>
                    <input type="text" class="item_right" v-model="name" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">公司:</div>
                    </div>
                    <input type="text" class="item_right" v-model="company" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">电话:</div>
                    </div>
                    <input type="text" class="item_right" v-model="tel" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">E-mail:</div>
                    </div>
                    <input type="text" class="item_right" v-model="e_mail" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="star">*</div>
                        <div class="text">职称:</div>
                    </div>
                    <input type="text" class="item_right" v-model="title" />
                </div>
                <div class="item">
                    <div class="item_left">
                        <!-- <div class="star">*</div> -->
                        <div class="text">所在城市:</div>
                    </div>
                    <!-- <input type="text" class="item_right" /> -->
                    <div class="item_right_sel">
                        <section class="container">
                            <el-row>
                                <el-select
                                    v-model="provinceValue"
                                    placeholder="请选择省"
                                    @change="selectProvimce"
                                >
                                    <el-option
                                        v-for="(item,index) of provincearr"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <el-select
                                    v-model="cityValue"
                                    placeholder="请选择市"
                                    @change="selectcity"
                                >
                                    <el-option
                                        v-for="(item,index) of cityarr"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                                <!-- <el-select placeholder="请选择" v-model="RegionValue">
                            <el-option
                                v-for="(item,index) of regionarr"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                                </el-select>-->
                            </el-row>
                        </section>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <!-- <div class="star">*</div> -->
                        <div class="text">详细地址:</div>
                    </div>
                    <input type="text" class="item_right" v-model="detailed_address" />
                </div>
                <div class="btn">
                    <div class="btn_left" @click="from(0)">取消</div>
                    <div class="btn_right" @click="from(1)">确认</div>
                </div>
            </div>
        </div>
        <div class="toast" v-if="look==3">直播时间未到，请耐心等待哦！</div>
        <bottom></bottom>
    </div>
</template>

<script>
// @ is an alias to /src
import navtop from "@/components/nav/navtop.vue";
import bottom from "@/components/bottom/bottom.vue";
import { province } from "../../js/map";
export default {
    data() {
        return {
            id: "1",
            details: {
                id: 1,
                type: 3,
                name: "智能制造/智能装备",
                value: {
                    id: 1,
                    image: require("@/assets/img/banner1.png"),
                    title: "构建云+端感知平台，实现设备远程管理",
                    status: 1,
                    date: "2020-02-20  14:00",
                    from: "研华工业物联网",
                    content:
                        "能够使用计算机控制手机。可以操纵鼠标，让左/中/右单击，拖动和下降等等"
                }
            },
            ispopup: 0,
            look: 0,
            //城市联动
            arr: [1, 3, 4],
            province: [],
            cityarr: [],
            regionarr: [],
            provinceValue: "",
            cityValue: "",
            RegionValue: "",

            name: "",
            company: "",
            tel: "",
            e_mail: "",
            title: "",
            province_name: "",
            city_name: "",
            detailed_address: ""
        };
    },
    components: {
        navtop,
        bottom
    },
    created() {
        this.provincearr = province;
        this.id = this.$route.query.id; //详情id，根据id获取详情
        console.log(this.id);
        // this.getDetail(this.id);
    },
    mounted() {
        document.documentElement.scrollTop = 0;
    },
    methods: {
        selectProvimce(id) {
            this.cityarr = [];
            this.regionarr = [];
            this.cityValue = "";
            this.RegionValue = "";
            for (let item of this.provincearr) {
                if (id == item.id) {
                    console.log(item);
                    this.province_name = item.name;
                    console.log(this.province_name);
                    this.cityarr = item.children;
                }
            }
        },
        selectcity(id) {
            this.regionarr = [];
            this.RegionValue = "";
            for (let item of this.cityarr) {
                if (id == item.id) {
                    console.log(item);
                    this.city_name = item.name;
                    console.log(this.city_name);
                    this.regionarr = item.children;
                }
            }
        },
        gotohome(ishome, id) {
            if (ishome == 1) {
                this.$router.push({
                    name: "home"
                });
            }
            if (ishome == 2) {
                this.$router.push({
                    name: "list",
                    query: {
                        id: id
                    }
                });
            }
        },
        gofrom(type) {
            if (type == 2) {
                this.ispopup = 2;
            }
            if (type == 3) {
                this.ispopup = 2;
            }
        },
        lookimg(look) {
            if (look == 3) {
                this.look = 3;
            }
            setTimeout(() => {
                this.look = 0;
            }, 2000);
        },
        from(isfrom) {
            if (isfrom == 0) {
                this.ispopup = 0;
            }
            if (isfrom == 1) {
                if (!this.name) {
                    this.$toast("请填写姓名");
                    return;
                }
                if (!this.company) {
                    this.$toast("请填写公司");
                    return;
                }
                if (!this.title) {
                    this.$toast("请填写职称");
                    return;
                }
                let regphone = /^((0\d{2,3}-?\d{7,8})|(1[3456789]\d{9}))$/;
                if (!regphone.test(this.tel)) {
                    this.$toast("电话格式不正确");
                    return;
                }
                if (!this.e_mail) {
                    this.$toast("请填写电子邮箱");
                    return;
                }
                let checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!checkEmail.test(this.e_mail)) {
                    this.$toast("电子邮箱格式不正确");
                    return;
                }
                this.ispopup = 0;
            }
        },

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

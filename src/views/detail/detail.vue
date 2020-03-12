<template>
    <div class="detail">
        <!-- 导航 -->
        <navtop></navtop>
        <div class="detail_content" >
            <div class="top">
                <div class="gohome" @click="gotohome(1)">首页></div>
                <div class="golist" @click="gotohome(2,details.type)">{{details.name}}></div>
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
                    <div class="right" v-if="details.value.status==2" @click="gofrom(2,details.value.VWebinar_ID)">进入直播</div>
                    <div class="right" v-if="details.VForm_Download_Flag=='ON'" @click="gofrom(3,details.value.VWebinar_ID,details.VForm_Flag,details.value.id)">下载资料</div>
                    <div class="right" v-if="details.value.status==1" @click="gofrom(1,details.value.VWebinar_ID)">预约报名</div>
                </div>
                <div class="video">
                    <img class="videoImg" :src="details.value.image" />
                    <img
                        class="broadcast"
                        @click="lookimg(details.value.VWebinar_ID)"
                        src="../../assets/img/broadcast.png"
                    />
                    <div class="hui"></div>
                </div>
                <div class="word_title">直播详情介绍</div>
                <div class="word" v-html="details.value.content"></div>
            </div>
        </div>
        <div class="popup" v-if="ispopup==2||ispopup==3">
            <div class="popup_con">
                <!-- <div class="title" v-if="details.value.status==1">预约报名</div> -->
                <div class="title">下载资料</div>
                <div class="contain">
                    <div v-for="(item,index) in FormList" :key="index">
                        <div class="item" v-if="item.FieldType == 1">
                            <div class="item_left">
                                <div class="star" v-if="item.CheckField">*</div>
                                <div class="text">{{item.FieldTitle}}:</div>
                            </div>
                            <input type="text" class="item_right" v-model="item.FValue" />
                        </div>
                        <div class="item" v-if="item.FieldType == 2"> 
                            <div class="item_left">
                                <div class="star" v-if="item.CheckField">*</div>
                                <div class="text">性别</div>
                            </div>
                            <div class="item_right_sel1">
                                <el-radio v-model="item.FValue" v-for="(item1,index1) in item.FieldDefValArr" :key="index1" :label="item1">{{item1}}</el-radio>
                            </div>
                            
                        </div>
                        <div class="item" v-if="item.FieldType == 10">
                            <div class="item_left">
                                <div class="star" v-if="item.CheckField">*</div>
                                <div class="text">所在城市:</div>
                            </div>
                            <!-- <input type="text" class="item_right" /> -->
                            <div class="item_right_sel">
                                <section class="containe">
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
                                            v-model="item.FValue"
                                            placeholder="请选择市"
                                            @change="selectcity"
                                        >
                                            <el-option
                                                v-for="(item,index) of cityarr"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-row>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="btn_left" @click="from(0)">取消</div>
                        <div class="btn_right" @click="from(1)">确认</div>
                    </div>
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
                name: "",
                value: {
                    id: 1,
                    image: '',
                    title: "",
                    status: 1,
                    date: "",
                    from: "",
                    content:""
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
            detailed_address: "",

            FormList:""
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
        this.getDetail(this.id);
        this.getForm()
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
        gotohome(ishome, type) {
            if (ishome == 1) {
                this.$router.push({
                    name: "home"
                });
            }
            if (ishome == 2) {
                this.$router.push({
                    name: "list",
                    query: {
                        id: type
                    }
                });
            }
        },
        gofrom(type,VWebinar_ID,VForm_Flag,id) {
            if (type == 3) {
                if(VForm_Flag == 'ON'){
                    this.ispopup = 2;
                }else{
                    // window.open("http://wechattest.advantech.com.cn/video/website/Vjump?id="+id);
                    // xadmin.open('','http://wechattest.advantech.com.cn/video/website/Vjump?id='+id,'','',true)
                    location.href ="http://wechattest.advantech.com.cn/video/website/Vjump?id="+id;

                }
                
            }else{
                // xadmin.open('','http://wechattest.advantech.com.cn/video/website/Vjump?id='+id,'','',true)
                xadmin.open('','https://live.vhall.com/'+VWebinar_ID,'','',true)

            }
        },
        lookimg(look) {
            xadmin.open('','https://live.vhall.com/'+look,'','',true)
            // window.open("https://live.vhall.com/"+look);
            
        },
        from(isfrom) {
            if (isfrom == 0) {
                this.ispopup = 0;
                for (let i = 0; i < this.FormList.length; i++){
                    delete(this.FormList[i].FValue)
                    this.provinceValue = ''
                }
                console.log(this.FormList)
            }
            if (isfrom == 1) {
                console.log(this.FormList)

                for (let i = 0; i < this.FormList.length; i++) { 
                    if(this.FormList[i].CheckField&&!this.FormList[i].FValue){
                        this.$toast("请输入"+this.FormList[i].FieldTitle);
                        return
                    }
                    if(this.FormList[i].FieldTitle == "手机"&&!/^1[3456789]\d{9}$/.test(this.FormList[i].FValue)){
                        this.$toast("手机号格式不正确");
                        return
                    }
                    if(this.FormList[i].FieldTitle == "邮箱"&&!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.FormList[i].FValue)){
                        this.$toast("邮箱格式不正确");
                        return
                    }
                }
                console.log(this.FormList)
                this.$api.post("/video/website/FormRegister", {vid: this.id, Info: this.FormList}, res => {
                    console.log(res)
                    if (res.data.Message == "操作成功") {
                        this.$toast("提交成功");
                        location.href ="http://wechattest.advantech.com.cn/video/website/Vjump?id="+this.id;
                        // xadmin.open('','http://wechattest.advantech.com.cn/video/website/Vjump?id='+this.id,'','',true)
                        this.ispopup = 0;
                        for (let i = 0; i < this.FormList.length; i++){
                            // this.FormList[i].FValue = ''
                            delete(this.FormList[i].FValue)
                            this.provinceValue = ''
                        }
                    }
                });

            }
        },

        //详情数据
        getDetail(id) {
            console.log(id)
            this.$api.get("/video/website/getcontentdetail?id=" + this.id, {}, res => {
                
                if (res.data.code == 0) {
                    this.details = res.data.data;
                }
            });
        },
        //获取表单数据
        getForm(){
            this.$api.get("/video/website/getform", {}, res => {
                if (res.data.code == 0) {
                    this.FormList = res.data.data;
                    console.log(this.FormList)
                }
            });
        },
    }
};
</script>
<style>
.el-radio__inner{
    width: 20px !important;
    height: 20px !important;
}
.el-radio__label{
    font-size: 18px !important;
}
</style>
<style lang="scss" scoped>
@import "./detail.scss";

</style>

<template>
    <!-- 导航 -->
    <div class="top">
        <div class="top_content">
            <img class="top_content_img" src="../../assets/img/logo.svg" @click="gotohome()" />
            <div class="top_content_right">
                <div class="top_content_right_top">研华官方直播平台</div>
                <div class="top_content_right_bottom">简要文字，介绍平台直播内容</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {
        gotohome() {
            this.$router.push({
                name: "home"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
// 导航
.top {
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 88;
    zoom: 1;

    .top_content {
        width: 1200px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0px auto;

        .top_content_img {
            width: 401px;
            height: 36px;
        }

        .top_content_right {
            text-align: right;

            .top_content_right_top {
                // height: 24px;
                font-family: MicrosoftYaHei;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #222222;
            }

            .top_content_right_bottom {
                // height: 13px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 14px;
                letter-spacing: 0px;
                color: #666666;
                margin-top: 11px;
            }
        }
    }
}
</style>

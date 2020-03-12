<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
* {
    margin: 0px;
    padding: 0px;
}
.el-carousel__button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
.el-carousel__mask {
    opacity: 0;
}
.el-input--suffix {
    width: 100% !important;
    height: 48px !important;

    .el-input__inner {
        width: 100%;
        height: 100%;
    }
}
.el-carousel__arrow {
    background-color: rgba(31, 45, 61, 0);
    &:hover {
        background-color: rgba(31, 45, 61, 0);
    }
    .el-icon-arrow-right {
        width: 21px;
        height: 36px;
    }
}
.el-carousel__arrow--left {
    left: 750px;
}
.el-carousel__arrow--right {
    right: 750px;
}
.el-icon-arrow-left::before {
    width: 21px;
    height: 36px;
    font-size: 36px;
}
.el-icon-arrow-right::before {
    width: 21px;
    height: 36px;
    font-size: 36px;
}
// .el-carousel__item--card {
//     width: 70%;
// }
#layui-layer1 > span.layui-layer-setwin > a.layui-layer-ico.layui-layer-close.layui-layer-close2{
    right: 0px;
 top: -10px;
}
</style>

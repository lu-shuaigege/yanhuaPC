<template>
    <nav class="nav">
        <ul class="pagination">
            <!-- <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(1)">首页</a>
            </li>-->
            <li :class="{'disabled': current == 1}">
                <a href="javascript:;" @click="setCurrent(current - 1)" class="tab top">上一页</a>
            </li>
            <li v-for="(p,index) in grouplist" :key="index" :class="{'active': current == p.val}">
                <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
            </li>
            <!-- <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(page)">尾页</a>
            </li>-->

            <li :class="{'disabled': current == page}">
                <a href="javascript:;" @click="setCurrent(current + 1)" class="tab down">下一页</a>
            </li>
        </ul>
    </nav>
</template>

<script type="es6">
export default {
    data() {
        return {
            current: this.currentPage
        };
    },
    props: {
        total: {
            // 数据总条数
            type: Number,
            default: 0
        },
        display: {
            // 每页显示条数
            type: Number,
            default: 10
        },
        currentPage: {
            // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: {
            // 分页条数
            type: Number,
            default: 5,
            coerce: function(v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
        page: function() {
            // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist: function() {
            // 获取分页页码
            var len = this.page,
                temp = [],
                list = [],
                count = Math.floor(this.pagegroup / 2),
                center = this.current;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push({ text: this.page - len, val: this.page - len });
                }
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            }
            var idx = temp.indexOf(center);
            idx < count && (center = center + count - idx);
            this.current > this.page - count && (center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                this.current > count + 1 &&
                    list.unshift({ text: "...", val: list[0].val - 1 });
                this.current < this.page - count &&
                    list.push({
                        text: "...",
                        val: list[list.length - 1].val + 1
                    });
            }
            return list;
        }
    },
    methods: {
        setCurrent: function(idx) {
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.$emit("pagechange", this.current);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.nav {
    text-align: right;
}
.pagination {
    overflow: hidden;
    display: table;
    margin: 50px 0px 0px;
    /*width: 100%;*/
    height: 30px;
    li {
        list-style: none;
        float: left;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        // color: #666;
        border: 1px solid #dddddd;
        border-radius: 3px;
        margin: 0 5px;
        a {
            display: block;
            width: 30px;
            height: 30px;
            text-align: center;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #999999;
            // border-radius: 5px;
            text-decoration: none;
        }
        & :hover {
            background-color: #004280;
            color: #fff;
        }
        & :hover a {
            color: #fff;
        }

        .top:hover {
            background: #fff;
        }
        .down:hover {
            // background: #fff;
        }
    }
    li:last-child {
        width: 70px;
        height: 30px;
        background-color: #004280;
        border-radius: 3px;
        a {
            width: 70px;
            height: 30px;
            border-radius: 3px;
            color: #fff;
        }
    }
    .active {
        width: 30px;
        height: 30px;
        background-color: #004280;
        border-radius: 3px;
        text-align: center;
        a {
            width: 30px;
            height: 30px;
            color: #fff;
        }
    }
    .disabled {
        width: 70px;
        height: 30px;
        border-radius: 3px;
        border: solid 1px #e5e5e5;
        a {
            width: 70px;
            height: 30px;
            border-radius: 3px;
            color: #999999;
        }
    }
}
// .tab {
//     margin: 0 14px;
// }
</style>
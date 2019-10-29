<template>
    <div class="home">
        <el-container>
            <el-aside class="aside">
                <el-menu
                    :default-active="active_index"
                    :router="true"
                    class="menu"
                    @select="indexSelect"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>首页</span>
                        </template>
                        <el-menu-item index="/home/goodsType">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">商品分类列表</span>
                        </el-menu-item>
                        <!-- <el-menu-item>
                            <i class="el-icon-open"></i>
                            <span slot="title">商品列表</span>
                        </el-menu-item>-->
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main class="main">
                <el-row class="top">
                    <i
                        class="el-icon-switch-button"
                        style="float:right;padding-right:20px;padding-top:8px;cursor:pointer;"
                    ></i>
                </el-row>
                <div style="padding:20px;">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Home"
})
export default class Home extends Vue {
    active_index: any = "";

    private indexSelect(index: string) {
        this.active_index = index;
        sessionStorage.setItem("active_index", index);
    }

    created() {
        this.active_index = sessionStorage.getItem("active_index");
    }
}
</script>

<style scoped lang="scss" >
.home {
    width: 100%;
    height: 100%;
    position: relative;
    .menu {
        display: inline-block;
        text-align: left;
        border: none;
        min-width: 200px;
    }
    .aside {
        width: 200px !important;
        height: 100%;
        background-color: white;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1001;
    }
    .main {
        margin-left: 200px;
        .top {
            height: 40px;
            background: white;
            /*  margin-left: 200px; */
        }
    }
    .el-main {
        padding: 0;
    }
}
</style>

<template>
    <div id="goodsType">
        <div class="village-box">
            <el-row>
                <el-col :span="22" :offset="1" class="head">
                    <div class="title">
                        <b>商品类型列表</b>
                    </div>
                    <div class="title-btn">
                        <el-button type="primary" mini class="addAreaBtn">添加商品类型</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-row
                type="flex"
                justify="start"
                style="margin-top:2%;overflow:hidden;margin-left:5%"
            >
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input
                            placeholder="请输入商品类型"
                            prefix-icon="el-icon-search"
                            v-model="goods_type"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

            <el-row style="margin-top:2%;margin-bottom:1%">
                <el-col :span="22" :offset="1">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="village_name" label="商品分类"></el-table-column>
                        <el-table-column prop="village_admin_id.user_name" label="创建时间"></el-table-column>
                        <el-table-column label="操作">
                            <template>
                                <el-button type="text">修改</el-button>
                                <el-button type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row class="page">
                <el-col>
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="page"
                        :pager-count="5"
                        :current-page="current"
                        layout="sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
    name: "GoodsType"
})
export default class GoodsType extends Vue {
    //每页显示条数
    page: number = 10;
    //当前页数
    current: number = 1;
    //总条数
    total: number = 10;
    tableData: any = [];
    goods_type: string = "";

    //每页显示条数变化回调
    handleSizeChange(val: number) {
        this.page = val;
    }
    //当前页改变回调
    handleCurrentChange(val: number) {
        this.current = val;
    }
    //添加商品类型
    toAddType() {}
    search() {}
    created() {}
}
</script>

<style lang="scss">
@import "./goodsType.scss";
</style>
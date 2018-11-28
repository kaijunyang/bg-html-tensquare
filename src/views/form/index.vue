<template>
  <div>
    <!-- 查询表单 -->
    <el-form :inline="true" :model="searchMap" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input v-model="searchMap.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker v-model="searchMap.starttime" type="date" placeholder="开始日期"></el-date-picker>
        <el-date-picker v-model="searchMap.endtime" type="date" placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleEdit('')">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" border stripe style="width: 100%" :default-sort="{prop: 'id'}">
      <el-table-column prop="id" label="活动ID" sortable width="100"></el-table-column>
      <el-table-column prop="name" label="活动名称" width="220"></el-table-column>
      <el-table-column prop="sponsor" label="主办方" width="180"></el-table-column>
      <el-table-column prop="address" label="活动地址" width="260"></el-table-column>
      <el-table-column prop="starttime" label="开始时间" sortable width="120"></el-table-column>
      <el-table-column prop="endtime" label="结束时间" sortable width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="pojo.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-input v-model="pojo.address" placeholder="活动地址"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="pojo.starttime" type="date" placeholder="开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="pojo.endtime" type="date" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止">
          <el-date-picker v-model="pojo.enrolltime" type="date" placeholder="报名截止"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input v-model="pojo.detail" placeholder="活动详情"></el-input>
        </el-form-item>

        <el-form-item label="城市">
          <el-select v-model="pojo.city" placeholder="请选择">
            <el-option v-for="city in cityList" :key="city.id" :label="city.name" :value="city.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否可见">
          <el-switch v-model="pojo.state" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
import gatheringApi from "@/api/gathering";
import cityApi from "@/api/city";

export default {
  data() {
    return {
      list: [],
      cityList: [],
      currentPage: 1,
      pageSize: 7,
      total: 0,
      searchMap: {},
      dialogFormVisible: false,
      pojo: {},
      value: false
    };
  },
  created() {
    this.fetchData();
    cityApi.getList().then(response => {
      this.cityList = response.data;
    });
  },
  methods: {
    // 分页获取活动
    fetchData() {
      gatheringApi
        .getPageList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    // 保存活动
    handleSave() {
      if (this.pojo.id != undefined) {
        // 编辑更新
        gatheringApi.edit(this.pojo.id).then(response => {
          this.$message({
            message: response.message,
            type: response.flag ? "success" : "error"
          });
        });
      } else {
        // 新增
        gatheringApi.save(this.pojo).then(response => {
          this.$message({
            message: response.message,
            type: response.flag ? "success" : "error"
          });
        });
      }
      this.dialogFormVisible = false;
    },
    // 编辑活动信息
    handleEdit(gatheringId) {
      // alert(id)
      if (gatheringId != "") {
        gatheringApi.getById(gatheringId).then(response => {
          this.pojo = response.data;
          response.data
            ? (this.dialogFormVisible = true)
            : (this.dialogFormVisible = false);
        });
      } else {
        this.pojo = {};
        this.dialogFormVisible = true;
      }
    },
    // 删除
    handleDelete(gatheringId) {}
  }
};
</script> 
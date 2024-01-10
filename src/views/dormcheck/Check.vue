<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "studentNumber":"",
        "dormitoryNumber":"",
        "dailyScore":0,
        "monthlyScore":0,
        "balcony":false,
        "rubbish":false,
        "desk":false,
        "floor":false,
        "quilt":false,
        "dailyPenaltyImageUrl":"",
        "status":""
    }
])
const category = ref({
        "studentNumber":"",
        "dormitoryNumber":"",
        "dailyScore":0,
        "monthlyScore":0,
        "balcony":false,
        "rubbish":false,
        "desk":false,
        "floor":false,
        "quilt":false,
        "dailyPenaltyImageUrl":"",
        "status":""
})

const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    CheckList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    CheckList()
}

import {CheckService,checkCutService,checkNoCutService} from '@/api/check.js'
const CheckList = async()=>{
    let params = {
        page:pageNum.value,
        pageSize:pageSize.value
    } 
    let result = await CheckService(params);
    total.value = result.data.total;
    categorys.value = result.data.rows;
}
CheckList();

const uploadSuccess = (result)=>{
    category.value.dailyPenaltyImageUrl = result.data
    console.log(result.data);
}

import {Plus} from '@element-plus/icons-vue'
//控制抽屉是否显示
const dialogVisible = ref(false)

import {ElMessage} from 'element-plus'
const onSubmit = async() =>{
    let result = await checkCutService(category.value);
    ElMessage.success(result.msg ? result.msg :'检查成功')
    CheckList();
    dialogVisible.value = false;
}
const offSubmit = async() =>{
    let result = await checkNoCutService(category.value);
    ElMessage.success(result.msg ? result.msg :'检查成功')
    CheckList();
    dialogVisible.value = false;
}

// const func = (param) => {
//   return param !== "未查房";
// }

</script>



<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>👨‍🏫学生列表👨‍🏫</span>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="学号" prop="studentNumber"> </el-table-column>
            <el-table-column label="宿舍号" prop="dormitoryNumber"></el-table-column>
            <el-table-column label="当日分数" prop="dailyScore"></el-table-column>
            <el-table-column label="当月已得分数" prop="monthlyScore"></el-table-column>
            <el-table-column label="当前状态" prop="status"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="dialogVisible = true; category=row; " 
                    :disabled="row.status!=='未查房'"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <el-drawer v-model="dialogVisible" title="扣分提交" direction="rtl" size="30%">
            <el-form :model="category" label-width="100px" >
                <el-form-item label="扣分原因">
                    <div>
                    <el-checkbox v-model="category.balcony" label="阳台脏乱" size="large" />
                    <el-checkbox v-model="category.rubbish" label="垃圾未倒" size="large" />
                    <el-checkbox v-model="category.desk" label="桌面杂乱" size="large" />
                    <el-checkbox v-model="category.floor" label="地面不洁" size="large" />
                    <el-checkbox v-model="category.quilt" label="被子未叠" size="large" />
                    </div>
                </el-form-item>
                <el-form-item label="应扣分数">
                    <el-select v-model="category.dailyScore" placeholder="请选择">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扣分证明">

                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/upload" :on-success="uploadSuccess" name="image"
                    >
                        <img v-if="category.dailyPenaltyImageUrl" :src="category.dailyPenaltyImageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">扣分</el-button>
                    <el-button type="primary" @click="offSubmit">优秀</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
:deep(.el-dialog__body){
    padding-top: 0;
}

.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

</style>
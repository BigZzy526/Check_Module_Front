<script setup>
import { ref } from 'vue'
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
const categorys = ref([
    {
        "studentNumber":1001,
        "dormitoryNumber":"D111",
        "dailyScore":10,
        "monthlyScore":100,
        "studentAppealReason":"null",
        "dailyPenaltyImageUrl":"null"
    }
])

const judge = ref(
    {
        "studentNumber":1001,
        "dormitoryNumber":"D111",
        "dailyScore":10,
        "monthlyScore":100,
        "studentAppealReason":"null",
        "dailyPenaltyImageUrl":"null"
    }
)

import {ProcessService, finalService, final2Service} from '@/api/check.js'
const ProcessList = async()=>{
    let result = await ProcessService();
    categorys.value = result.data;
}
ProcessList();

const dialogVisible = ref(false)

import {ElMessage} from 'element-plus'
const agree = async() =>{
    let result = await finalService(judge.value);
    ElMessage.success(result.msg ? result.msg :'处理申诉成功')
    ProcessList();
    dialogVisible.value = false;
}
const disagree = async() =>{
    let result = await final2Service(judge.value);
    ElMessage.success(result.msg ? result.msg :'处理申诉成功')
    ProcessList();
    dialogVisible.value = false;
}
</script>

<template>
    <el-card class="page-container">
    <template #header>
        <div class="header">
            <span>👨‍🏫申诉列表👨‍🏫</span>
        </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
        <el-table-column label="学号" prop="studentNumber"> </el-table-column>
        <el-table-column label="宿舍号" prop="dormitoryNumber"></el-table-column>
        <el-table-column label="当日分数" prop="dailyScore"></el-table-column>
        <el-table-column label="当月已得分数" prop="monthlyScore"></el-table-column>
        <el-table-column label="处理" width="100">
            <template #default="{ row }">
                <el-button :icon="Edit" circle plain type="primary" @click="dialogVisible = true; judge=row"></el-button>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="没有数据" />
        </template>
    </el-table>

    <el-dialog v-model="dialogVisible" title="处理申诉" width="30%">
        <h3>申诉理由：</h3>
        <el-row>
            {{ judge.studentAppealReason }}
        </el-row>
        <el-row justify="center" style="margin-top: 20px;">
            <el-image style="width: 300px; height: 300px" :src="judge.dailyPenaltyImageUrl" :fit="fill" />
        </el-row>
        <el-row justify="center" style="margin-top: 20px;">
            <el-button @click="disagree" style="margin-right: 10px;">不同意</el-button>
            <el-button type="primary" @click="agree">同意</el-button>
        </el-row>
    </el-dialog>
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
</style>
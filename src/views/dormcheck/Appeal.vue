<script setup>
const studentnumber = ref("1018")
  import { ref } from 'vue'
  const category = ref(
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
        "studentAppealReason":"",
        "dailyPenaltyImageUrl":"",
        "status":"",
    })

  import {ElMessage} from 'element-plus'
//获取本人的扣分原因以及图片，发出本人的扣分申请
import {AppealService,SendAppealService} from '@/api/check.js'
const AppealImg = async()=>{
  let params = {
        id:studentnumber.value
    } 
    let result = await AppealService(params);
    category.value = result.data;
}
AppealImg();
const Appeal = async() =>{
  let result = await SendAppealService(category.value)
  ElMessage.success(result.msg ? result.msg :'申诉成功')
}

</script>

<template>
  <el-row class="container" style="margin-top: -20px;">
    <el-col :span="24" style="text-align: center;" >
      <el-text tag="mark" style="font-size: 35px; font-weight: bold;" >🏠合理申诉，当天处理，快乐生活🏠</el-text>
    </el-col>
    <el-col v-for="(o, index) in 1" :key="o" :span="8" :offset="index > 0 ? 2 : 0" style="margin-top: 20px;">
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="category.dailyPenaltyImageUrl"
          class="image"
        />
        <div style="padding: 20px">
          <span>您的扣分原因: 
            <div v-if="category.balcony" style="padding: 10px 10px 10px 10px;">阳台脏乱</div>
            <div v-if="category.rubbish" style="padding: 10px 10px 10px 10px;">垃圾未倒</div>
            <div v-if="category.desk" style="padding: 10px 10px 10px 10px;">桌面杂乱</div>
            <div v-if="category.floor" style="padding: 10px 10px 10px 10px;">地面不洁</div>
            <div v-if="category.quilt" style="padding: 10px 10px 10px 10px;">被子未叠</div>

          </span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="8" class="centered-input" style="margin-top: 20px;">
      <el-form-item label="您的理由：">
      <el-input v-model="category.studentAppealReason" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Appeal">提交</el-button>
    </el-form-item>
    </el-col>
  </el-row>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 垂直居上 */
  margin-top: 40px; /* 调整整体顶部间距 */
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.el-row {
  display: flex;
  justify-content: center;
}

.el-col {
  flex-grow: 1;
}

.el-col img {
  max-width: 100%;
}

.centered-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textarea-input {
  width: 80%; /* 调整输入框宽度 */
  height: 200px; /* 调整输入框高度 */
  margin-top: 20px; /* 调整输入框垂直位置 */
}

.submit-button {
  margin-top: 20px; /* 调整提交按钮垂直位置 */
}
</style>

<!-- <script setup>
import avatar from '@/assets/default.png'

import { HelpPageInfoService } from '@/api/square.js';
import { useHelpPageStore } from '@/stores/helpPage.js';

const HelpPgaeStore = useHelpPageStore();

const getHelpPageInfo = async()=>{
  //调用接口
  const result = await HelpPageInfoService();
  //数据存储到pinia
  HelpPgaeStore.setInfo(result.data);
}

getHelpPageInfo();

</script> -->





<template>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
            <img
          src="https://shiyulu-dormhelppage.oss-cn-shanghai.aliyuncs.com/65a0fa29-b9fc-4d05-af85-e23d4eb76432.jpg"
          class="image"
            />
      </el-carousel-item>
    </el-carousel>


    <el-row>
        <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
        >
        <el-card :body-style="{ padding: '0px' }">
            <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            />
            <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
            </div>
            </div>
        </el-card>
        </el-col>
    </el-row>



</template>


<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>

<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<style>
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

/* 卡片样式 */

</style>
  
import {createRouter,createWebHistory} from 'vue-router' 

//导入组件
import LoginVue from "@/views/Login.vue";
import LayoutVue from "@/views/Layout.vue";

import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import SquareBoardVue from '@/views/square/SquareBoard.vue'
import CheckVue from '@/views/dormcheck/Check.vue'
import AppealVue from '@/views/dormcheck/Appeal.vue'
import ProcessVue from '@/views/dormcheck/Process.vue'
import RankVue from '@/views/dormcheck/Rank.vue'

//定义路由关系
const routes = [
    {path:'/login', component:LoginVue},
    {path:'/', component:LayoutVue,redirect: '/article/category', children:[
        {path:'/user/info',component:UserInfoVue},
        {path:'/user/avatar',component:UserAvatarVue},
        {path:'/user/resetPassword',component:UserResetPasswordVue},
        {path:'/square',component:SquareBoardVue},
        {path:'/dormcheck/Check',component:CheckVue},
        {path:'/dormcheck/Appeal',component:AppealVue},
        {path:'/dormcheck/Process',component:ProcessVue},
        {path:'/dormcheck/Rank',component:RankVue}
    ]}
]

//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router
import { defineStore } from "pinia";
import { ref } from "vue";

const useHelpPageStore = defineStore('helpPage',()=>{
    //定义状态相关的内容

    const helpPageInfo = ref({})

    const setInfo = (newInfo)=>{
        helpPageInfo.value = newInfo
    }

    const removeInfo = ()=>{
        helpPageInfo.value = {}
    }

    return {helpPageInfo,setInfo,removeInfo}
},{persist:true})

export default useHelpPageStore
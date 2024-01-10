import request from '@/utils/request.js'

export const CheckService = (params) =>{
    return request.get('/chr',{params:params})
}

export const ProcessService = () =>{
    return request.get('/pro/getAll')
}

export const finalService = (params) =>{
    return request.put('/pro',params)
}

export const final2Service = (params) =>{
    return request.put('/pro/dis',params)
}

export const checkCutService = (params) =>{
    return request.put('/chr',params)
}

export const checkNoCutService = (params) =>{
    return request.put('/chr/update1',params)
}

export const AppealService = (params) =>{
    return request.get('/reply',{params:params})
}

export const SendAppealService = (params) =>{
    return request.put('/reply/add',params)
}

export const GetTopService = () =>{
    return request.get('/chr/Ranktop')
}

export const GetBottomService = () =>{
    return request.get('/chr/Rankbottom')
}

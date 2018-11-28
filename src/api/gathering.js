import request from '@/utils/request'
import { get } from 'http';

export default{
    getList(){
        return request({
            url: '/gathering/gathering',
            method: 'get'
        });
    },
    getPageList(page, size, searchMap){
        return request({
            url: `/gathering/gathering/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        });
    },
    save(pojo){
        return request({
            url: "gathering/gathering",
            method: 'post',
            data: pojo
        });
    },
    update(gatheringId, pojo){
        if(gatheringId == ''){
            return this.save(pojo)
        }
        return request({
            url: `gathering/gathering/${gatheringId}`,
            method: 'put',
            data: pojo
        }); 
    },
    getById(gatheringId) {
        return request({
            url: `gathering/gathering/${gatheringId}`,
            method: 'get'
        });
    }
}
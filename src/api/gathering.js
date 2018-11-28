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
    edit(gatheringId){
        return request({
            url: `gathering/gathering/${gatheringId}`,
            method: 'put'
        }); 
    },
    getById(gatheringId) {
        return request({
            url: `gathering/gathering/${gatheringId}`,
            method: 'get'
        });
    }
}
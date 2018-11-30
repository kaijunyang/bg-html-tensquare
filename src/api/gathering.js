import request from '@/utils/request'

const group_name = "api"
const api_name = "gathering" 

export default{
    getList(){
        return request({
            url: `/${group_name}/${api_name}`,
            method: 'get'
        });
    },
    getPageList(page, size, searchMap){
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        });
    },
    save(pojo){
        return request({
            url: `${group_name}/${api_name}`,
            method: 'post',
            data: pojo
        });
    },
    update(gatheringId, pojo){
        if(gatheringId == ''){
            return this.save(pojo)
        }
        return request({
            url: `${group_name}/${api_name}/${gatheringId}`,
            method: 'put',
            data: pojo
        }); 
    },
    getById(gatheringId) {
        return request({
            url: `${group_name}/${api_name}/${gatheringId}`,
            method: 'get'
        });
    },
    deleteById(gatheringId){
        return request({
            url: `${group_name}/${api_name}/${gatheringId}`,
            method: 'delete'
        });
    }
}
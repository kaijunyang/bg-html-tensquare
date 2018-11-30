import request from '@/utils/request'

export default {
    getList() {
        return request({
            url: '/api/city',
            method: 'get'
        });
    }
}
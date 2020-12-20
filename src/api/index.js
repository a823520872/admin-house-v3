import ajax from '../utils/fetch.js';

// import ajax from '../utils/ajax.js';

export default {
    user: {
        login(params) {
            return ajax('/api/admin/User/login', params, { method: 'post', loading: true, });
        }
    },
    landlord: {
        list(params) {
            return ajax('/api/admin/landlord/getList', params, { method: 'get', loading: true, });
        },
        detail(params) {
            return ajax('/api/admin/landlord/getDetail', params, { method: 'get', loading: true, });
        },
        add(params) {
            return ajax('/api/admin/landlord/add', params, { method: 'post', loading: true, });
        },
        edit(params) {
            return ajax('/api/admin/landlord/edit', params, { method: 'post', loading: true, });
        },
        del(params) {
            return ajax('/api/admin/landlord/del', params, { method: 'post', loading: true, });
        },
        check(params) {
            return ajax('/api/admin/landlord/audit', params, { method: 'post', loading: true, });
        },
        getQRCode(params) {
            return ajax('/api/admin/landlord/getQrcode', params, { method: 'post', loading: true, });
        },
        getOpenList(params) {
            return ajax('/api/admin/landlord/getOpeningList', params, { method: 'get', loading: true, });
        }
    },
    house: {
        list(params) {
            return ajax('/api/admin/house_resource/getList', params, { method: 'get', loading: true, });
        },
        detail(params) {
            return ajax('/api/admin/house_resource/getDetail', params, { method: 'get', loading: true, });
        },
        add(params) {
            return ajax('/api/admin/house_resource/add', params, { method: 'post', loading: true, });
        },
        edit(params) {
            return ajax('/api/admin/house_resource/edit', params, { method: 'post', loading: true, });
        },
        del(params) {
            return ajax('/api/admin/house_resource/del', params, { method: 'post', loading: true, });
        },
        getQRCode(params) {
            return ajax('/api/admin/house_resource/getPoster', params, { method: 'post', loading: true, });
        },
        updateRentStatus(params) {
            return ajax('/api/admin/house_resource/changeRantstatus', params, { method: 'post', loading: true, });
        }
    },
    addr: {
        area(params = {}) {
            return ajax('/api/admin/area/getAllList', params, { method: 'get', loading: true, });
        },
        street(params = {}) {
            return ajax('/api/admin/Area_Street/getList', params, { method: 'get', loading: true, });
        },
        addStreet(params = {}) {
            return ajax('/api/admin/Area_Street/add', params, { method: 'post', loading: true, });
        },
        editStreet(params = {}) {
            return ajax('/api/admin/Area_Street/edit', params, { method: 'post', loading: true, });
        },
        delStreet(params = {}) {
            return ajax('/api/admin/Area_Street/del', params, { method: 'post', loading: true, });
        },
        allFlag(params = {}) {
            return ajax('/api/admin/area_flag/getAllList', params, { method: 'get', loading: true, });
        },
        flag(params) {
            return ajax('/api/admin/area_flag/getList', params, { method: 'get', loading: true, });
        },
        addFlag(params = {}) {
            return ajax('/api/admin/Area_Flag/add', params, { method: 'post', loading: true, });
        },
        editFlag(params = {}) {
            return ajax('/api/admin/Area_Flag/edit', params, { method: 'post', loading: true, });
        },
        delFlag(params = {}) {
            return ajax('/api/admin/Area_Flag/del', params, { method: 'post', loading: true, });
        },
        metro(params = {}) {
            return ajax('/api/admin/metro/getList', params, { method: 'get', loading: true, });
        },
        editMetro(params = {}) {
            return ajax('/api/admin/metro/Edit', params, { method: 'post', loading: true, });
        },
    },
    statistics: {
        list(params = {}) {
            return ajax('/api/admin/statistics/style1', params, { method: 'get', loading: true, });
        }
    },
    config(params) {
        return ajax('/api/admin/keyvalue/getAllList', params, { method: 'get', loading: true, });
    },
    upload(params) {
        return ajax('/api/upload/uploadImage', params, { method: 'post', upload: true });
    }
};

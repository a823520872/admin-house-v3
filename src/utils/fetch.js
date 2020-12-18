import { useRouter } from 'vue-router'
import store from '../store.js'
import { ElMessageBox } from 'element-plus';

function Ajax(url, params = {}, config = {}) {
    const router = useRouter()
    let cfg = {
        ...{
            method: 'get',
            credentials: 'include',
            // mode: 'no-cors',
            mode: 'cors',
            headers: {},
        },
        ...config
    }
    if (cfg.method === 'get') {
        let paramsStr = Object.keys(params).reduce((str, key) => {
            str += `&${key}=${params[key]}`
            return str
        }, '').replace('&', '?')
        url += paramsStr
    } else if (cfg.method === 'post') {
        cfg.headers['Content-Type'] = 'application/json'
        cfg.body = JSON.stringify(params)
    }

    const token = sessionStorage.getItem('tk')
    
    if (token) {
        cfg.headers.token = token
    }
    
    return new Promise((resolve, reject) => {
        const { setLoading } = store
        config.loading && setLoading(true)
        fetch(url, cfg).then(res => res.json()).then(json => {
            config.loading && setLoading(false)
            if (json.code === 1) {
                resolve(json)
            } else if (json.code === 401) {
                sessionStorage.clear();
                router.replace('/login');
            } else {
                ElMessageBox(json.msg, '服务异常', 'warning');
                reject({ msg: json.msg });
            }
        }, e => {
            reject(e)
            config.loading && setLoading(false)
        }).catch((e) => {
            reject({ msg: '网络异常' });
            ElMessageBox(e.message, '网络异常', 'error');
        })
    })
}

export default Ajax

import store from '../store.js'

function Ajax(url, params, config = {}) {
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
            str += `&${key}=${str}`
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
            resolve(json)
            config.loading && setLoading(false)
        }, e => {
            reject(e)
            config.loading && setLoading(false)
        })
    })
}

export default Ajax

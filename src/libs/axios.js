import axios from 'axios'
import {getToken, setToken} from '@/libs/util'

// import { Spin } from 'iview'

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }

    distroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 头部携带 token
            config.headers['Authorization'] = getToken() || 'douanquan';
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
            let token = res.headers.authorization;
            if (token) {
                // 如果 header 中存在 token，那么就替换本地的 token
                setToken(`Bearer ${token}`);
            }
            this.distroy(url)
            const {data, status} = res
            return {data, status}
        }, error => {
            this.distroy(url)
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest

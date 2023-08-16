const config = Symbol('config');
const isCompleteURL = Symbol('isCompleteURL');
const requestBefore = Symbol('requestBefore');
const requestAfter = Symbol('requestAfter');

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Data = Object | String | ArrayBuffer;

interface Config {
	baseURL?: string;
	dataType?: string;
	url?: string;
	data?: Data;
	timeout?: number;
	method?: Method;
	header?: {
		[propertyName: string]: any
	};
}

class Axios {
    //默认配置
    [config] = {
        baseURL: '',
		dataType: 'json',
		timeout: 6000,
        method: 'GET',
        responseType: 'text',
		header: {
		    'Content-Type': 'application/json;charset=UTF-8',
		}
    }
	
	constructor(conf?: Config) {
		const option = { ...this[config], ...conf};
		this[config] = option as any;
	}
	
    //拦截器
    interceptors = {
        request: (func: (e: Config) => Config) => {
            if (func) {
                Axios[requestBefore] = func
            } else {
                Axios[requestBefore] = (request: Config) => request
            }
        },
        response: (func: (e: {[propertyName: string]: any}) => any) => {
            if (func) {
                Axios[requestAfter] = func
            } else {
                Axios[requestAfter] = (response: {[propertyName: string]: any}) => response
            }
        }
    }
    static [requestBefore] (config: Config) {
        return config
    }
    static [requestAfter] (response: any) {
        return response
    }
    static [isCompleteURL] (url: string) {
        return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
    }
	
	setConfig (func: Function) {
	    this[config] = func(this[config]);
	}
	getConfig () {
	    return this[config];
	}
    
    request (options: Config = {}) {
        const baseURL = options['baseURL'] || this[config].baseURL;
        options['dataType'] = options['dataType'] || this[config].dataType;
        options['url'] = Axios[isCompleteURL](options['url']) ? options['url'] : (baseURL + options['url']);
        options['data'] = options['data'];
        options['header'] = {...options['header'], ...this[config].header};
        options['method'] = options['method'] || this[config].method as Method;
		options = { ...options, ...Axios[requestBefore](options) };
        return new Promise((resolve, reject) => {
            options['success'] = function (res: unknown) {
                resolve(Axios[requestAfter](res))
            }
            options['fail']= function (err: unknown) {
                reject(Axios[requestAfter](err))
            }
			uni.request(options as any);
        })
    }
	
    get (url: string, data: Data = '', options = {}) {
        const option = getOptions('GET', url, data, options);
        return this.request(option);
    }
	
    post (url: string, data: Data = '', options = {}) {
        const option = getOptions('POST', url, data, options);
        return this.request(option);
    }
	
	put (url: string, data: Data = '', options = {}) {
	    const option = getOptions('PUT', url, data, options);
	    return this.request(option);
	}
	
	delete (url: string, data: Data = '', options = {}) {
	    const option = getOptions('DELETE', url, data, options);
	    return this.request(option);
	}
}

const getOptions = (method: Method, url: string, data: Data = '', options: {}) => {
	options['method'] = method;
	options['url'] = url;
	if(data && data != {}){
		options['data'] = data;
	}
	return options;
}

export default Axios;
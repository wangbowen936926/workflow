import * as dd from 'dingtalk-jsapi';
import app from '@/constants/app';

export function getAuthCode(corpId: string = app.CORP_ID): Promise<any> {
    return new Promise((resolve, reject) => {
        dd.ready(() => {
            dd.runtime.permission.requestAuthCode({
                corpId: corpId
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    })
}
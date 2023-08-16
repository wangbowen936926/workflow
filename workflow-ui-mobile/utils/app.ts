/**
 * description: 全局注册组件
 * @createTime: 2023-07-15 13:03:18
 * @param 
 * @return 
 */
export function registerComponents(app: {[propertyName: string]: any}, coms: {}[]){
	coms.forEach(item => app.component(item['__name'], item));
}
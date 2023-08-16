import configs from "@/pages.json";

const pages = configs.pages;
const tabbarPages = configs?.tabBar?.list || [];

/**
 * 获取路由路径集合
 * @param rouets 
 * @returns 
 */
export function getRoutePaths(rouets = pages) {
    return rouets.map(item => item.path);
}

/**
 * 查找路由
 * @param path 
 * @returns 
 */
export function findRoute(path: string) {
	const url = path.split('?')[0];
    return pages.find(route => (url === `/${route.path}`));
}

/**
 * 检查路由是否是SwitchTab类型
 * @param path 
 * @returns
 */
export function checkRouteSwitchTabType(path: string) {
	if(!tabbarPages.length){
		return false;
	}
	return tabbarPages.some(route => (path === `/${route.pagePath}`));
}
import routes from "@/configs/routes"

/**
 * 获取路由路径集合
 * @param rouets 
 * @returns 
 */
export function getRoutePaths(rouets: Router.Info[] = routes) {
    return rouets.map(item => item.path);
}

/**
 * 查找路由
 * @param name_or_path 
 * @returns 
 */
export function findRoute(name_or_path: string) {
    const route = routes.find(route => {
        return (route.name === name_or_path) || (route.path === name_or_path);
    });
    return route;
}
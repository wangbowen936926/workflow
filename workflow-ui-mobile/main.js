import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
import uviewPlus from '@/uni_modules/uview-plus';
import components from '@/components';
import { registerComponents } from '@/utils/app';
export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus);
	registerComponents(app, components);
	return {
		app
	}
}
// #endif
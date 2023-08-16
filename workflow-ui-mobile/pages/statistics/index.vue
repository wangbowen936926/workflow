<template>
	<pro-page-view title="统计" n-left-icon='close' @onNavbarLeftClick='onNavbarLeftClick'></pro-page-view>
</template>

<script setup lang='ts'>
	import * as ding from '@/utils/dingtalk';
	
	const onNavbarLeftClick = () => {
		if(ding.isDingPlatform){
			return ding.quitApp();
		}
		console.warn('不是钉钉环境');
	}
</script>

<style scoped lang='scss'></style>
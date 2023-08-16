<template>
	<view v-if="list && list.length" class="flow-steps">
		<view style="padding: 15px; background-color: #fff;">
			<view class="title">流程</view>
			<u-steps :current="1" direction="column">
				<view class="item" v-for="(item, index) in (list as any[])" :key="index">
					<view class="left">
						<view class="icon">
							<text>{{ item.iconText || '空' }}</text>
							<view class="mark">
								<view :style="{background: StatusColor[item.status]}">
									<u-icon :name="StatusIcon[item.status]"  size="12" color="#fff"/>
								</view>
							</view>
						</view>
						<view class="line"></view>
					</view>
					<view class="item__right-content">
						<view class="item__title-box">
							<view>
								<text class="item__title">{{ item.title }}</text>
								<text class="item__date-time">{{ item.datetime || '' }}</text>
							</view>
							<view class="item__desc">{{ item.desc || '' }}</view>
						</view>
						<view class="item__content" :style="{
							padding: `${item.content ? '20rpx' : 0}`,
							marginBottom: `${item.content ? '70rpx' : 0}`,
						}">
						    {{ item.content || '' }}
						</view>
					</view>
				</view>
			</u-steps>
		</view>
	</view>
</template>

<script setup lang="ts">
	
	type Status = 'agree' | 'processing'
	
	enum StatusColor {
		agree = '#16bc82',
		processing = '#ff9541'
	}
	
	enum StatusIcon {
		agree = 'checkbox-mark',
		processing = 'more-dot-fill'
	}
	
	defineProps<{
		list: {
			status?: Status;
			datetime?: string;
			title: string;
			desc: string;
			iconText: string;
			content?: string;
		}[]
	}>();
	
</script>

<style>
	.flow-steps /deep/ .u-steps-item__wrapper--column{
		width: unset;
	}
	.flow-steps /deep/ .u-steps-item__line--column{
		left: 35rpx;
	}
</style>

<style scoped lang="scss">
	.flow-steps{
		.title{
			color: #333;
			font-size: 15px;
			font-weight: bold;
			padding-bottom: 30rpx;
		}
	}
	.item{
		display: flex;
		flex-direction: row;
		.left > .icon{
			position: relative;
			width: 80rpx;
			height: 80rpx;
			color: #fff;
			font-size: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 14rpx;
			background-color: #3c9cff;
			> text{
				width: 100%;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.mark{
				position: absolute;
				right: -15rpx;
				bottom: 0;
				z-index: 99;
				width: 35rpx;
				height: 35rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background-color: #fff;
				> view{
					width: 80%;
					height: 80%;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
				}
			}
		}
		&__right-content{
			width: 100%;
			margin-left: 30rpx;
		}
		&__title-box{
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		&__title-box > view:nth-child(1){
			display: flex;
			justify-content: space-between;
		}
		&__title{
			font-size: 26rpx;
			font-weight: bold;
		}
		&__desc{
			color: $text-color-inactive;
			font-size: 26rpx;
		}
		&__date-time{
			color: $text-color-inactive;
			font-size: 26rpx;
		}
		&__content{
			font-size: 24rpx;
			color: #807f83;
			border-radius: 0 10rpx 10rpx 10rpx;
			background-color: #f3f2f7;
		}
	}
	
	.flow-steps .item:not(:last-of-type){
		.left > .line{
			min-height: 60rpx;
			height: calc(100% - 80rpx);
			display: flex;
			justify-content: center;
			&::before{
				content: '';
				margin: 6rpx 0;
				border-width: 2px;
				border-color: #e4e4e4;
				border-style: solid; //dashed
			}
		}
	}
	
</style>
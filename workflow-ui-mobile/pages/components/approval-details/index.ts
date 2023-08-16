import purchase from './template/purchase';
import advanceChargeApply from './template/advance-charge-apply';
import payableApplyForm from './template/payable-apply-form';
import payableDocuemnt from './template/payable-docuemnt';
import paymentApply from './template/payment-apply';
import otherDeliveryOrder from './template/other-delivery-order';
import fixedPurchase from './template/fixed-purchase';
import assetDisposal from './template/asset-disposal';
import hardware from './template/hardware';
import officeSupplies from './template/office-supplies';
import auxiliaryMaterial from './template/auxiliary-material';
import salesForwardContract from './template/sales-forward-contract';
import salesForwarder from './template/sales-forwarder';
import salesForwardContractIn from './template/sales-forward-contract-in';
import fundAllocation from './template/fund-allocation';
import fundFeeApplication from './template/fund-fee-application';
import fundOverPayment from './template/fund-over-payment';
import fundPayRoll from './template/fund-pay-roll';
import fundEngineeringProcurement from './template/fund-engineering-procurement';
import fundInfrastructureContract from './template/fund-infrastructure-contract';
import outSourceGoods from './template/out-source-goods';

export default {
	// 预付款申请单
	'000003': advanceChargeApply,
	// 应付款申请单
	'000004': payableApplyForm,
	// 应付单（发票）单
	'000005': payableDocuemnt,
	// 付款申请单
	'000006': paymentApply,
	// 付款申请单(结算)
	//'000007': '',
	// 其他出库单
	'000009': otherDeliveryOrder,
	// 固定资产
	'100101': fixedPurchase,
	// 资产处置
	'100401': assetDisposal,
	// 五金件
	'200101': hardware,
	// 办公用品
	'300101': officeSupplies,
	// 原辅材料
	'400101': auxiliaryMaterial,
	// 销售合同
	'500101': salesForwardContract,
	// 
	'500201': '',
	'500202': '',
	// 境内销售合同
	'500301': salesForwardContractIn,
	// 资金调拨
	'700101': fundAllocation,
	// 费用申请单
	'700201': fundFeeApplication,
	// 境外付款单
	'700301': fundOverPayment,
	// 工资发放单
	'700401': fundPayRoll,
	// 工程采购单
	'700501': fundEngineeringProcurement,
	// 基建合同
	'700601': fundInfrastructureContract,
	// 外购商品
	'800101': outSourceGoods,
}
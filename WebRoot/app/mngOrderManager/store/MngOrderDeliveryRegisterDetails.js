/**
 * <p>Table: t_order_delivery_register_details - </p>
 * @since 2017-02-22 03:34:45
 */
Ext.define('srm.mngOrderManager.store.MngOrderDeliveryRegisterDetails', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderDeliveryRegisterDetails'],
	model: 'srm.mngOrderManager.model.MngOrderDeliveryRegisterDetails',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		extraParams:{usePaging:true},
		api: {
			create: 'mngPurchaseOrder/mngOrderDeliveryRegisterDetails.do?method=addMngOrderDeliveryRegisterDetails',
			update: 'mngPurchaseOrder/mngOrderDeliveryRegisterDetails.do?method=updateMngOrderDeliveryRegisterDetails',
			read: 	'mngPurchaseOrder/mngOrderDeliveryRegisterDetails.do?method=getMngOrderDeliveryRegisterDetailsList',
			destroy:'mngPurchaseOrder/mngOrderDeliveryRegisterDetails.do?method=deleteMngOrderDeliveryRegisterDetails'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorters: [
	{
		property:'detail_id',
		direction: 'DESC'
	}
	]		 
});

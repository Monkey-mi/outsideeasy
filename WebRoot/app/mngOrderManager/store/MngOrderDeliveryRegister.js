/**
 * <p>Table: t_order_delivery_register - </p>
 * @since 2017-02-22 02:01:12
 */
Ext.define('srm.mngOrderManager.store.MngOrderDeliveryRegister', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderDeliveryRegister'],
	model: 'srm.mngOrderManager.model.MngOrderDeliveryRegister',
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
			create: 'mngPurchaseOrder/mngOrderDeliveryRegister.do?method=addMngOrderDeliveryRegister',
			update: 'mngPurchaseOrder/mngOrderDeliveryRegister.do?method=updateMngOrderDeliveryRegister',
			read: 	'mngPurchaseOrder/mngOrderDeliveryRegister.do?method=getMngOrderDeliveryRegisterList',
			destroy:'mngPurchaseOrder/mngOrderDeliveryRegister.do?method=deleteMngOrderDeliveryRegister'
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
		property:'register_id',
		direction: 'DESC'
	}
	]		 
});

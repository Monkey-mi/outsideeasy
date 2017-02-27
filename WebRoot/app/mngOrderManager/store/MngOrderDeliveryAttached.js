/**
 * <p>Table: t_order_delivery_attached - </p>
 * @since 2017-02-23 01:54:10
 */
Ext.define('srm.mngOrderManager.store.MngOrderDeliveryAttached', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderDeliveryAttached'],
	model: 'srm.mngOrderManager.model.MngOrderDeliveryAttached',
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
			create: 'mngPurchaseOrder/mngOrderDeliveryAttached.do?method=addMngOrderDeliveryAttached',
			update: 'mngPurchaseOrder/mngOrderDeliveryAttached.do?method=updateMngOrderDeliveryAttached',
			read: 	'mngPurchaseOrder/mngOrderDeliveryAttached.do?method=getMngOrderDeliveryAttachedList',
			destroy:'mngPurchaseOrder/mngOrderDeliveryAttached.do?method=deleteMngOrderDeliveryAttached'
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
		property:'id',
		direction: 'DESC'
	}
	]		 
});

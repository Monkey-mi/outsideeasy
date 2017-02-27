Ext.define('srm.mngOrderManager.store.MngPurchaseOrder', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngPurchaseOrder'],
	model: 'srm.mngOrderManager.model.MngPurchaseOrder',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'mngPurchaseOrder/mngPurchaseOrder.do?method=addMngPurchaseOrder',
			update: 'mngPurchaseOrder/mngPurchaseOrder.do?method=updateMngPurchaseOrder',
			read: 'mngPurchaseOrder/mngPurchaseOrder.do?method=getMngPurchaseOrderList',
			destroy: 'mngPurchaseOrder/mngPurchaseOrder.do?method=deleteMngPurchaseOrder'
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
	sorter: [{
		property: 'pur_order_id',
		direction: 'ASC'
	}]
});

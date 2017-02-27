Ext.define('srm.mngOrderManager.store.MngPurchaseOrderDetails', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngPurchaseOrderDetails'],
	model: 'srm.mngOrderManager.model.MngPurchaseOrderDetails',
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
			create: 'mngPurchaseOrder/mngPurchaseOrderDetails.do?method=addMngPurchaseOrderDetails',
			update: 'mngPurchaseOrder/mngPurchaseOrderDetails.do?method=updateMngPurchaseOrderDetails',
			read: 'mngPurchaseOrder/mngPurchaseOrderDetails.do?method=getMngPurchaseOrderDetailsList',
			destroy: 'mngPurchaseOrder/mngPurchaseOrderDetails.do?method=deleteMngPurchaseOrderDetails'
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
		property: 'order_detail_id',
		direction: 'ASC'
	}]
});

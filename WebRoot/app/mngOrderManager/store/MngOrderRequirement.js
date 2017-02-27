Ext.define('srm.mngOrderManager.store.MngOrderRequirement', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderRequirement'],
	model: 'srm.mngOrderManager.model.MngOrderRequirement',
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
			create: 'mngPurchaseOrder/mngOrderRequirement.do?method=addOrderRequirement',
			update: 'mngPurchaseOrder/mngOrderRequirement.do?method=updateOrderRequirement',
			read: 'mngPurchaseOrder/mngOrderRequirement.do?method=getOrderRequirementList',
			destroy: 'mngPurchaseOrder/mngOrderRequirement.do?method=deleteOrderRequirement'
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
		property: 'order_req_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.mngOrderManager.store.MngOrderCommunication',{
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderCommunication'],
	model: 'srm.mngOrderManager.model.MngOrderCommunication',
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
			create: 'mngPurchaseOrder/mngOrderCommunication.do?method=addMngOrderCommunication',
			update: 'mngPurchaseOrder/mngOrderCommunication.do?method=updateMngOrderCommunication',
			read: 'mngPurchaseOrder/mngOrderCommunication.do?method=getMngOrderCommunicationLists',
			destroy: 'mngPurchaseOrder/mngOrderCommunication.do?method=deleteOrderCommunication'
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
		property: 'id',
		direction: 'ASC'
	}]
});
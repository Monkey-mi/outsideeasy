Ext.define('srm.mngOrderManager.store.MngOrderAttchedFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderAttchedFile'],
	model: 'srm.mngOrderManager.model.MngOrderAttchedFile',
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
			create: 'mngPurchaseOrder/mngOrderAttchedFile.do?method=addMngOrderAttchedFile',
			update: 'mngPurchaseOrder/mngOrderAttchedFile.do?method=updateMngOrderAttchedFile',
			read: 'mngPurchaseOrder/mngOrderAttchedFile.do?method=getMngOrderAttchedFileList',
			destroy: 'mngPurchaseOrder/mngOrderAttchedFile.do?method=deleteMngOrderAttchedFile'
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
		property: 'order_attched_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.mngOrderManager.store.MngOrderDeliveryNotice', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderDeliveryNotice'],
	model: 'srm.mngOrderManager.model.MngOrderDeliveryNotice',
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
			create: 'mngPurchaseOrder/mngOrderDeliveryNotice.do?method=addMngOrderDeliveryNotice',
			update: 'mngPurchaseOrder/mngOrderDeliveryNotice.do?method=updateMngOrderDeliveryNotice',
			read: 'mngPurchaseOrder/mngOrderDeliveryNotice.do?method=getMngOrderDeliveryNoticeList',
			destroy: 'mngPurchaseOrder/mngOrderDeliveryNotice.do?method=deleteMngOrderDeliveryNotice'
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
		property: 'delivery_notice_id',
		direction: 'ASC'
	}]
});

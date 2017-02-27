Ext.define('srm.mngOrderManager.store.MngOrderDeliveryNoticedetails', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderDeliveryNoticedetails'],
	model: 'srm.mngOrderManager.model.MngOrderDeliveryNoticedetails',
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
			create: 'mngPurchaseOrder/mngOrderDeliveryNoticedetails.do?method=addMngOrderDeliveryNoticedetails',
			update: 'mngPurchaseOrder/mngOrderDeliveryNoticedetails.do?method=updateMngOrderDeliveryNoticedetails',
			read: 'mngPurchaseOrder/mngOrderDeliveryNoticedetails.do?method=getMngOrderDeliveryNoticedetailsList',
			destroy: 'mngPurchaseOrder/mngOrderDeliveryNoticedetails.do?method=deleteMngOrderDeliveryNoticedetails'
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
		property: 'details_id',
		direction: 'ASC'
	}]
});

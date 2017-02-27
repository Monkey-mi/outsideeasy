/**
 * <p>Table: t_order_qualitycheck - </p>
 * @since 2017-02-22 05:24:18
 */
Ext.define('srm.mngOrderManager.store.MngOrderQualitycheck', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderQualitycheck'],
	model: 'srm.mngOrderManager.model.MngOrderQualitycheck',
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
			create: 'mngPurchaseOrder/mngOrderQualitycheck.do?method=addMngOrderQualitycheck',
			update: 'mngPurchaseOrder/mngOrderQualitycheck.do?method=updateMngOrderQualitycheck',
			read: 	'mngPurchaseOrder/mngOrderQualitycheck.do?method=getMngOrderQualitycheckList',
			destroy:'mngPurchaseOrder/mngOrderQualitycheck.do?method=deleteMngOrderQualitycheck'
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
		property:'check_id',
		direction: 'DESC'
	}
	]		 
});

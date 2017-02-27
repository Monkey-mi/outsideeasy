/**
 * <p>Table: t_order_check_details - </p>
 * @since 2017-02-22 05:30:17
 */
Ext.define('srm.mngOrderManager.store.MngOrderCheckDetails', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderCheckDetails'],
	model: 'srm.mngOrderManager.model.MngOrderCheckDetails',
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
			create: 'mngPurchaseOrder/mngOrderCheckDetails.do?method=addMngOrderCheckDetails',
			update: 'mngPurchaseOrder/mngOrderCheckDetails.do?method=updateMngOrderCheckDetails',
			read: 	'mngPurchaseOrder/mngOrderCheckDetails.do?method=getMngOrderCheckDetailsList',
			destroy:'mngPurchaseOrder/mngOrderCheckDetails.do?method=deleteMngOrderCheckDetails'
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
		property:'check_detail_id',
		direction: 'DESC'
	}
	]		 
});

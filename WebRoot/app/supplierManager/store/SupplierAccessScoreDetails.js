Ext.define('srm.supplierManager.store.SupplierAccessScoreDetails', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.SupplierAccessScoreDetails'],
	model: 'srm.supplierManager.model.SupplierAccessScoreDetails',
	
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
			read: 'supplierAccess/SupplierAccessScoreDetails.do?method=getSupplierAccessScoreDetailsList'
			
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	}
});

Ext.define('srm.supplierManager.store.AccessScoreSummary', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AccessScoreSummary'],
	model: 'srm.supplierManager.model.AccessScoreSummary',
	//pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read:'supplierAccess/SupplierAccessScoreSummary.do?method=getSupplierAccessScoreList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	}

});

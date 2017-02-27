Ext.define('srm.supplierAccess.store.SupplierAccessScore', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAccess.model.SupplierAccessScore'],
	model: 'srm.supplierAccess.model.SupplierAccessScore',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplierAccess/SupplierAccessScore.do?method=addSupplierAccessScore',
			update: 'supplierAccess/SupplierAccessScore.do?method=updateSupplierAccessScore',
			read: 'supplierAccess/SupplierAccessScore.do?method=getSupplierAccessScoreList',
			destroy: 'supplierAccess/SupplierAccessScore.do?method=deleteSupplierAccessScore'
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
			writeAllFields:true,
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'score_id',
		direction: 'ASC'
	}]
});

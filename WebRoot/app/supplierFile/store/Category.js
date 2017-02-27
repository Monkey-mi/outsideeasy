Ext.define('srm.supplierFile.store.Category', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.Category'],
	model: 'srm.supplierFile.model.Category',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				read: 'purchaseCategory/purchaseCategory.do?method=getPurchaseCategoryList'
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
		property: 'category_id',
		direction: 'ASC'
	}]
});

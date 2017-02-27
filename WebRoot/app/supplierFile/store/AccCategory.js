Ext.define('srm.supplierFile.store.AccCategory', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccCategory'],
	model: 'srm.supplierFile.model.AccCategory',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
			create: 'supplier/category.do?method=addAccessApplicationCategory',
			update: 'supplier/category.do?method=updateAccessApplicationCategory',
			read: 'supplier/category.do?method=getAccessApplicationCategoryList',
			destroy: 'supplier/category.do?method=deleteAccessApplicationCategory'
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

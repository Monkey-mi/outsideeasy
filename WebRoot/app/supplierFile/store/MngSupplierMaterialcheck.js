Ext.define('srm.supplierFile.store.MngSupplierMaterialcheck', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.MngSupplierMaterialcheck'],
	model: 'srm.supplierFile.model.MngSupplierMaterialcheck',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/mngSupplierMaterialcheck.do?method=addMngSupplierMaterialcheck',
			update: 'supplier/mngSupplierMaterialcheck.do?method=updateMngSupplierMaterialcheck',
			read: 'supplier/mngSupplierMaterialcheck.do?method=getMngSupplierMaterialcheckList',
			destroy: 'supplier/mngSupplierMaterialcheck.do?method=deleteMngSupplierMaterialcheck'
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
		property: 'materialcheck_id',
		direction: 'ASC'
	}]
});

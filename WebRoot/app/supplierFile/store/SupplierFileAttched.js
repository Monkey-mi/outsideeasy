/*公司注册附件表store*/
Ext.define('srm.supplierFile.store.SupplierFileAttched', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccRegisterAttched'],
	model: 'srm.supplierFile.model.AccRegisterAttched',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'supplier/attched.do?method=getSupplierFileAttchedList'
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

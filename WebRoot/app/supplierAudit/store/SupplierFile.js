//供应商档案信息表store
Ext.define('srm.supplierAudit.store.SupplierFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.SupplierFile'],
	model: 'srm.supplierAudit.model.SupplierFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			create: 'supplier/supplierFile.do?method=addSupplierFile',
			update: 'supplier/supplierFile.do?method=updateSupplierFile',
			read: 'supplier/supplierFile.do?method=getSupplierFileList',
			destroy: 'supplier/supplierFile.do?method=deleteSupplierFile'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'company_id',
		direction: 'ASC'
	}]
});

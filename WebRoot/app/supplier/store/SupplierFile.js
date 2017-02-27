Ext.define('srm.supplier.store.SupplierFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.SupplierFile'],
	model: 'srm.supplier.model.SupplierFile',
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
			create: 'supplier/supplierFile.do?method=addSupplierFile',
			update: 'supplier/supplierFile.do?method=updateSupplierFile',
			read: 'supplier/supplierFile.do?method=getSupplierFileByID',
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
	sorters: [{
		property: 'company_id',
		direction: 'DESC'
	}]
});

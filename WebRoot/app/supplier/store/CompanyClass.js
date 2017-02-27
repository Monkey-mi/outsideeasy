Ext.define('srm.supplier.store.CompanyClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.CompanyClass'],
	model: 'srm.supplier.model.CompanyClass',
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
			create: 'supplier/supplierFile.do?method=addCompanyClass',
			update: 'supplier/supplierFile.do?method=updateCompanyClass',
			read: 'supplier/supplierFile.do?method=getCompanyClassList',
			destroy: 'supplier/supplierFile.do?method=deleteCompanyClass'
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
		property: 'nature_id',
		direction: 'DESC'
	}]
});

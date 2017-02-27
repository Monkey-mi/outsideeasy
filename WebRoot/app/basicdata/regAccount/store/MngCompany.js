Ext.define('srm.basicdata.regAccount.store.MngCompany', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.SupplierFile'],
	model: 'srm.supplier.model.SupplierFile',
	proxy: {
		type: 'ajax',
		actionMethods : {     
            read : 'POST'           
        },
		api: {		
			read: 'supplier/supplierFile.do?method=getCompanyForReg'		
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

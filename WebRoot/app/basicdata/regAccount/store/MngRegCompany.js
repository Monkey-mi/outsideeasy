Ext.define('srm.basicdata.regAccount.store.MngRegCompany', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.SupplierFile'],
	model: 'srm.supplierFile.model.SupplierFile',
	proxy: {
		type: 'ajax',
		actionMethods : {     
            read : 'POST'           
        },
		api: {		
			read: 'mngregAccount/reAccountServiceBg.do?method=getRegForCompany'		
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
		direction: 'ASC'
	}]
});

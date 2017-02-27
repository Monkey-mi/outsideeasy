Ext.define('srm.basicdata.taxmanClass.store.TaxmanClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.taxmanClass.model.TaxmanClass'],
	model: 'srm.basicdata.taxmanClass.model.TaxmanClass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'taxmanClass/TaxmanClass.do?method=addTaxmanClass',
			update: 'taxmanClass/TaxmanClass.do?method=updateTaxmanClass',
			read: 'taxmanClass/TaxmanClass.do?method=getTaxmanClassList',
			destroy: 'taxmanClass/TaxmanClass.do?method=deleteTaxmanClass'
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
		property: 'taxman_id',
		direction: 'ASC'
	}]
});

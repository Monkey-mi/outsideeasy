Ext.define('srm.basicdata.currency.store.Currency', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.currency.model.Currency'],
	model: 'srm.basicdata.currency.model.Currency',
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
			create: 'currency/Currency.do?method=addCurrency',
			update: 'currency/Currency.do?method=updateCurrency',
			read: 'currency/Currency.do?method=getCurrencyList',
			destroy: 'currency/Currency.do?method=deleteCurrency'
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
		property: 'currency_id',
		direction: 'ASC'
	}]
});

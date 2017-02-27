Ext.define('srm.supplier.store.MainCustomer', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.MainCustomer'],
	model: 'srm.supplier.model.MainCustomer',
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
			create: 'supplier/mainCustomer.do?method=addMainCustomer',
			update: 'supplier/mainCustomer.do?method=updateMainCustomer',
			read: 'supplier/mainCustomer.do?method=getMainCustomerList',
			destroy: 'supplier/mainCustomer.do?method=deleteMainCustomer'
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
	sorters: [{
		property: 'customer_id',
		direction: 'DESC'
	}]
});

Ext.define('srm.supplierFile.store.AccMainCustomer', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccMainCustomer'],
	model: 'srm.supplierFile.model.AccMainCustomer',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				create: 'supplier/mainCustomer.do?method=addAccMainCustomer',
				update: 'supplier/mainCustomer.do?method=updateAccMainCustomer',
				read: 'supplier/mainCustomer.do?method=getAccMainCustomerList',
				destroy: 'supplier/mainCustomer.do?method=deleteAccMainCustomer'
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
		property: 'customer_id',
		direction: 'ASC'
	}]
});

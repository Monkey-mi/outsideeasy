Ext.define('srm.supplierManager.store.AppMainCustomer', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppMainCustomer'],
	model: 'srm.supplierManager.model.AppMainCustomer',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
	sorter: [{
		property: 'customer_id',
		direction: 'ASC'
	}]
});

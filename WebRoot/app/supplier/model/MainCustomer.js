Ext.define('srm.supplier.model.MainCustomer', {
	extend: 'srm.basic.model.Model',
	idProperty: 'customer_id',
	identifier:'negative',
	fields: [
		{ name: 'customer_id', type: 'int' },
		{ name: 'customer_name' },
		{ name: 'company_id', type: 'int' }
	]
});

/*公司主要客户*/
Ext.define('srm.supplierManager.model.AppMainCustomer', {
	extend: 'Ext.data.Model',
	idProperty: 'customer_id',
	identifier:'negative',
	fields: [
		{ name: 'customer_id', type: 'int' },
		{ name: 'customer_name' },
		{ name: 'company_id', type: 'int' }
	]
});

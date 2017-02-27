/*公司主要客户*/
Ext.define('srm.supplierFile.model.AccMainCustomer', {
	extend: 'Ext.data.Model',
	idProperty: 'customer_id',
	identifier:'negative',
	fields: [
		{ name: 'customer_id', type: 'int' },
		{ name: 'customer_name' },
		{ name: 'company_id', type: 'int' },
		{ name:'supplier_id'}
	]
});

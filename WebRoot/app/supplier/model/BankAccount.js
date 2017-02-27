Ext.define('srm.supplier.model.BankAccount', {
	extend: 'srm.basic.model.Model',
	idProperty: 'account_id',
	identifier:'negative',
	fields: [
		{ name: 'account_id', type: 'int' },
		{ name: 'account_name' },
		{ name: 'account_code'},
		{ name: 'company_id', type: 'int' },
		{ name: 'default_id',type:'boolean'}
	]
});

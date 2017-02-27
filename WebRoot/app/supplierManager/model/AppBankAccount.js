Ext.define('srm.supplierManager.model.AppBankAccount', {
	extend: 'Ext.data.Model',
	idProperty: 'account_id',
	identifier:'negative',
	fields: [
		{ name: 'account_id', type: 'int' },
		{ name: 'account_name' },
		{ name: 'company_id', type: 'int' },
		{ name: 'default_id',type:'boolean' },
		{ name: 'account_code' }
	]
});

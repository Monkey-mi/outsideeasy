Ext.define('srm.basicdata.currency.model.Currency', {
	extend: 'Ext.data.Model',
	idProperty: 'currency_id',
	identifier:'negative',
	fields: [
		{ name: 'currency_id', type: 'int' },
		{ name: 'currency_name' }
	]
});

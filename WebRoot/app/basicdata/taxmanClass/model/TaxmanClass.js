Ext.define('srm.basicdata.taxmanClass.model.TaxmanClass', {
	extend: 'Ext.data.Model',
	identifier:'negative',
	idProperty: 'taxman_id',
	fields: [
		{ name: 'taxman_id', type: 'int' },
		{ name: 'taxman_name' }
	]
});

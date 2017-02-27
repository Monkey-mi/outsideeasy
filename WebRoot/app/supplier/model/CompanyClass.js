Ext.define('srm.supplier.model.CompanyClass', {
	extend: 'srm.basic.model.Model',
	idProperty: 'nature_id',
	identifier:'negative',
	fields: [
		{ name: 'nature_id', type: 'int' },
		{ name: 'nature_name' },
		{ name: 'f_id', type: 'int' }
	]
});

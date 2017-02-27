Ext.define('srm.supplierFile.model.Category', {
	extend: 'Ext.data.Model',
	idProperty: 'category_id',
	identifier:'negative',
	fields: [
		{ name: 'category_id', type: 'int' },
		{ name: 'category_name' },
		{ name: 'f_id' }
	]
});

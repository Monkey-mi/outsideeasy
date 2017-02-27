Ext.define('srm.supplierFile.model.AccCategory', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
	    { name: 'id', type: 'int' },
		{ name: 'category_id', type: 'int' },
		{ name: 'supplier_id' }
	]
});

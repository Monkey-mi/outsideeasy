Ext.define('srm.supplier.model.Metarial', {
	extend: 'srm.basic.model.Model',
	idProperty: 'material_id',
	identifier:'negative',
	fields: [
		{ name: 'material_id', type: 'int' },
		{ name: 'material_name' },
		{ name: 'material_brand' },
		{ name: 'company_id', type: 'int' }
	]
});

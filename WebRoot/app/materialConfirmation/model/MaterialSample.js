Ext.define('srm.materialConfirmation.model.MaterialSample', {
	extend: 'Ext.data.Model',
	idProperty: 'sample_id',
	identifier:'negative',
	fields: [
		{ name: 'sample_id', type: 'int' },
		{ name: 'confirmation_id', type: 'int' },
		{ name: 'material_name' },
		{ name: 'material_num', type: 'float' },
		{ name: 'version' },
		{ name: 'customer_name' },
		{ name: 'product_name' },
		{ name: 'haskey_point', type: 'int' },
		{ name: 'key_point' },
		{ name: 'createon', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

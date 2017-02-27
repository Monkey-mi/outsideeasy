Ext.define('srm.supplier.model.MaterialClass', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'mc_id',
	fields: [
		{ name: 'mc_id', type: 'int' },
		{ name: 'mc_name' },
		{ name: 'f_id', type: 'int' },
		{ name: 'level_id', type: 'int' },
		{ name: 'leaf' }
	]
});

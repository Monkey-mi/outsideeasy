Ext.define('srm.materialConfirmation.model.MaterialCheckclass', {
	extend: 'Ext.data.Model',
	idProperty: 'checkclass_id',
	identifier:'negative',
	fields: [
		{ name: 'checkclass_id', type: 'int' },
		{ name: 'checkclass_name' }
	]
});

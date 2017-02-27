Ext.define('srm.templet.model.MngTempletElementType', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'e_type_id',
	fields: [
		{ name: 'e_type_id', type: 'int' },
		{ name: 'type_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

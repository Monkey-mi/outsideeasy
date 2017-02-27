Ext.define('srm.templet.model.MngTempletElemnetControllType', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'controller_type_id',
	fields: [
		{ name: 'controller_type_id', type: 'int' },
		{ name: 'controller_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

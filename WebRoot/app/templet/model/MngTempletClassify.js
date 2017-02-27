Ext.define('srm.templet.model.MngTempletClassify', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'classify_id',
	fields: [
		{ name: 'classify_id', type: 'int' },
		{ name: 'classify_name' },
		{ name: 'h_id', type: 'int' },
		{ name: 'table_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

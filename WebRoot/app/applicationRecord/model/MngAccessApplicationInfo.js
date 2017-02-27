Ext.define('srm.applicationRecord.model.MngAccessApplicationInfo', {
	extend: 'Ext.data.Model',
	idProperty: 'info_id',
	fields: [
		{ name: 'info_id', type: 'int' },
		{ name: 'templet_id', type: 'int' },
		{ name: 'record_id', type: 'int' },
		{ name: 'content' },
		{ name: 'templet_name' },	
		{ name: 'classify_name' },		
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

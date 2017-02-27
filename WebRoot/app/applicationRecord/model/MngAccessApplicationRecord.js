Ext.define('srm.applicationRecord.model.MngAccessApplicationRecord', {
	extend: 'Ext.data.Model',
	idProperty: 'record_id',
	identifier:'negative',
	fields: [
		{ name: 'record_id', type: 'int' },
		{ name: 'submit_id', type: 'int' },
		{ name: 'receive_id', type: 'int' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'access_status', type: 'int' },
		{ name: 'receive_invite_id', type: 'int' },		
		{ name: 'submit_name'},
		{ name: 'receive_name'},
		{ name: 'h_id', type: 'int' }
	]
});

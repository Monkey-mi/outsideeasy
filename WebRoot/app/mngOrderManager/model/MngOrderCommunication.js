Ext.define('srm.mngOrderManager.model.MngOrderCommunication', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'bus_id', type: 'int' },
		{ name: 'parent_id', type: 'int' },
		{ name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'cp_name' },
		{ name: 'com_message' },
		{ name: 'module_type', type: 'int' },
		{ name: 'is_look', type: 'int' }
	]
});

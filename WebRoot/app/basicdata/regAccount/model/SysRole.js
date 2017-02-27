Ext.define('srm.basicdata.regAccount.model.SysRole', {
	extend: 'Ext.data.Model',
	idProperty: 'role_id',
	fields: [
		{ name: 'role_id', type: 'int' },
		{ name: 'role_name' },
		{ name: 'role_desc' },
		{ name: 'order_seq', type: 'int' },
		{ name: 'role_type', type: 'int' },
		{ name: 'is_select', type: 'int' }	
	]
});

Ext.define('srm.sysmodule.model.SysRole', {
	extend: 'Ext.data.Model',
	idProperty: 'role_id',
	identifier:'negative',
	fields: [
		{ name: 'role_id', type: 'int' },
		{ name: 'role_name' },
		{ name: 'role_desc' },
		{ name: 'order_seq', type: 'int' },
		{name:'is_enable',type:'int'},
		{name:'role_type',type:'int'}
	]
});

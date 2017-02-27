Ext.define('srm.sysmodule.model.SysRoleAuthority', {
	extend: 'Ext.data.Model',
	idProperty: 'ra_id',
	identifier:'negative',
	fields: [
		{ name: 'ra_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'class_id', type: 'int' }
	]
});

Ext.define('srm.sysmodule.model.SysRolePage', {
	extend: 'Ext.data.Model',
	idProperty: 'rp_id',
	identifier:'negative',
	fields: [
		{ name: 'rp_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'authority_id', type: 'int' }
	]
});

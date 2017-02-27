Ext.define('srm.sysmodule.model.SysRolePageFunc', {
	extend: 'Ext.data.Model',
	idProperty: 'rf_id',
	identifier:'negative',
	fields: [
		{ name: 'rf_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'f_id', type: 'int' }
	]
});

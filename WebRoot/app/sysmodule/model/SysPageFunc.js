Ext.define('srm.sysmodule.model.SysPageFunc', {
	extend: 'Ext.data.Model',
	idProperty: 'f_id',
	identifier:'negative',
	fields: [
		{ name: 'f_id', type: 'int' },
		{ name: 'authority_id', type: 'int' },
		{ name: 'code' },
		{ name: 'name' },
		{ name: 'order_seq', type: 'int' }
	]
});

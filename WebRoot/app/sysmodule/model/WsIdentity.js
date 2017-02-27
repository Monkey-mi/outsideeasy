Ext.define('srm.sysmodule.model.WsIdentity', {
	extend: 'Ext.data.Model',
	idProperty: 'ws_id',
	identifier:'negative',
	fields: [
		{ name: 'ws_id', type: 'int' },
		{ name: 'identify' },
		{ name: 'psw' },
		{ name: 'remark' },
		{ name:'company_id'},
		{ name:'company_name'},
		{ name: 'enabled', type: 'int' }
	]
});

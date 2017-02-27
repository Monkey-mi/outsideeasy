Ext.define('srm.basicdata.regAccount.model.MngAccountCount', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'u_id',
	fields: [
		{ name: 'u_id', type: 'int' },
		{ name: 'name' },
		{ name: 'type', type: 'int' },	
		{ name: 'login_time' ,type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'session_id' }
	]
});
Ext.define('srm.platformdata.mngIp.model.IpAddress', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'adress_id',
	fields: [
		{ name: 'adress_id', type: 'int' },
		{ name: 'login_id' },
		{ name: 'ip_address' },
		{ name: 'ip_state', type: 'int' },
		{ name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name:'oo'}
		
	]
});

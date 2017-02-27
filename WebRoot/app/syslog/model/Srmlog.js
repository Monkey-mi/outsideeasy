Ext.define('srm.syslog.model.Srmlog', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'logid',
	fields: [
		{ name: 'logid', type: 'int' },
		{ name: 'clientip' },
		{ name: 'logdtm' , type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'login_id' },
		{ name: 'mod_id', type: 'int' },
		{ name: 's_name' },
		{ name: 'mod_name' },
		{ name: 's_name' },
		{ name: 's_path' },
		{ name: 's_data' },
		{ name: 'request_html'},
		{ name: 'error_message'},
		{name:'oo'}	
	]
});
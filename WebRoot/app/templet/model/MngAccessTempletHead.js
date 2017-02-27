Ext.define('srm.templet.model.MngAccessTempletHead', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'h_id',
	fields: [
		{ name: 'h_id', type: 'int' },
		{ name: 'table_name' },
		{ name: 'owner', type: 'int' },
		{ name: 'version', type: 'int' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'cpyname_cn'},
		{name:'oo'}
	]
});

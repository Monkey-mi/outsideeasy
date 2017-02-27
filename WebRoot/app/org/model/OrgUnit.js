Ext.define('srm.org.model.OrgUnit', {
	extend: 'Ext.data.Model',
	idProperty: 'ou_id',
	fields: [
		{ name: 'ou_id', type: 'int' },
		{ name: 'ou_code' },
		{ name: 'ou_name' },
		{ name: 'ou_alias' },
		{ name: 'ou_address' },
		{ name: 'ou_leader' },
		{ name: 'ou_type' },
		{ name: 'ou_parentid', type: 'int' },
		{ name: 'creator' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'create_ou' },
		{ name: 'del_flg', type: 'int' }
	]
});

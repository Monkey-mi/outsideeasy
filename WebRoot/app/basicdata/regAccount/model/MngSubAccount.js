Ext.define('srm.basicdata.regAccount.model.MngSubAccount', {
    extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'sa_id',
	fields: [
		{ name: 'sa_id', type: 'int' },
		{ name: 'org_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'reg_id', type: 'int' },
		{ name: 'sa_names' },
		{ name: 'sa_name' },
		{ name: 'name' },
		{ name: 'sa_password' },
		{ name: 'enabled', type: 'int' },
		{ name: 'create_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'username' },
		{ name: 'phone' },
		{ name: 'role_name' },
		{ name: 'last_login_ip' },
		{ name: 'emp_no' },
		{ name: 'is_delete', type: 'int' }
	]
});

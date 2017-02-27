Ext.define('srm.basicdata.regAccount.model.MngRegAccout', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'reg_id',
	fields: [
		{ name: 'reg_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'acc_name' },
		{ name:'re_password'},
		{ name: 'password' },
		{ name: 'reg_email' },
		{ name: 'reg_phone' },
		{ name: 'reg_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'enabled', type: 'int' },
		{ name: 'update_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'email_valid', type: 'int' },
		{ name: 'last_login_ip' },
		{ name: 'role_name' },
		{ name: 'cpyname_cn' }
	]
});

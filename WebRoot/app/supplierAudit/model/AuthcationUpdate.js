Ext.define('srm.supplierAudit.model.AuthcationUpdate', {
	extend: 'Ext.data.Model',
	idProperty: 'auth_update_id',
	identifier:'negative',
	fields: [
		{ name: 'auth_update_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'class_id' },
		{ name: 'nature_id' },
		{ name: 'key_remark' },
		{ name: 'cpyname_cn' },
		{ name: 'account' },
		{ name: 'industry_id', type: 'int' },
		
		{ name: 'corporation' },
		{ name: 'reg_fund', type: 'float' },
		{ name: 'currency_id', type: 'int' },
		{ name: 'establish_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'created_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'state', type: 'int' },
		{ name: 'auth_opinion' },
		{ name: 'account' }
	]
});

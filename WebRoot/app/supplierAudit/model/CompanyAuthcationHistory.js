Ext.define('srm.supplierAudit.model.CompanyAuthcationHistory', {
	extend: 'Ext.data.Model',
	idProperty: 'auth_history_id',
	identifier:'negative',
	fields: [
		{ name: 'auth_history_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'class_id' },
		{ name: 'nature_id' },
		{ name: 'key_remark' },
		{ name: 'cpyname_cn' },
		
		{ name: 'industry_id', type: 'int' },
		
		{ name: 'corporation' },
		{ name: 'reg_fund', type: 'float' },
		{ name: 'currency_id', type: 'int' },
		{ name: 'establish_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'created_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		
	]
});

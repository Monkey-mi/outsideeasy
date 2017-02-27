Ext.define('srm.basicdata.regAccount.model.SupplierFiles', {
	extend: 'Ext.data.Model',
	idProperty: 'supplier_id',
	fields: [
		{ name: 'supplier_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'record_id', type: 'int' },
		{ name: 'supplier_cpyname' },
		{ name: 'file_status', type: 'int' },
		{ name: 'no_check', type: 'int' },
		{ name: 'no_checkor_id', type: 'int' },
		{ name: 'no_checkor' },
		{ name: 'no_check_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'is_auth_updated', type: 'int' },
		{ name: 'auth_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'source_type', type: 'int' },
		{ name: 'is_delete', type: 'int' },
		{ name: 'is_select' }	
	]
});

Ext.define('srm.supplierAudit.model.CompanyAuthAttachedHistory', {
	extend: 'Ext.data.Model',
	idProperty: 'attached_id',
	identifier:'negative',
	fields: [
		{ name: 'attached_id', type: 'int' },
		{ name: 'auth_history_id', type: 'int' },
		{ name: 'file_type_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'file_format' },
		{ name: 'remark' },
		{ name: 'object_id' },
		{ name: 'company_id', type: 'int' }
	]
});

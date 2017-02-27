//附件，公司证照
Ext.define('srm.supplierAudit.model.Attched', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'file_type_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'file_path' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'file_format' },
		{ name: 'ismust', type: 'int' },
		{ name: 'remark' },
		{ name: 'iscustom', type: 'int' },
		{ name: 'mogodb_id' }
	]
});

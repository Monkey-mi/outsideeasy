Ext.define('srm.supplierFile.model.SupplierCheckfactoryReport', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'remark' },
		{ name: 'mogodb_id' },
		{ name: 'check_score', type: 'float' },
		{ name: 'supplier_id', type: 'int' },
		{ name: 'source_type', type: 'int' },
		{ name: 'operator_id', type: 'int' },
		{ name: 'operator_name' },
		{ name: 'check_factory_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'send_company_id', type: 'int' },
		{ name: 'checkor' }
	]
});

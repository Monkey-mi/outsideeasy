Ext.define('srm.supplierFile.model.MngSupplierMaterialcheck', {
	extend: 'Ext.data.Model',
	idProperty: 'materialcheck_id',
	fields: [
		{ name: 'materialcheck_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'remark' },
		{ name: 'mogodb_id' },
		{ name: 'supplier_id', type: 'int' },
		{ name: 'source_type', type: 'int' },
		{ name: 'operator_id', type: 'int' },
		{ name: 'operator_name' },
		{ name: 'send_company_id', type: 'int' }
	]
});

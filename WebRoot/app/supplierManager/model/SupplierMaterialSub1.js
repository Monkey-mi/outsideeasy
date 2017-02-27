Ext.define('srm.supplierManager.model.SupplierMaterialSub1', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'mc_id', type: 'int' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'company_id', type: 'int' }
	]
});

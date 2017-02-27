Ext.define('srm.supplierAccess.model.SupplierAccessUploadImg', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'file_id', type: 'int' },
		{ name: 'score_id', type: 'int' },
		{ name: 'file_path' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

Ext.define('srm.materialConfirmation.model.MaterialCheckDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'check_id',
	identifier:'negative',
	fields: [
		{ name: 'check_id', type: 'int' },
		{ name: 'check_order', type: 'int' },
		{ name: 'check_item' },
		{ name: 'check_request' },
		{ name: 'check_report' },
		{ name: 'check_result', type: 'int' },
		{ name: 'check_person' },
		{ name: 'chec_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'checkclass_id', type: 'int' },
		{ name: 'sample_id', type: 'int' },
		{name:'material_name'},
		{name:'remark'}
	]
});

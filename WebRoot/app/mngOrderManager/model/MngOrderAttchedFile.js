Ext.define('srm.mngOrderManager.model.MngOrderAttchedFile', {
	extend: 'Ext.data.Model',
	idProperty: 'order_attched_id',
	fields: [
		{ name: 'order_attched_id', type: 'int' },
		{ name: 'pur_order_id', type: 'int' },
		{ name: 'order_bh' },
		{ name: 'order_attched_name' },
		{ name: 'ft_id', type: 'int' },
		{ name: 'suffix_name' },
		{ name: 'order_attched_remark' },
		{ name: 'mogodb_id' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'source_type', type: 'int' },
		{ name: 'creator_id', type: 'int' },
		{ name: 'creator_name' },
		{ name: 'status', type: 'int' },
		{ name: 'is_look', type: 'int' },
		{ name: 'view_no' },
		{ name: 'type_name' }
	]
});

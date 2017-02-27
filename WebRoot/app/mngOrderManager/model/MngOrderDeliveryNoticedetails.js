Ext.define('srm.mngOrderManager.model.MngOrderDeliveryNoticedetails', {
	extend: 'Ext.data.Model',
	idProperty: 'details_id',
	fields: [
		{ name: 'details_id', type: 'int' },
		{ name: 'delivery_notice_id', type: 'int' },
		{ name: 'order_detail_id', type: 'int' },
		{ name: 'notice_delivery_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'confirm_delivery_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'number', type: 'int' },
		{ name: 'pur_order_id', type: 'int' },
		{ name: 'notice_status', type: 'int' },
		{ name: 'notice_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'delivery_address' },
		{ name: 'delivery_notice_bh' },
		{ name: 'product_name' },
		{ name: 'product_artno' },
		{ name: 'product_size' },
		{ name: 'unit' },
		{ name: 'htmx' },
		{ name: 'is_edit' , type: 'int' },
		{ name: 'htbh',type: 'int' },
		{ name: 'htxh',type: 'int' },
		{ name: 'clhh' },
		{ name: 'is_modified', type: 'int'  },
		{ name: 'order_bh'}

	]
});

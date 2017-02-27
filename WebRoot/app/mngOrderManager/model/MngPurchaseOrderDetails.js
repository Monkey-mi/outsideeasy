Ext.define('srm.mngOrderManager.model.MngPurchaseOrderDetails', {
	extend: 'Ext.data.Model',
	idProperty: 'order_detail_id',
	fields: [
		{ name: 'order_detail_id', type: 'int' },
		{ name: 'pur_order_id', type: 'int' },
		{ name: 'product_name' },
		{ name: 'product_size' },
		{ name: 'unit_price', type: 'float' },
		{ name: 'number', type: 'int' },
		{ name: 'unit' },
		{ name: 'money', type: 'float' },
		{ name: 'delivery_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'delivery_num', type: 'int' },
		{ name: 'Storage_num', type: 'int' },
		{ name: 'no_delivery_num', type: 'int' },
		{ name: 'htmx' },
		{ name: 'product_artno' },
		{ name: 'remark' },
		{ name: 'clhh' }
	]
});

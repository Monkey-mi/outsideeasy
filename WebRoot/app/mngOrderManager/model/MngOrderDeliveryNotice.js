Ext.define('srm.mngOrderManager.model.MngOrderDeliveryNotice', {
	extend: 'Ext.data.Model',
	idProperty: 'delivery_notice_id',
	fields: [
		{ name: 'delivery_notice_id', type: 'int' },
		{ name: 'delivery_notice_bh' },
		{ name: 'notice_status', type: 'int' },
		{ name:'notice_dt', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'source_type', type: 'int' },
		{ name: 'creator_id', type: 'int' },
		{ name: 'creator_name' },
		{ name: 'pur_company_id', type: 'int' },
		{ name: 'sup_company_id', type: 'int' },
		{ name: 'supplier_id', type: 'int' },
		{ name: 'update_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{name:'send_cpyname_cn'},
	    {name:'receive_cpyname_cn'}
	]
});

Ext.define('srm.mngOrderManager.model.MngOrderRequirement', {
	extend: 'Ext.data.Model',
	idProperty: 'order_req_id',
	fields: [
		{ name: 'order_req_id', type: 'int' },
		{ name: 'pur_order_id', type: 'int' },
		{ name: 'order_bh' },
		{ name: 'req_text' },
		{ name: 'source_type', type: 'int' },
		{ name: 'creator_id', type: 'int' },
		{ name: 'creator_name'},
		{ name: 'contract_terms' }
	]
});

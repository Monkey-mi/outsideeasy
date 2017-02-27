Ext.define('srm.mngOrderManager.model.MngOrderAgreementFile', {
	extend: 'Ext.data.Model',
	idProperty: 'agreement_id',
	fields: [
		{ name: 'agreement_id', type: 'int' },
		{ name: 'pur_order_id', type: 'int' },
		{ name: 'agreement_bh' },
		{ name: 'agreement_status', type: 'int' },
		{ name: 'agreement_name' },
		{ name: 'mogodb_id' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'creator_id', type: 'int' },
		{ name: 'creator_name' },
		{ name: 'source_type', type: 'int' },
		{ name: 'suffix_name' }
	]
});

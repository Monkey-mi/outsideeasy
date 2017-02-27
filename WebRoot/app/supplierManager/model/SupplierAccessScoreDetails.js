Ext.define('srm.supplierManager.model.SupplierAccessScoreDetails', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'score_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'item_id', type: 'int' },
		{ name: 'item_fid', type: 'int' },
		{ name: 'assess_score', type: 'float' },
		{ name: 'score1', type: 'float' },
		{ name: 'score2', type: 'float' },
		{ name: 'score3', type: 'float' },
		{ name: 'score4', type: 'float' },
		{ name: 'item_name' },
		{ name: 'fitem_name' },
		{ name: 'fitem_fid', type: 'int' },
		{ name: 'weightValue', type: 'float' },
		{ name: 'assess_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'plan_assess_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'version_id', type: 'int' },
		{ name: 'point_analyze' },
		{ name: 'improve_act' },
		{ name: 'responsible_person' },
		{ name: 'assess_person' },
		{ name: 'item_description' }
	]
});

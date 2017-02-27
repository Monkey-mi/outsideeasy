/*新供应商准入细则评估打分表*/
Ext.define('srm.supplierAccess.model.SupplierAccessScore', {
	extend: 'Ext.data.Model',
	idProperty: 'score_id',
	identifier:'negative',
	fields: [
		{ name: 'score_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'item_id', type: 'int' },
		{ name: 'item_fid', type: 'int' },
		{ name: 'assess_score', type: 'float' },
		{ name: 'assess_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'plan_assess_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'version_id', type: 'int' },
		{ name: 'assess_view1' },
		{ name: 'assess_view2' },
		{ name: 'point_analyze' },
		{ name: 'improve_act' },
		{ name: 'responsible_person' },
		{ name: 'assess_person' },
		
		{ name: 'item_description' },
		{name:'assess_view1'}
	]
});

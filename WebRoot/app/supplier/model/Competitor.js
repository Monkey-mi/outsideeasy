Ext.define('srm.supplier.model.Competitor', {
	extend: 'srm.basic.model.Model',
	idProperty: 'competitor_id',
	identifier:'negative',
	fields: [
		{ name: 'competitor_id', type: 'int' },
		{ name: 'competitor_name' },
		{ name: 'company_id', type: 'int' }
	]
});

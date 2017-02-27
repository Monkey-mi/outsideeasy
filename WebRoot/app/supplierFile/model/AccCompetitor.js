Ext.define('srm.supplierFile.model.AccCompetitor', {
	extend: 'Ext.data.Model',
	idProperty: 'competitor_id',
	identifier:'negative',
	fields: [
		{ name: 'competitor_id', type: 'int' },
		{ name: 'competitor_name' },
		{ name: 'company_id', type: 'int' },
		{ name:'supplier_id'},
		
	]
});

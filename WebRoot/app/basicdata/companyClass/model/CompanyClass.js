Ext.define('srm.basicdata.companyClass.model.CompanyClass', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'nature_id',
	fields: [
		{ name: 'nature_id', type: 'int' },
		{ name: 'nature_name' },
		{ name: 'f_id', type: 'int' },
		{ name:'oo'}
	]
});

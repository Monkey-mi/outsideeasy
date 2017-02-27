Ext.define('srm.basicdata.sFilter.model.SFilter', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'filter_id',
	fields: [
		{ name: 'filter_id', type: 'int' },
		{ name: 'filter_url' },
		{ name: 'remark' },
		{ name:'oo'}
	]
});

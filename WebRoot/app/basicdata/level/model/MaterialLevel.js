Ext.define('srm.basicdata.level.model.MaterialLevel', {
	extend: 'srm.basic.model.Model',
	idProperty: 'level_id',
	identifier:'negative',
	fields: [
		{ name: 'level_id', type: 'int' },
		{ name: 'level_name' },
		
		{ name:'oo'}
	]
});

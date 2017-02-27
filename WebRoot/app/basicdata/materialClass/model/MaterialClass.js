Ext.define('srm.basicdata.materialClass.model.MaterialClass', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'mc_id',
	fields: [
		{ name: 'mc_id', type: 'int' },
		{ name: 'mc_name' },
		{ name:'leaf'},
		{ name: 'f_id', type: 'int' },
		{ name: 'level_id', type: 'int' },
		{ name:'oo'},
		{name:'is_archive',type:'boolean'}
	]
});

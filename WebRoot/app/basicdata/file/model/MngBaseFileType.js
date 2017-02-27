Ext.define('srm.basicdata.file.model.MngBaseFileType', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'ft_id',
	fields: [
		{ name: 'ft_id', type: 'int' },
		{ name: 'type_name' },
		{ name: 'f_id', type: 'int' },
		{ name: 'leaf' },
		{name:'oo'}
	]
});

Ext.define('srm.templet.model.MngAccessTempletElement', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'e_id',
	fields: [
		{ name: 'e_id', type: 'int' },
		{ name: 'e_name' },
		{ name: 'e_type_id', type: 'int' },
		{ name: 'controller_type_id', type: 'int' },
		{ name: 'validate_type', type: 'int' },
		{ name: 'validate_text' },
		{ name: 'e_length', type: 'int' },
		{ name: 'e_decimal_length', type: 'int' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'e_name' },
		{ name: 'classify_name' },		
		{name:'oo'}
	]
});

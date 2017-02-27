Ext.define('srm.codegen.model.CgrDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'cgr_id', type: 'int' },
		{ name: 'code' },
		{ name: 'field_code'},
		{ name: 'data_type' },
		{ name: 'fixed_text' },
		{ name: 'date_format' },
		{ name: 'uparam_type' },
		{ name: 'len', type: 'int' },
		{ name: 'is_substr' },
		{ name: 'sub_start', type: 'int' },
		{ name: 'sub_end', type: 'int' },
		{ name: 'fill_char' },
		{ name: 'is_fillafter' },
		{ name: 'seed', type: 'int' },
		{ name: 'step', type: 'int' },
		{ name: 'step_jmp', type: 'int' },
		{ name: 'min_value', type: 'int' },
		{ name: 'max_value', type: 'int' },
		{ name: 'reset_mode' },
		{ name: 'order_seq', type: 'int' }
	]
});

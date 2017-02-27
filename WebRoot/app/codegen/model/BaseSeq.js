Ext.define('srm.codegen.model.BaseSeq', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'cgr_id', type: 'int' },
		{ name: 'inst_code' },
		{ name: 'seed', type: 'int' },
		{ name: 'step', type: 'int' },
		{ name: 'step_jmp', type: 'int' },
		{ name: 'min_value', type: 'int' },
		{ name: 'max_value', type: 'int' },
		{ name: 'jmp_value', type: 'int' },
		{ name: 'jmp_len', type: 'int' },
		{ name: 'reset_mode' },
		{ name: 'last_update', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

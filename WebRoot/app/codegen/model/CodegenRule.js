Ext.define('srm.codegen.model.CodegenRule', {
	extend: 'Ext.data.Model',
	idProperty: 'cgr_id',
	identifier:'negative',
	fields: [
		{ name: 'cgr_id', type: 'int' },
		{ name: 'code' },
		{ name: 'name' },
		{ name: 'len', type: 'int' },
		{ name: 'is_valid',type:'boolean' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'creator' }
	]
});

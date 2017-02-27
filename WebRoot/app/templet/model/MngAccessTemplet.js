Ext.define('srm.templet.model.MngAccessTemplet', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'templet_id',
	fields: [
		{ name: 'templet_id', type: 'int' },
		{ name: 'h_id', type: 'int' },
		{ name: 'e_id', type: 'int' },
		{ name: 'is_must', type: 'int' },
		{ name: 'order_by', type: 'int' },
		{ name: 'classify_id', type: 'int' },
		{ name: 'templet_name' },
		{ name: 'seize_length', type: 'int' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{name:'oo'}
	]
});

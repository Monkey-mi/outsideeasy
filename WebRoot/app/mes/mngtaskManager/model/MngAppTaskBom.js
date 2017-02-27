Ext.define('srm.mes.mngtaskManager.model.MngAppTaskBom', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'tb_id',
	fields: [
		{ name: 'tb_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'order_no', type: 'int' },
		{ name: 'material' },
		{ name: 'consumption', type:'float' },
		{ name: 'total_consumption', type:'float' },
		{ name: 'unit' },
		{name:'oo'}
	]
});

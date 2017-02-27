Ext.define('srm.mes.mngtaskManager.model.MngAppQc', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'qc_id',
	fields: [
		{ name: 'qc_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'record_id', type: 'int' },
		{ name: 'qc_goods' },
		{ name: 'qc_operator' },
		{ name: 'unqualified_no', type:'float' },
		{ name: 'qc_remark' },
		{ name: 'is_product' },
		{ name: 'qc_file' },
		{ name: 'qc_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qc_count',  type: 'float'},
		{ name: 'send_id' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{name:'oo'}
	]
});

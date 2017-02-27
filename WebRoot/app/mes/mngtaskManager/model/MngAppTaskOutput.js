Ext.define('srm.mes.mngtaskManager.model.MngAppTaskOutput', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'record_id',
	fields: [
		{ name: 'record_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'scrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'worker_no', type: 'float' },
		{ name: 'work_time', type: 'float' },
		{ name: 'yield_qty', type: 'float' },
		{ name:'sec_id',type:'int'},
		{ name:'create_dt', type: 'date',dateFormat: 'Y-m-d H:i:s' },
		{ name:'locked',type:'int'},
		{ name:'section_name'},
		{ name:'oo'}
	]
});

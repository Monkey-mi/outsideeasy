Ext.define('srm.mes.mngtaskManager.model.MngAppTaskProcess', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'tp_id',
	fields: [
		{ name: 'tp_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'process_name' },
		{ name: 'order_no', type: 'int' },
		{ name: 'stand_time', type: 'float' },
		{ name: 'sec_id', type: 'float' },
		{name:'qty',type: 'float' },
		{name:'patter'},
		{name:'mjbz'},
		{name:'section_name'},
		{name:'oo'}
	]
});

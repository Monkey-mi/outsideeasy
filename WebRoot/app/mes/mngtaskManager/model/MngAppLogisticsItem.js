Ext.define('srm.mes.mngtaskManager.model.MngAppLogisticsItem', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'item_id',
	fields: [
		{ name: 'item_id', type: 'int' },
		{ name: 'record_id', type: 'int' },
		{ name: 'goods_name' },
		{ name: 'deliver_no', type:'float' },
		{ name: 'arrived_no', type:'float' },
		{ name: 'receive_no', type:'float' },
		{ name: 'receive_time',type:'float'},
		{ name: 't_id', type:'int' },
		{ name: 'qc_state', type:'int' },		
		{name:'oo'}
	]
});

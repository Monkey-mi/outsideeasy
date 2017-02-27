Ext.define('srm.mes.mngtaskManager.model.MngAppTaskFile', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'tf_id',
	fields: [
		{ name: 'tf_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'file_type', type: 'int' },
		{ name: 'object_id' },
		{ name: 'order_no', type: 'int' },
		{ name: 'type_name' },	
		{ name: 'file_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'remark'},
		{ name: 'suffix_name'},
		{ name: 'view_no'},     
		{ name: 'record_id',type: 'int'},    
		{ name: 'operator_name'},      
		{ name: 'is_delete',type: 'int'},     		       
		{name:'oo'}
	]
});

Ext.define('srm.mes.mngtaskManager.model.MngAppTask', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 't_id',
	fields: [
		{ name: 't_id', type: 'int' },
		{ name: 'rwdh' },
		{ name: 'product_name' },
		{ name: 'serial_no' },
		{ name: 'state', type: 'int' },
		{ name: 'send_company', type: 'int' },
		{name : 'send_cpyname_cn'},//账号所关联的公司名称
		{name : 'receive_cpyname_cn'},//账号所关联的公司名称
		{ name: 'receive_company', type: 'int' },
		{ name: 'total_qty', type: 'float' },
		{ name: 'produced_qty', type: 'float' },
		{ name: 'confirmed_qty', type: 'float' },
		{ name: 'plan_start', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'plan_complete', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qc_type' },
		{ name: 'product_pic' },
		{ name: 'czsj' , type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'stopreason' },
		{ name: 'send_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'receive_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'finish_product_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'finish_task_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qualified_qty' , type: 'float'},
		{ name: 'stop_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'remark' },
		{ name: 'operator_file' },
		{ name: 'confirmed_qtyVo', type: 'float'  },
		{ name: 'sendout_qty' , type: 'float' },
		{ name: 'UUID' },
		{ name: 'ddh' },
		{ name: 'is_delete', type: 'int'  },
		{name:'oo'}
	]
});

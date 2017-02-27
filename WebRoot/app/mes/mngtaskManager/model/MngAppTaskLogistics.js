Ext.define('srm.mes.mngtaskManager.model.MngAppTaskLogistics', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'record_id',
	fields: [
		{ name: 'record_id', type: 'int' },
		{ name: 't_id', type: 'int' },
		{ name: 'tpye' },
		{ name: 'start_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'licence_plate' },
		{ name: 'driver' },
		{ name: 'phone_number' },
		{ name: 'confirm_state'},
		{ name: 'remark' },
		{ name: 'order' },
		{ name: 'send_id' },
		{ name: 'send_conpany' },
		{ name:  'send_count',  type: 'float'},
		{ name: 'confirm_dt' , type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'create_dt' , type: 'date', dateFormat: 'Y-m-d H:i:s'},		 	       
		{name:'oo'}
	]
});

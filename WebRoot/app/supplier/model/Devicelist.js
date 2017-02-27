Ext.define('srm.supplier.model.Devicelist', {
	extend: 'srm.basic.model.Model',
	idProperty: 'device_id',
	identifier:'negative',
	fields: [
		{ name: 'device_id', type: 'int' },
		{ name: 'device_name' },
		{ name: 'company_id', type: 'int' },
		{ name: 'format' },
		{ name: 'place' },
		{ name: 'price', type: 'float' },
		{ name: 'buy_day', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'advanced' },
		{name:'device_num', type:'int'}
	]
});

/*主要设备明细*/
Ext.define('srm.supplierFile.model.AccDevicelist', {
	extend: 'Ext.data.Model',
	idProperty: 'device_id',
	identifier:'negative',
	fields: [
		{ name: 'device_id', type: 'int' },
		{ name: 'device_name' },
		{ name: 'company_id', type: 'int' },
		{ name: 'specifications' },
		{ name: 'place' },
		{ name: 'price', type: 'float' },
		{ name: 'buy_day', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'advanced' },
		{name:'device_num', type:'int'},
		{ name:'supplier_id'}
	]
});

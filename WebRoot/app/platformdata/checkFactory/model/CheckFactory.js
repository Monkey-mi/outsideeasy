Ext.define('srm.platformdata.checkFactory.model.CheckFactory', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'factory_cycle_id',
	fields: [
		{ name: 'factory_cycle_id', type: 'int' },
		{ name: 'factory_cycle_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

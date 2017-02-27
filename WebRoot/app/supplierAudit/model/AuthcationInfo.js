Ext.define('srm.supplierAudit.model.AuthcationInfo', {
	extend: 'Ext.data.Model',
	idProperty: 'auth_id',
	identifier:'negative',
	fields: [
		{ name: 'auth_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'auth_state', type: 'int' },
		{ name: 'auth_opinion' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

Ext.define('srm.templet.model.MngCompanyName', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty: 'company_id',
	fields: [
        { name: 'company_id' ,type: 'int'},
		{ name: 'cpyname_cn' }	,
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
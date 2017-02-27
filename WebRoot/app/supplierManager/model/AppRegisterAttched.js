/*公司注册附件表*/
Ext.define('srm.supplierManager.model.AppRegisterAttched', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'file_path' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'file_format' },
		{ name: 'ismust', type:'boolean' },
		{ name: 'remark' },
		{name:'iscustom',type:'boolean'}
		/*{ name: 'db_TYPE' },
		{ name: 'row_permit' }*/
	]
});

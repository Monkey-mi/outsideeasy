Ext.define('srm.mngWebPublish.model.WebContentModule', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'module_id', type: 'int' },
		{ name: 'content_type', type: 'int' },
		{ name: 'module_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});

Ext.define('srm.mngWebPublish.model.WebContent', {
	extend: 'Ext.data.Model',
	idProperty: 'web_id',
	fields: [
		{ name: 'web_id', type: 'int' },
		{ name: 'web_title' },
		{ name: 'content' },
		{ name: 'content_abstract' },
		{ name: 'creator' },
		{ name: 'signed_release' },
		{ name: 'content_type', type: 'int'  },
		{ name: 'module_id', type: 'int'  },
		{ name: 'module_name' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'update_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
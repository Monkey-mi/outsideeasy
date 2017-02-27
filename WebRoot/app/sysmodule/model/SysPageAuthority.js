Ext.define('srm.sysmodule.model.SysPageAuthority', {
	extend: 'Ext.data.Model',
	idProperty: 'authority_id',
	identifier:'negative',
	fields: [
		{ name: 'authority_id', type: 'int' },
		{ name: 'class_id', type: 'int' },
		{ name: 'page_name' },
		{ name: 'page_path'},
		{ name: 'enable' },
		{ name: 'remark' },
		{ name: 'is_menu_page',type:'int'},
		{ name: 'order_seq', type: 'int' }
	]
});

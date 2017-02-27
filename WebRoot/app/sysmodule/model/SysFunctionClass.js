Ext.define('srm.sysmodule.model.SysFunctionClass', {
	extend: 'Ext.data.Model',
	idProperty: 'class_id',
	identifier:'negative',
	fields: [
		{ name: 'class_id', type: 'int' },
		{ name: 'class_name' },
		{ name: 'parentId', type: 'int' },
		{ name: 'isvalid' },
		{ name: 'order_seq', type: 'int' },
		{ name: 'isParent' },
		{ name: 'remark' }
	]
});

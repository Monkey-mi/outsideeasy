Ext.define('srm.basicdata.regAccount.model.MngOrganization', {
	extend: 'Ext.data.Model',
	idProperty: 'org_id',
	fields: [
		{ name: 'org_id', type: 'int' },
		{ name: 'name' },
		{ name: 'parentId', type: 'int' },
		{ name: 'isvalid' },
		{ name: 'isParent' },
		{ name: 'reg_id', type: 'int' }
	]
});

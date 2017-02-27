Ext.define('srm.sysmodule.store.SysRoleAuthority', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysRoleAuthority'],
	model: 'srm.sysmodule.model.SysRoleAuthority',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'sysmodule/sysRole.do?method=addSysRoleAuthority',
			update: 'sysmodule/sysRole.do?method=updateSysRoleAuthority',
			read: 'sysmodule/sysRole.do?method=getSysRoleAuthorityList',
			destroy: 'sysmodule/sysRole.do?method=deleteSysRoleAuthority'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'ra_id',
		direction: 'ASC'
	}]
});

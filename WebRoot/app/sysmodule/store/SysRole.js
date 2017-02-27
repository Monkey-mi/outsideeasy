Ext.define('srm.sysmodule.store.SysRole', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysRole'],
	model: 'srm.sysmodule.model.SysRole',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'sysmodule/sysRole.do?method=addSysRole',
			update: 'sysmodule/sysRole.do?method=updateSysRole',
			read: 'sysmodule/sysRole.do?method=getSysRoleList',
			destroy: 'sysmodule/sysRole.do?method=deleteSysRole'
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
		property: 'role_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.sysmodule.store.SysRolePageFunc', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysRolePageFunc'],
	model: 'srm.sysmodule.model.SysRolePageFunc',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'sysmodule/sysRole.do?method=addSysRolePageFunc',
			update: 'sysmodule/sysRole.do?method=updateSysRolePageFunc',
			read: 'sysmodule/sysRole.do?method=getSysRolePageFuncList',
			destroy: 'sysmodule/sysRole.do?method=deleteSysRolePageFunc'
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
	sorter: [{
		property: 'rf_id',
		direction: 'ASC'
	}]
});

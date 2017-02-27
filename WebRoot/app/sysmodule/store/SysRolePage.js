Ext.define('srm.sysmodule.store.SysRolePage', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysRolePage'],
	model: 'srm.sysmodule.model.SysRolePage',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'sysmodule/sysRole.do?method=addSysRolePage',
			update: 'sysmodule/sysRole.do?method=updateSysRolePage',
			read: 'sysmodule/sysRole.do?method=getSysRolePageList',
			destroy: 'sysmodule/sysRole.do?method=deleteSysRolePage'
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
		property: 'rp_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.sysmodule.store.SysPageFunc', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysPageFunc'],
	model: 'srm.sysmodule.model.SysPageFunc',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'sysmodule/sysFunctionClass.do?method=addSysPageFunc',
			update: 'sysmodule/sysFunctionClass.do?method=updateSysPageFunc',
			read: 'sysmodule/sysFunctionClass.do?method=getSysPageFuncList',
			destroy: 'sysmodule/sysFunctionClass.do?method=deleteSysPageFunc'
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
		property: 'f_id',
		direction: 'ASC'
	}]
});

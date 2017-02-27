Ext.define('srm.sysmodule.store.SysPageAuthority', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysPageAuthority'],
	model: 'srm.sysmodule.model.SysPageAuthority',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
                        create : 'POST',  
                        read : 'POST',  
                        update : 'POST',  
                        destroy : 'POST'  
                    },
		api: {
			create: 'sysmodule/sysFunctionClass.do?method=addSysPageAuthority',
			update: 'sysmodule/sysFunctionClass.do?method=updateSysPageAuthority',
			read: 'sysmodule/sysFunctionClass.do?method=getSysPageAuthorityList',
			destroy: 'sysmodule/sysFunctionClass.do?method=deleteSysPageAuthority'
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
		property: 'authority_id',
		direction: 'ASC'
	}]
});

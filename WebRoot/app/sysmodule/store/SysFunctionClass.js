Ext.define('srm.sysmodule.store.SysFunctionClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.SysFunctionClass'],
	model: 'srm.sysmodule.model.SysFunctionClass',
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
			create: 'sysmodule/sysFunctionClass.do?method=addSysFunctionClass',
			update: 'sysmodule/sysFunctionClass.do?method=updateSysFunctionClass',
			read: 'sysmodule/sysFunctionClass.do?method=getSysFunctionClassList',
			destroy: 'sysmodule/sysFunctionClass.do?method=deleteSysFunctionClass'
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
		property: 'class_id',
		direction: 'ASC'
	}]
});

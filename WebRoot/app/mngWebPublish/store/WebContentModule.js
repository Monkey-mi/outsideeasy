Ext.define('srm.mngWebPublish.store.WebContentModule', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngWebPublish.model.WebContentModule'],
	model: 'srm.mngWebPublish.model.WebContentModule',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'webPublish/WebContentModule.do?method=addWebContentModule',
			update: 'webPublish/WebContentModule.do?method=updateWebContentModule',
			read: 'webPublish/WebContentModule.do?method=getWebContentModuleList',
			destroy: 'webPublish/WebContentModule.do?method=deleteWebContentModule'
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
		property: 'module_id',
		direction: 'ASC'
	}]
});

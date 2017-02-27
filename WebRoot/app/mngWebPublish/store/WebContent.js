Ext.define('srm.mngWebPublish.store.WebContent', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngWebPublish.model.WebContent'],
	model: 'srm.mngWebPublish.model.WebContent',
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
			create: 'webPublish/webPublish.do?method=addWebPublish',
			update: 'webPublish/webPublish.do?method=updateWebPublish',
			read: 'webPublish/webPublish.do?method=getWebPublishList',
			destroy: 'webPublish/webPublish.do?method=deleteWebPublish'
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
		property: 'web_id',
		direction: 'ASC'
	}]
});

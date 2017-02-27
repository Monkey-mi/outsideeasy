Ext.define('srm.mes.mngtaskManager.store.MngAppTask', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTask'],
	model: 'srm.mes.mngtaskManager.model.MngAppTask',
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
			create: 'appTask/appTaskbg.do?method=addAppTask',
			update: 'appTask/appTaskbg.do?method=updateAppTask',
			read: 'appTask/appTaskbg.do?method=getAppTaskList',
			destroy: 'appTask/appTaskbg.do?method=deleteAppTask'
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
		property: 't_id',
		direction: 'ASC'
	}]
});

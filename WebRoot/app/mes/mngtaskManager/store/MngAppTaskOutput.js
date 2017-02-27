Ext.define('srm.mes.mngtaskManager.store.MngAppTaskOutput', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTaskOutput'],
	model: 'srm.mes.mngtaskManager.model.MngAppTaskOutput',
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
			create: 'appTaskOutput/appTaskOutputbg.do?method=addAppTaskOutput',
			update: 'appTaskOutput/appTaskOutputbg.do?method=updateAppTaskOutput',
			read: 'appTaskOutput/appTaskOutputbg.do?method=getAppTaskOutputListbg',
			destroy: 'appTaskOutput/appTaskOutputbg.do?method=deleteAppTaskOutput'
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
		property: 'record_id',
		direction: 'ASC'
	}]
});

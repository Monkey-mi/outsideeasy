Ext.define('srm.mes.mngtaskManager.store.MngAppTaskLogistics', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTaskLogistics'],
	model: 'srm.mes.mngtaskManager.model.MngAppTaskLogistics',
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
			create: 'appTaskLogistics/appTaskLogisticsbg.do?method=addAppTaskLogistics',
			update: 'appTaskLogistics/appTaskLogisticsbg.do?method=updateAppTaskLogistics',
			read: 'appTaskLogistics/appTaskLogisticsbg.do?method=getAppTaskLogisticsListbg',
			destroy: 'appTaskLogistics/appTaskLogisticsbg.do?method=deleteAppTaskLogistics'
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

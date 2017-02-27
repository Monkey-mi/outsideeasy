Ext.define('srm.mes.mngtaskManager.store.MngAppLogisticsItem', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppLogisticsItem'],
	model: 'srm.mes.mngtaskManager.model.MngAppLogisticsItem',
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
			create: 'appLogisticsItem/appLogisticsItembg.do?method=addAppLogisticsItem',
			update: 'appLogisticsItem/appLogisticsItembg.do?method=updateAppLogisticsItem',
			read: 'appLogisticsItem/appLogisticsItembg.do?method=getAppLogisticsItemList',
			destroy: 'appLogisticsItem/appLogisticsItembg.do?method=deleteAppLogisticsItem'
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
		property: 'item_id',
		direction: 'ASC'
	}]
});

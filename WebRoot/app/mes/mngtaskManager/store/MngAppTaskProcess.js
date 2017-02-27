Ext.define('srm.mes.mngtaskManager.store.MngAppTaskProcess', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTaskProcess'],
	model: 'srm.mes.mngtaskManager.model.MngAppTaskProcess',
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
			create: 'appTaskProcess/appTaskProcessbg.do?method=addAppTaskProcess',
			update: 'appTaskProcess/appTaskProcessbg.do?method=updateAppTaskProcess',
			read: 'appTaskProcess/appTaskProcessbg.do?method=getAppTaskProcessListbg',
			destroy: 'appTaskProcess/appTaskProcessbg.do?method=deleteAppTaskProcess'
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
		property: 'tp_id',
		direction: 'ASC'
	}]
});

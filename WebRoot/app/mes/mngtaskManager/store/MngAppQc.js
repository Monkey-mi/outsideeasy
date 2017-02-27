Ext.define('srm.mes.mngtaskManager.store.MngAppQc', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppQc'],
	model: 'srm.mes.mngtaskManager.model.MngAppQc',
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
			create: 'appQc/appQcbg.do?method=addAppQc',
			update: 'appQc/appQcbg.do?method=updateAppQc',
			read: 'appQc/appQcbg.do?method=getAppQcListbg',
			destroy: 'appQc/appQcbg.do?method=deleteAppQc'
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
		property: 'qc_id',
		direction: 'ASC'
	}]
});

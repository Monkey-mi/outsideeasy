Ext.define('srm.mes.mngtaskManager.store.MngAppTaskFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTaskFile'],
	model: 'srm.mes.mngtaskManager.model.MngAppTaskFile',
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
			create: 'appTaskFile/appTaskFilebg.do?method=addAppTaskFile',
			update: 'appTaskFile/appTaskFilebg.do?method=updateAppTaskFile',
			read: 'appTaskFile/appTaskFilebg.do?method=getAppTaskFileListbg',
			destroy: 'appTaskFile/appTaskFilebg.do?method=deleteAppTaskFile'
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
		property: 'tf_id',
		direction: 'ASC'
	}]
});

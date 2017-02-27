Ext.define('srm.mes.mngtaskManager.store.MngAppTaskBom', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngAppTaskBom'],
	model: 'srm.mes.mngtaskManager.model.MngAppTaskBom',
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
			create: 'appTaskBom/appTaskBombg.do?method=addAppTaskBom',
			update: 'appTaskBom/appTaskBombg.do?method=updateAppTaskBom',
			read: 'appTaskBom/appTaskBombg.do?method=getAppTaskBomListbg',
			destroy: 'appTaskBom/appTaskBombg.do?method=deleteAppTaskBom'
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
		property: 'tb_id',
		direction: 'ASC'
	}]
});

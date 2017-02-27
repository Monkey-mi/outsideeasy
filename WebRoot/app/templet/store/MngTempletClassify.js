Ext.define('srm.templet.store.MngTempletClassify', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletClassify'],
	model: 'srm.templet.model.MngTempletClassify',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'mngTempletClassify/mngTempletClassifybg.do?method=addMngTempletClassify',
			update: 'mngTempletClassify/mngTempletClassifybg.do?method=updateMngTempletClassify',
			read: 'mngTempletClassify/mngTempletClassifybg.do?method=getMngTempletClassifyList',
			destroy: 'mngTempletClassify/mngTempletClassifybg.do?method=deleteMngTempletClassify'
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
		property: 'classify_id',
		direction: 'ASC'
	}]
});

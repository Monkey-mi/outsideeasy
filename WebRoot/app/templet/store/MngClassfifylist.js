//供应商档案信息表store
Ext.define('srm.templet.store.MngClassfifylist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletClassify'],
	model: 'srm.templet.model.MngTempletClassify',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngTempletClassify/mngTempletClassifybg.do?method=getClassifyList'		
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		
	}]
});

Ext.define('srm.templet.store.MngTypelist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletElementType'],
	model: 'srm.templet.model.MngTempletElementType',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngTempletElementType/mngTempletElementTypebg.do?method=getTypeList'
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
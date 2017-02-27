
Ext.define('srm.templet.store.MngHead', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngAccessTempletHead'],
	model: 'srm.templet.model.MngAccessTempletHead',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=searchModelt'	
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
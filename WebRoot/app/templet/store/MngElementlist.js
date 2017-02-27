//供应商档案信息表store
Ext.define('srm.templet.store.MngElementlist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngAccessTempletElement'],
	model: 'srm.templet.model.MngAccessTempletElement',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngAccessTempletElement/mngAccessTempletElementbg.do?method=getElementList'		
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
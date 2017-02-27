//供应商档案信息表store
Ext.define('srm.templet.store.MngCompanyName', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngCompanyName'],
	model: 'srm.templet.model.MngCompanyName',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngAccessTempletHead/mngAccessTempletHeadbg.do?method=searchCompanyName'		
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
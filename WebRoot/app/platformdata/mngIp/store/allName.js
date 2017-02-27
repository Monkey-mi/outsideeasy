//供应商档案信息表store
Ext.define('srm.platformdata.mngIp.store.allName', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.platformdata.mngIp.model.allName'],
	model: 'srm.platformdata.mngIp.model.allName',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'ipaddress/getAllAccount.do?method=getAllAccount'		
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
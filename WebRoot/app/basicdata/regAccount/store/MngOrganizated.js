//供应商档案信息表store
Ext.define('srm.basicdata.regAccount.store.MngOrganizated', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.MngOrganization'],
	model: 'srm.basicdata.regAccount.model.MngOrganization',
	pageSize: 999,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		api: {		
			read: 'mngregAccount/reAccountServiceBg.do?method=getOrganizelist'		
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
Ext.define('srm.basicdata.regAccount.store.MngSubAccount', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.MngSubAccount'],
	model: 'srm.basicdata.regAccount.model.MngSubAccount',
	pageSize: 999,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'mngsubAccount/reAccountServiceBg.do?method=addMngSubAccount',
			update: 'mngsubAccount/reAccountServiceBg.do?method=updateMngSubAccount',
			read: 'mngsubAccount/reAccountServiceBg.do?method=getMngSubAccountList',
			destroy: 'mngsubAccount/reAccountServiceBg.do?method=deleteMngSubAccount'
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
		property: 'sa_id',
		direction: 'ASC'
	}]
});

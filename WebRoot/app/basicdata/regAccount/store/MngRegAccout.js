Ext.define('srm.basicdata.regAccount.store.MngRegAccout', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.MngRegAccout'],
	model: 'srm.basicdata.regAccount.model.MngRegAccout',
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
			create: 'mngregAccount/reAccountServiceBg.do?method=addMngRegAccout',
			update: 'mngregAccount/reAccountServiceBg.do?method=updateMngRegAccout',
			read: 'mngregAccount/reAccountServiceBg.do?method=getMngRegAccoutList',
			destroy: 'mngregAccount/reAccountServiceBg.do?method=deleteMngRegAccout'
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
		property: 'reg_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.basicdata.regAccount.store.MngRegRole', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.regAccount.model.SysRole'],
	model: 'srm.basicdata.regAccount.model.SysRole',
	proxy: {
		type: 'ajax',
		actionMethods : {     
            read : 'POST'           
        },
		api: {		
			read: 'mngregAccount/reAccountServiceBg.do?method=getRolelist'		
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
	sorters: [{
		property: 'role_id',
		direction: 'ASC'
	}]
});

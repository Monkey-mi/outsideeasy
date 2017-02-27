Ext.define('srm.sysmodule.store.WsIdentity', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.sysmodule.model.WsIdentity'],
	model: 'srm.sysmodule.model.WsIdentity',
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
			create: 'sysmodule/wsIdentity.do?method=addWsIdentity',
			update: 'sysmodule/wsIdentity.do?method=updateWsIdentity',
			read: 'sysmodule/wsIdentity.do?method=getWsIdentityList',
			destroy: 'sysmodule/wsIdentity.do?method=deleteWsIdentity'
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
		property: 'ws_id',
		direction: 'ASC'
	}]
});

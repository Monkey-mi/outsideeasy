Ext.define('srm.syslog.store.Srmlog', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.syslog.model.Srmlog'],
	model: 'srm.syslog.model.Srmlog',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {	
			read: 'common/Modules.do?method=getLogList'
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
		property: 'adress_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.platformdata.checkFactory.store.CheckFactory', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.platformdata.checkFactory.model.CheckFactory'],
	model: 'srm.platformdata.checkFactory.model.CheckFactory',
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
			create: 'checkFactory/checkFactorybg.do?method=addCheckFactory',
			update: 'checkFactory/checkFactorybg.do?method=updateCheckFactory',
			read: 'checkFactory/checkFactorybg.do?method=getCheckFactoryList',
			destroy: 'checkFactory/checkFactorybg.do?method=deleteCheckFactory'
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
		property: 'factory_cycle_id',
		direction: 'ASC'
	}]
});

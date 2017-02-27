Ext.define('srm.basicdata.sFilter.store.SFilter', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.sFilter.model.SFilter'],
	model: 'srm.basicdata.sFilter.model.SFilter',
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
			create: 'sFilter/sFilter.do?method=addSFilter',
			update: 'sFilter/sFilter.do?method=updateSFilter',
			read: 'sFilter/sFilter.do?method=getSFilterList',
			destroy: 'sFilter/sFilter.do?method=deleteSFilter'
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
		property: 'filter_id',
		direction: 'ASC'
	}]
});

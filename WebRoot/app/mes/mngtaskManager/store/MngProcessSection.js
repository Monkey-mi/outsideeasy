Ext.define('srm.mes.mngtaskManager.store.MngProcessSection', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mes.mngtaskManager.model.MngProcessSection'],
	model: 'srm.mes.mngtaskManager.model.MngProcessSection',
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
			create: 'appSection/appSectionbg.do?method=addMngProcessSection',
			update: 'appSection/appSectionbg.do?method=updateMngProcessSection',
			read: 'appSection/appSectionbg.do?method=getMngProcessSectionList',
			destroy: 'appSection/appSectionbg.do?method=deleteMngProcessSection'
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
		property: 'sec_id',
		direction: 'ASC'
	}]
});

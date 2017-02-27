Ext.define('srm.templet.store.MngTempletElementType', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletElementType'],
	model: 'srm.templet.model.MngTempletElementType',
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
			create: 'mngTempletElementType/mngTempletElementTypebg.do?method=addMngTempletElementType',
			update: 'mngTempletElementType/mngTempletElementTypebg.do?method=updateMngTempletElementType',
			read: 'mngTempletElementType/mngTempletElementTypebg.do?method=getMngTempletElementTypeList',
			destroy: 'mngTempletElementType/mngTempletElementTypebg.do?method=deleteMngTempletElementType'
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
		property: 'e_type_id',
		direction: 'ASC'
	}]
});

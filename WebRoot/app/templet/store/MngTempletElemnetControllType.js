Ext.define('srm.templet.store.MngTempletElemnetControllType', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletElemnetControllType'],
	model: 'srm.templet.model.MngTempletElemnetControllType',
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
			create: 'mngTempletElemnetControllType/mngTempletElemnetControllTypebg.do?method=addMngTempletElemnetControllType',
			update: 'mngTempletElemnetControllType/mngTempletElemnetControllTypebg.do?method=updateMngTempletElemnetControllType',
			read: 'mngTempletElemnetControllType/mngTempletElemnetControllTypebg.do?method=getMngTempletElemnetControllTypeList',
			destroy: 'mngTempletElemnetControllType/mngTempletElemnetControllTypebg.do?method=deleteMngTempletElemnetControllType'
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
		property: 'controller_type_id',
		direction: 'ASC'
	}]
});

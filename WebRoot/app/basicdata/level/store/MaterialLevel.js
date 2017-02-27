Ext.define('srm.basicdata.level.store.MaterialLevel', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.level.model.MaterialLevel'],
	model: 'srm.basicdata.level.model.MaterialLevel',
	pageSize: 25,
	proxy: {
		type: 'ajax',
//		extraParams:{usePaging:true},
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'materialLevel/materialLevel.do?method=addMaterialLevel',
			update: 'materialLevel/materialLevel.do?method=updateMaterialLevel',
			read: 'materialLevel/materialLevel.do?method=getMaterialLevelList',
			destroy: 'materialLevel/materialLevel.do?method=deleteMaterialLevel'
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
		property: 'level_id',
		direction: 'ASC'
	}]
});

Ext.define('srm.basicdata.materialClass.store.MaterialClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.materialClass.model.MaterialClass'],
	model: 'srm.basicdata.materialClass.model.MaterialClass',
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
			create: 'materialClass/materialClass.do?method=addMaterialClass',
			update: 'materialClass/materialClass.do?method=updateMaterialClass',
			read: 'materialClass/materialClass.do?method=getMaterialClassList',
			destroy: 'materialClass/materialClass.do?method=deleteMaterialClass'
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
	sorters: [{
		property: 'mc_id',
		direction: 'ASC'
	}]
});

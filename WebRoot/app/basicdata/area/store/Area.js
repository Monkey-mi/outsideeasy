Ext.define('srm.basicdata.area.store.Area', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.area.model.Area'],
	model: 'srm.basicdata.area.model.Area',
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
			create: 'area/area.do?method=addArea',
			update: 'area/area.do?method=updateArea',
			read: 'area/area.do?method=getAreaList',
			destroy: 'area/area.do?method=deleteArea'
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
		property: 'area_id',
		direction: 'ASC'
	}]
});

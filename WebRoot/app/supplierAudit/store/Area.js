Ext.define('srm.supplierAudit.store.Area', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.Area'],
	model: 'srm.supplierAudit.model.Area',
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
			read: 'supplier/supplierFile.do?method=getAreaList'
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

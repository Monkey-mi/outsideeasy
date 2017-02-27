Ext.define('srm.supplier.store.Metarial', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.Metarial'],
	model: 'srm.supplier.model.Metarial',
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
			create: 'supplier/metarial.do?method=addMetarial',
			update: 'supplier/metarial.do?method=updateMetarial',
			read: 'supplier/metarial.do?method=getMetarialList',
			destroy: 'supplier/metarial.do?method=deleteMetarial'
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
		property: 'material_id',
		direction: 'DESC'
	}]
});

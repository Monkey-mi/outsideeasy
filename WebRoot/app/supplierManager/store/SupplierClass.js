/*厂商类别与材料类别表同一个*/
Ext.define('srm.supplierManager.store.SupplierClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.MaterialClass'],
	model: 'srm.supplier.model.MaterialClass',
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
			read: 'supplier/supplierFile.do?method=getMaterialClassList'
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

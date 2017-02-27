Ext.define('srm.supplierFile.store.AccMetarial', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccMetarial'],
	model: 'srm.supplierFile.model.AccMetarial',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				create: 'supplier/metarial.do?method=addAccMetarial',
				update: 'supplier/metarial.do?method=updateAccMetarial',
				read: 'supplier/metarial.do?method=getAccMetarialList',
				destroy: 'supplier/metarial.do?method=deleteAccMetarial'
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
		property: 'material_id',
		direction: 'ASC'
	}]
});

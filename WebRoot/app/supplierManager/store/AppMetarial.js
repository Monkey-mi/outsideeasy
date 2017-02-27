Ext.define('srm.supplierManager.store.AppMetarial', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppMetarial'],
	model: 'srm.supplierManager.model.AppMetarial',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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

Ext.define('srm.supplierFile.store.AccCompetitor', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccCompetitor'],
	model: 'srm.supplierFile.model.AccCompetitor',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
				create: 'supplier/competitor.do?method=addAccCompetitor',
				update: 'supplier/competitor.do?method=updateAccCompetitor',
				read: 'supplier/competitor.do?method=getAccCompetitorList',
				destroy: 'supplier/competitor.do?method=deleteAccCompetitor'
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
		property: 'competitor_id',
		direction: 'ASC'
	}]
});

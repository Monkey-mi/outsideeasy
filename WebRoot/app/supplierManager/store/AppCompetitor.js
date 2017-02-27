Ext.define('srm.supplierManager.store.AppCompetitor', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppCompetitor'],
	model: 'srm.supplierManager.model.AppCompetitor',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/competitor.do?method=addCompetitor',
			update: 'supplier/competitor.do?method=updateCompetitor',
			read: 'supplier/competitor.do?method=getCompetitorList',
			destroy: 'supplier/competitor.do?method=deleteCompetitor'
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

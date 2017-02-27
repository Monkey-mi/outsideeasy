Ext.define('srm.supplier.store.Competitor', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.Competitor'],
	model: 'srm.supplier.model.Competitor',
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'competitor_id',
		direction: 'DESC'
	}]
});

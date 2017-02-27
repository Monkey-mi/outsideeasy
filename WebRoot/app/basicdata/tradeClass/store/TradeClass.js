Ext.define('srm.basicdata.tradeClass.store.TradeClass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.basicdata.tradeClass.model.TradeClass'],
	model: 'srm.basicdata.tradeClass.model.TradeClass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
      /*  extraParams:{
			usePaging:true
		},*/
		api: {
			create: 'tradeClass/tradeClass.do?method=addTradeClass',
			update: 'tradeClass/tradeClass.do?method=updateTradeClass',
			read: 'tradeClass/tradeClass.do?method=getTradeClassList',
			destroy: 'tradeClass/tradeClass.do?method=deleteTradeClass'
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
		property: 'class_id',
		direction: 'ASC'
	}]
});

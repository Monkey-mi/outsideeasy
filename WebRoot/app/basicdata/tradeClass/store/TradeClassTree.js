Ext.define('srm.basicdata.tradeClass.store.TradeClassTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.module.model.ModuleTree'],
	model: 'srm.module.model.ModuleTree',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'tradeClass/tradeClass.do?method=getTradeClassTree',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		{   
			  property: 'parentId',   
			  direction: 'ASC'  
		 },
        {
			property: 'nodeId',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'类别树',
	  	leaf:false,
	  	expanded:true
	}
});
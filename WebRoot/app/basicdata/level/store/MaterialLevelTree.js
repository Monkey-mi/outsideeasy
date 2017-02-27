Ext.define('srm.basicdata.level.store.MaterialLevelTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.basic.model.TreeModel'],
	model: 'srm.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'materialLevel/materialLevel.do?method=getMaterialLevelTree',
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
	  	text:'分层等级',
	  	leaf:false,
	  	expanded:true
	}
});
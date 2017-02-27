/*准入评估13项树结构store*/
Ext.define('srm.supplierAccess.store.EvaluateItemTree',{
	extend:'Ext.data.TreeStore',
	requires:['srm.basic.model.TreeModel'],
	model:'srm.basic.model.TreeModel',
	proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'supplierAccess/AccessBasetable.do?method=getEvaluateItemTree',
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
	  	text:'评估项',
	  	leaf:false,
	  	expanded:true
	}
});
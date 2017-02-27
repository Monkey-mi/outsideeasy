Ext.define('srm.supplier.store.MaterialClassTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.basic.model.TreeModel'],
	model: 'srm.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'supplier/supplierFile.do?method=getMaterialClassTree',
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
	  	text:'材料类别',
	  	leaf:false,
	  	expanded:true
	}
});
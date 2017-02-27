Ext.define('srm.basicdata.area.store.AreaTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.basic.model.TreeModel'],
	model: 'srm.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'area/area.do?method=getAreaTree',
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
	  	text:'地区',
	  	leaf:false,
	  	expanded:true
	}
});
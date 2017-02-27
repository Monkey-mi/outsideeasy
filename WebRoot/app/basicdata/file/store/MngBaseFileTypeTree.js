Ext.define('srm.basicdata.file.store.MngBaseFileTypeTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.module.model.ModuleTree'],
	model: 'srm.module.model.ModuleTree',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'basefile/basefilebg.do?method=getFileTypeTree',
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
	  	text:'文件类型树',
	  	leaf:false,
	  	expanded:true
	}
});
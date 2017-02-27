Ext.define('srm.module.store.ModuleTrees',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.module.model.ModuleTree'],
	model: 'srm.module.model.ModuleTree',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'common/Modules.do?method=getModuleWithParent',
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
			property: 'order_seq',
			direction: 'ASC'
		},{
			property: 'text',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'菜单清单',
	  	leaf:false,
	  	expanded:true
	}
});
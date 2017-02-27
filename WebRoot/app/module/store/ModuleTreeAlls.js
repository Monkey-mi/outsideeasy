Ext.define('srm.module.store.ModuleTreeAlls',{
	extend: 'Ext.data.TreeStore', 
	requires:['srm.module.model.ModuleTreeChk'],
	model:'srm.module.model.ModuleTreeChk',
	proxy: {
		type: 'ajax',
		actionMethods:{read: 'POST'},
		url: 'common/Modules.do?method=getAllModuleFuncsTree' ,
		reader: {
  			type: 'json',
  			rootProperty: 'data',
  			messageProperty: 'message'
  		}
	},
	sorters: [{
			property: 'order_seq',
			direction: 'ASC'
		},{
			property: 'text',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'功能清单',
	  	leaf:false,
	  	expanded:true
	}
        
});
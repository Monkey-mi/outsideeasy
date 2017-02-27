Ext.define('srm.sysmodule.store.SysFunctionClassTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['srm.basic.model.TreeModel'],
	model: 'srm.basic.model.TreeModel',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		url: 'sysmodule/sysFunctionClass.do?method=getSysFunctionClassTree',
		reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
	},
	sorters: [{
		property: 'class_id',
		direction: 'ASC'
	}],
	root: {
	  	id:0,
	  	text:'平台业务',
	  	leaf:false,
	  	expanded:true
	}
});

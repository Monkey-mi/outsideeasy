Ext.define('srm.sysmodule.store.SysFunctionClassTreeAll', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['srm.basic.model.TreeModelChk'],
	model: 'srm.basic.model.TreeModelChk',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		url: 'sysmodule/sysFunctionClass.do?method=getSysFunctionClassTreeAll',
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
	  	text:'业务',
	  	leaf:false,
	  	expanded:true
	}
});

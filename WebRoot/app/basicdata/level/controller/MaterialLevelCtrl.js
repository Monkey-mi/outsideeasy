Ext.define('srm.basicdata.level.controller.MaterialLevelCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.basicdata.level.store.MaterialLevel'
				],
	views:[
			'srm.basicdata.level.view.MaterialLevelManager'
		],
	refs:[
		{ref:'materialLevelManager',selector:'materialLevelManager'},
		{ref:'grid_materialLevel',selector:'materialLevelManager #grid_materialLevel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'materialLevelManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.store.load();
				},
				beforedestroy:function(){
					
				}
			}
		});
		me.isInited=true;
	}
});
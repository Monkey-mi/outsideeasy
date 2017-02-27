Ext.define('srm.basicdata.sFilter.controller.SFilterCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.basicdata.sFilter.store.SFilter'
				],
	views:[
			'srm.basicdata.sFilter.view.SFilterManager'
		],
	refs:[
		{ref:'sFilterManager',selector:'sFilterManager'},
		{ref:'grid_sfilter',selector:'sFilterManager #grid_sfilter'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'sFilterManager':{
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
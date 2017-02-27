Ext.define('srm.basicdata.tradeClass.controller.TradeClassCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.basicdata.tradeClass.store.TradeClassTree',
				'srm.basicdata.tradeClass.store.TradeClass'
				],
	views:[
			'srm.basicdata.tradeClass.view.TradeClassManager'
		],
	refs:[
		{ref:'tradeClassManager',selector:'tradeClassManager'},
		{ref:'grid_tradeclass',selector:'tradeClassManager #grid_tradeclass'},
		{ref:'treepanel',selector:'tradeClassManager treepanel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'tradeClassManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.treeStore=cmp.treeStore;
					me.store.load();
				
				},
				beforedestroy:function(){
					delete me.store.proxy.extraParams.nodeIdForGrid;
				}
			},
			
			'tradeClassManager treepanel':{
				select :me.onSelectModule
			}
		});
		me.isInited=true;
	},
	onSelectModule:function(){
		var me=this;
		var treepanel=me.getTreepanel();
		var rec=treepanel.getSelectionModel().getSelection()[0];
		var nodeIdForGrid=rec.get('id');
		Ext.apply(me.store.proxy.extraParams, {'nodeIdForGrid':nodeIdForGrid});//----关闭时，要删除
		me.store.loadPage(1);
	}
});
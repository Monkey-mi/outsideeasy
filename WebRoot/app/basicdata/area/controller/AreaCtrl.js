Ext.define('srm.basicdata.area.controller.AreaCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'
				,'srm.basicdata.area.store.AreaTree'
				,'srm.basicdata.area.store.Area'
				],
	views:[
			'srm.basicdata.area.view.AreaManager'
		],
	refs:[
		{ref:'areaManager',selector:'areaManager'},
		{ref:'grid_area',selector:'areaManager #grid_area'},
		{ref:'treepanel',selector:'areaManager treepanel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'areaManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.treeStore=cmp.treeStore;
					me.store.load();
					me.treeStore.load();
				},
				beforedestroy:function(){
					delete me.store.proxy.extraParams.nodeIdForGrid;
				}
			},
			'areaManager  tool':{
			 	click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						me.treeStore.load();
					}
				}
			},
			'areaManager treepanel':{
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
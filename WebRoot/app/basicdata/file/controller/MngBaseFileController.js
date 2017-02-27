Ext.define('srm.basicdata.file.controller.MngBaseFileController', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.basicdata.file.store.MngBaseFileType',
				'srm.basicdata.file.store.MngBaseFileTypeTree'
				],
	views:[
			'srm.basicdata.file.view.MngBaseFileManager'
		],
	refs:[
		{ref:'mngBaseFileManager',selector:'mngBaseFileManager'},
		{ref:'grid_fileclass',selector:'mngBaseFileManager #grid_fileclass'},
		{ref:'treepanel',selector:'mngBaseFileManager treepanel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mngBaseFileManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.treefstore=cmp.treefstore;
					me.store.load();
				
				},
				beforedestroy:function(){
					delete me.store.proxy.extraParams.nodeIdForGrid;
				}
			},
			
			'mngBaseFileManager treepanel':{
				select :me.onSelectModule
			},
			'mngBaseFileManager  tool':{
				click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						me.treefstore.load();
					}
				}
			}
		});
		me.isInited=true;
	},
	
	onSelectModule:function(){
		var me=this;
		var treepanel=me.getTreepanel();
		var rec=treepanel.getSelectionModel().getSelection()[0];
		var nodeIdForGrid=rec.get('id');
		Ext.apply(me.store.proxy.extraParams, {'f_id':nodeIdForGrid});//----关闭时，要删除
		me.store.loadPage(1);
	}
});
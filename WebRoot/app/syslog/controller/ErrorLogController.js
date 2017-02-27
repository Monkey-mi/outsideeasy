/**
 * 平台错误记录的日志
 */
Ext.define('srm.syslog.controller.ErrorLogController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.sysmodule.store.SysPageAuthority',
				'srm.sysmodule.store.SysFunctionClassTreeAll',
				'srm.platformdata.mngIp.store.allName'
				],
	views:[
				'srm.syslog.view.ErrorLogManager',
				'srm.syslog.view.SrmlogInfo'
	],
	refs:[
	            {ref:'errorLogManager',selector:'errorLogManager'},
	            {ref:'srmlogInfo',selector:'srmlogInfo'} 
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			/*
			 *主账户grid的初始化 
			 */
			'errorLogManager':{
				afterrender:function(cmp){	
					me.panel=me.getErrorLogManager();
					me.panel.down("#sysFunctionClassTree").collapseAll();
			        me.treestore = me.panel.treestore;
			      //  me.logstore = me.panel.logstore;
			        me.errorstore = me.panel.errorstore;
			        me.errorstore.proxy.extraParams.apply_sts = "platform";
			        me.errorstore.proxy.extraParams.nodeIdForGrid = "error";
					me.errorstore.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				delete me.substore.proxy.extraParams.apply_sts;	
				delete me.substore.proxy.extraParams.nodeIdForGrid;	
				delete me.substore.proxy.extraParams.condition;	
				delete me.substore.proxy.extraParams.apply_stsSearch;	
				delete me.errorstore.proxy.extraParams.start_time;
				delete me.errorstore.proxy.extraParams.end_time;
			},
			'errorLogManager #grid_head':{
				itemdblclick:function(grid, rec){
					var edtWin = Ext.widget('srmlogInfo',{
						isAddNew: false
					});
					edtWin.loadData(rec);
					edtWin.show();//任务单的详情
				}
			},
			
			/**
			 * 进行刷新
			 */
	        'errorLogManager #grid_head button':{
	            click:me.doSearchAccount
	        },
	        'errorLogManager #sysFunctionClassTree':{
	        	select:me.onSelectModule
	        }
		});
		me.isInited=true;
	},
	//点击树节点显示树节点及其子节点
	onSelectModule: function(rowModel, rec, idx, eOpts) {
		this.errorstore.reload({
			params : {
				node : rec.get('id')		
			}
		});
	},
/**
 * 搜索条件下的日志信息
 * @param {} btn
 */	
doSearchAccount:function(btn){
	  var me = this;
	  switch(btn.itemId){
	  	case 'btn_reflash':
	    me.errorstore.reload(); // 刷新
	  	break;
	  	case 'btn_outline':
	  	me.outline();//弹出详情
	  	break;
	  	case 'btn_search1':
		var condition=me.panel.down('#search').getValue();
		var apply_stsSearch=me.panel.down('#state_search').getValue();
		var start_time = me.panel.down('#start_time').getValue();
		var end_time = me.panel.down('#end_time').getValue();
		me.errorstore.proxy.extraParams.condition=condition;
		me.errorstore.proxy.extraParams.apply_stsSearch=apply_stsSearch;
		me.errorstore.proxy.extraParams.end_time=end_time;
		me.errorstore.proxy.extraParams.start_time=start_time;
		me.errorstore.reload(); 
	  	break;
	  }
},
/**
 * 弹出详情
 */
outline:function(){
		var me=this;
		var maingrid = me.panel.down('#grid_head');
		var rec = maingrid.getSelectionModel().getSelection()[0];			
		var edtWin = Ext.widget('srmlogInfo',{
			isAddNew: false
		});
		edtWin.loadData(rec);
		edtWin.show();
}
});
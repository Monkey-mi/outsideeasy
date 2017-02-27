/**
 * 平台错误记录的日志
 */
Ext.define('srm.syslog.controller.BgErrorLogController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.sysmodule.store.SysPageAuthority'
				],
	views:[
				'srm.syslog.view.BgErrorLogManager',
				'srm.syslog.view.SrmlogInfo'
	],
	refs:[
	            {ref:'bgErrorLogManager',selector:'bgErrorLogManager'},
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
			'bgErrorLogManager':{
				afterrender:function(cmp){	
					me.panel=me.getBgErrorLogManager();		
			        me.errorstore = me.panel.errorstore;
			        me.errorstore.proxy.extraParams.apply_sts = "manager";
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
				delete me.errorstore.proxy.extraParams.start_time;
				delete me.errorstore.proxy.extraParams.end_time;
			},
			'bgErrorLogManager #grid_head':{
				itemdblclick:function(grid, rec){
					var edtWin = Ext.widget('srmlogInfo',{
						isAddNew: false
					});
					edtWin.loadData(rec);
					edtWin.show();//任务单的详情
				}
			},
			 /**
			 * 主账号进行查询和刷新
			 */
	        'bgErrorLogManager #grid_head  #search':{	        	
	         //查询框回车事件
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						var condition=me.panel.down('#search').getValue();
						var start_time = me.panel.down('#start_time').getValue();
						var end_time = me.panel.down('#end_time').getValue();
						me.errorstore.proxy.extraParams.condition=condition;
						me.errorstore.proxy.extraParams.end_time=end_time;
						me.errorstore.proxy.extraParams.start_time=start_time;
						me.errorstore.reload(); 						
					}
				}
	        },
			/**
			 * 进行刷新
			 */
	        'bgErrorLogManager #grid_head button':{
	            click:me.doSearchAccount
	        }	      
		});
		me.isInited=true;
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
		var start_time = me.panel.down('#start_time').getValue();
		var end_time = me.panel.down('#end_time').getValue();
		me.errorstore.proxy.extraParams.condition=condition;
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
/**
 * 在线用户
 */
Ext.define('srm.basicdata.regAccount.controller.MngCountController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.basicdata.regAccount.store.MngAccountCount',
				'srm.platformdata.mngIp.store.allName'
				],
	views:[
				'srm.basicdata.regAccount.view.MngAccountCountView'						
	],
	refs:[
	            {ref:'mngAccountCountView',selector:'mngAccountCountView'}
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
			'mngAccountCountView':{
				afterrender:function(cmp){	
					me.panel=me.getMngAccountCountView();
			        me.accstore = me.panel.accstore;
			        me.accstore.proxy.extraParams.condition="";
		            me.accstore.proxy.extraParams.apply_sts=0;
					me.accstore.load();	
					me.searchCount();//统计在线人数
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				delete me.store.proxy.extraParams.condition;	
				delete me.store.proxy.extraParams.apply_sts;				
			},
			/**
			 * 进行刷新
			 */
	        'mngAccountCountView #grid_head button':{
	           click:me.doSearchAccount
	        }
		});
		me.isInited=true;
	},
	
doSearchAccount:function(btn){
	  var me = this;
	  switch(btn.itemId){
	  	case 'btn_reflash':
	    me.accstore.load(); // 刷新
	    me.searchCount();//统计在线人数
	  	break;
	  	case 'btn_outline':
	  	me.outline();//强制下线
	  	break;
	  	case 'btn_search1':
		var condition=me.panel.down('#search').getValue();
		var apply_stsSearch=me.panel.down('#state_search').getValue();		
		me.accstore.proxy.extraParams.condition=condition;
		me.accstore.proxy.extraParams.apply_sts=apply_stsSearch;
		if(apply_stsSearch==''|| apply_stsSearch==null){
			me.accstore.proxy.extraParams.apply_sts = 0;
		}
		me.accstore.load(); 
	  	break;
	  }
},

outline:function(){
		var me=this;
		var panel = me.getMngAccountCountView();
		var maingrid = panel.down('#grid_head');
		var regrec = maingrid.getSelectionModel().getSelection()[0];
		if(Ext.isEmpty(regrec)){
			  Ext.Msg.alert('提示','请先选中一条在线用户');
			  return;
			 }
	    Ext.Msg.confirm("提示", "真的要强制"+"["+regrec.get('name')+"]"+"下线吗?", function(btn) {
			if (btn == "yes") {		
				var json=srm.Const.callServiceMethodSync('mngregAccount/OutlineBg.do',{//json去的是data[]中的数据
			    session_id : regrec.get('session_id')	       
		     });
		       
				if(json =="success"){
				    Ext.Msg.alert('提示',"操作成功");
				    me.accstore.reload();
			        return ;
					}
				else{
					Ext.Msg.alert('提示',"系统错误！");
			        return ;
				}
			}
		});		 
},
//统计在线人数
searchCount:function(){
	    var me=this;
	    me.panel=me.getMngAccountCountView();
	    var json=srm.Const.callServiceMethodSync('mngregAccount/getAccountCount2Bg.do',{//json去的是data[]中的数据
	    });	
	    if(json != "" && json != null){
     	me.panel.down('#onine').setText(json);
	    }
}
});
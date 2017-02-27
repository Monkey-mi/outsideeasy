Ext.define('srm.platformdata.mngIp.controller.IpCotroller', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.platformdata.mngIp.store.IpAddress',
				'srm.platformdata.mngIp.store.allName'
				],
	views:[
				'srm.platformdata.mngIp.view.IpManager'
				
	],
	refs:[
	            {ref:'ipManager',selector:'ipManager'},
	            {ref:'ipManager',selector:'ipManager #grid_ip'}
	
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
			'ipManager':{
				afterrender:function(cmp){
					me.panel=me.getIpManager();
					me.ipstore = me.panel.ipstore;	
					me.restore = me.panel.restore;
				    me.ipstore.proxy.extraParams.condition="";
					me.ipstore.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				delete me.store.proxy.extraParams.condition;							
			},
			'ipManager button':{
				click:me.doIpAction
			},
			'ipManager #grid_ip':{
				itemdblclick:me.editeAction
			}
		});
		me.isInited=true;
	},
	/**
	 * 双击进行编辑
	 */
	editeAction:function(){
		var me=this;
		me.ip = me.getIpManager();
		var maingrid = me.ip.down('#grid_ip');
	    var regrec = maingrid.getSelectionModel().getSelection()[0];
			if(Ext.isEmpty(regrec)){
			  Ext.Msg.alert('提示','请先选中一条数据，再修改');
			  return;
			 }		  
		  var rowEditing=maingrid.getPlugin('rowEditing');
		  rowEditing.cancelEdit();	
		  me.restore.load({params:{search:regrec.get('login_id')}});
		  rowEditing.startEdit(regrec);
	},
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doIpAction:function(btn){
	  var me = this;
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:
	  	me.doaddIP();
	  	break;
	  	case srm.Const.FUNC_ITEMID_BTN_DEL:
	  	me.dodeleteIP();
	  	break;
	  	case 'btn_search1':
	  	me.sosearch();	
	  	break;
	  	case 'btn_reflash':
	  	me.ipstore.load();		
	    break;
	  }
	},
	/**
	 * 点击添加进行添加操作
	 */
	doaddIP:function(){
		var me = this;
		me.panel = me.getIpManager();
		var grid = me.panel.down('#grid_ip');
		var rowEditing=grid.getPlugin('rowEditing');
		rowEditing.cancelEdit();
		var rec=Ext.create('srm.platformdata.mngIp.model.IpAddress',{
				oo:'000'	
				});
	    me.ipstore.insert(0, rec);
	    rowEditing.startEdit(rec);
	},
	/**
	 * 使该Ip失效
	 * @return {Boolean}
	 */
	dodeleteIP: function(){
		var me = this;
		me.panel = me.getIpManager();
		var grid = me.panel.down('#grid_ip');
		var rec = grid.getSelection()[0];
		var ip_state = rec.get('ip_state');
		if(ip_state == -1){
			Ext.Msg.alert('提示',"["+rec.get('login_id')+"]"+ "当前的选择的IP状态已经时失效状态。");
			return false;
		}
		Ext.Msg.confirm("提示", "真的要改变"+"["+rec.get('login_id')+"]"+"的"+"["+rec.get('ip_address')+"]"+"为失效状态吗?", function(btn) {
			if (btn == "yes") {		
				var json=srm.Const.callServiceMethodSync('ipaddress/ipmanagerbg.do?method=updateStateIpAddress',{//json去的是data[]中的数据
			    adress_id : rec.get('adress_id')	       
		     });
		       
				if(json =="success"){
				    Ext.Msg.alert('提示',"操作成功");
				    me.ipstore.reload();
			        return ;
					}
				else{
					Ext.Msg.alert('提示',"系统错误！");
			        return ;
				}
			}
		});
		
	},
	/**
	* sosearch 快速查询
	* @return void
	* @author chenlong
	* 2016-8-1
	 */
	sosearch:function(){
		var me = this;
		var condition=me.panel.down('#search').getValue();			
		me.ipstore.proxy.extraParams.condition=condition;	
		me.ipstore.load(); 
	}	
});
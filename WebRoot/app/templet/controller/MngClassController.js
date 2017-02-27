/**
 * 模板分类
 */
Ext.define('srm.templet.controller.MngClassController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.templet.store.MngTempletClassify'			
				],
	views:[
				'srm.templet.view.MngTempletClass'						
	],
	refs:[
	            {ref:'mngTempletClass',selector:'mngTempletClass'}
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
			'mngTempletClass':{
				afterrender:function(cmp){		
					me.classtore =cmp.classtore;
					me.classtore.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				//delete me.substore.proxy.extraParams.nodeIdForGrid;				
			},
			/**
			 * 点击模板显示模板下面的字段信息
			 */
			'mngTempletClass #grid_class button':{
				click:me.doTempletAction
			},
				/**
			 * 双击编辑
			 */
			'mngTempletClass #grid_class':{
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
		var duna = me.getMngTempletClass();
		var maingrid = duna.down('#grid_class');
	    var regrec = maingrid.getSelectionModel().getSelection()[0];
			if(Ext.isEmpty(regrec)){
			  Ext.Msg.alert('提示','请先选中一条数据，再修改');
			  return;
			 }		  
		  var rowEditing=maingrid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();	
		  duna.headstore.load({params:{search:regrec.get('h_id')}});
		  rowEditing.startEdit(regrec);
	},
	
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doTempletAction:function(btn){
	  var me = this;
	  var edtview=me.getMngTempletClass();
	  var grid=edtview.down('#grid_class');
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.templet.model.MngTempletClassify',{
				oo:'000'
			});
			edtview.classtore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
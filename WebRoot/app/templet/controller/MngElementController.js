/**
 *模板字段
 */
Ext.define('srm.templet.controller.MngElementController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.templet.store.MngAccessTempletElement'			
				],
	views:[
				'srm.templet.view.MngAccessElement'						
	],
	refs:[
	            {ref:'mngAccessElement',selector:'mngAccessElement'}
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
			'mngAccessElement':{
				afterrender:function(cmp){
					me.panel=me.getMngAccessElement();
					me.tlstore = me.panel.tlstore;	
					me.tlstore.load();																							
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
			'mngAccessElement #grid_element button':{
				click:me.doTempletAction
			},
			/**
			 * 双击编辑
			 */
			'mngAccessElement #grid_element':{
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
		var duna = me.getMngAccessElement();
		var maingrid = duna.down('#grid_element');
	    var regrec = maingrid.getSelectionModel().getSelection()[0];
			if(Ext.isEmpty(regrec)){
			  Ext.Msg.alert('提示','请先选中一条数据，再修改');
			  return;
			 }		  
		  var rowEditing=maingrid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();	
		  duna.tystore.load({params:{search:regrec.get('e_type_id')}});
		  duna.constore.load({params:{search:regrec.get('controller_type_id')}});
		  rowEditing.startEdit(regrec);
	},
	
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doTempletAction:function(btn){
	  var me = this;
	  var edtview=me.getMngAccessElement();
	  var grid=edtview.down('#grid_element');
	 // var rec = grid.getSelectionModel().getSelection()[0];
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.templet.model.MngAccessTempletElement',{
				oo:'000'
			});
			edtview.tlstore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
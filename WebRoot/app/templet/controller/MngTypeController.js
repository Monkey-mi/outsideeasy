/**
 * 元素类型
 */
Ext.define('srm.templet.controller.MngTypeController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.templet.store.MngTempletElementType'			
				],
	views:[
				'srm.templet.view.MngTempletType'						
	],
	refs:[
	            {ref:'mngTempletType',selector:'mngTempletType'}
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
			'mngTempletType':{
				afterrender:function(cmp){		
					me.typestore =cmp.typestore;
					me.typestore.load();																							
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
			'mngTempletType #grid_type button':{
				click:me.doTempletAction
			}
			
		});
		me.isInited=true;
	},
	
	/**
	 * 点击按钮进行编辑操作
	 * @param {} btn
	 */
	doTempletAction:function(btn){
	  var me = this;
	  var edtview=me.getMngTempletType();
	  var grid=edtview.down('#grid_type');
	 // var rec = grid.getSelectionModel().getSelection()[0];
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.templet.model.MngTempletElementType',{
				oo:'000'
			});
			edtview.typestore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
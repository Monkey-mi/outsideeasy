/**
 * 前端控件类型
 */
Ext.define('srm.templet.controller.MngContrController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.templet.store.MngTempletElemnetControllType'			
				],
	views:[
				'srm.templet.view.MngContrType'						
	],
	refs:[
	            {ref:'mngContrType',selector:'mngContrType'}
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
			'mngContrType':{
				afterrender:function(cmp){		
					me.elstore =cmp.elstore;
					me.elstore.load();																							
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
			'mngContrType #grid_contr button':{
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
	  var edtview=me.getMngContrType();
	  var grid=edtview.down('#grid_contr');
	 // var rec = grid.getSelectionModel().getSelection()[0];
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.templet.model.MngTempletElemnetControllType',{
				oo:'000'
			});
			edtview.elstore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
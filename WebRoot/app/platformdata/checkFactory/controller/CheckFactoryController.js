/**
 * 数据字典
 */
Ext.define('srm.platformdata.checkFactory.controller.CheckFactoryController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.platformdata.checkFactory.store.CheckFactory'			
				],
	views:[
				'srm.platformdata.checkFactory.view.CheckFactoryManager'						
	],
	refs:[
	            {ref:'checkFactoryManager',selector:'checkFactoryManager'}
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
			'checkFactoryManager':{
				afterrender:function(cmp){	
					me.panel = me.getCheckFactoryManager();
					me.classtore =me.panel.classtore;
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
			'checkFactoryManager #grid_class button':{
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
	  var edtview=me.getCheckFactoryManager();
	  var grid=edtview.down('#grid_class');
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.platformdata.checkFactory.model.CheckFactory',{
				oo:'000'
			});
			edtview.classtore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
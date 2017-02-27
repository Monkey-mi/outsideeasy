/**
 * 数据字典
 */
Ext.define('srm.platformdata.dictionary.controller.DictionaryInfoController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.platformdata.dictionary.store.DictionaryInfo'			
				],
	views:[
				'srm.platformdata.dictionary.view.DictionaryInfoManager'						
	],
	refs:[
	            {ref:'dictionaryInfoManager',selector:'dictionaryInfoManager'}
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
			'dictionaryInfoManager':{
				afterrender:function(cmp){	
					me.panel = me.getDictionaryInfoManager();
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
			'dictionaryInfoManager #grid_class button':{
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
	  var edtview=me.getDictionaryInfoManager();
	  var grid=edtview.down('#grid_class');
	  switch(btn.itemId){
	  	case srm.Const.FUNC_ITEMID_BTN_ADD:		  
		  var rowEditing=grid.getPlugin('rowEditing1');
		  rowEditing.cancelEdit();
		  var rec=Ext.create('srm.platformdata.dictionary.model.DictionaryInfo',{
				oo:'000'
			});
			edtview.classtore.insert(0, rec);
			rowEditing.startEdit(rec);
			break;	 	
	  }
	}

});
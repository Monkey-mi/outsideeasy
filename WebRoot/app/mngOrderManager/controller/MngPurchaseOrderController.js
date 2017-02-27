Ext.define('srm.mngOrderManager.controller.MngPurchaseOrderController', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'		
				],
	views:[
			'srm.mngOrderManager.view.MngPurchaseOrderManager',
			'srm.mngOrderManager.view.MngPurchaseOrderMainInfo',
			'srm.mngOrderManager.view.MngOrderNoticeInfo'
		],
	refs:[
		{ref:'MngPurchaseOrderManager',selector:'MngPurchaseOrderManager'}
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
			'MngPurchaseOrderManager':{
				afterrender:function(cmp){					
					me.orderStore = cmp.orderStore;
					me.orderDetailsStore = cmp.orderDetailsStore;
					me.noticeStore = cmp.noticeStore;
					me.noticedetailsStore = cmp.noticedetailsStore;
					me.orderDeliveryRegisterDetails = cmp.orderDeliveryRegisterDetails;
					me.orderDeliveryRegister = cmp.orderDeliveryRegister;
					me.qualityStore = cmp.qualityStore;
				    me.checkDetailsStore = cmp.checkDetailsStore;
				    me.orderDeliveryAttached = cmp.orderDeliveryAttached;
					me.orderStore.load();																							
				}
			},
			'MngPurchaseOrderManager #notice':{
				beforeshow:function(){
					me.noticeStore.reload();
				}
			},
			'MngPurchaseOrderManager #register':{
				beforeshow:function(){										
					me.orderDeliveryRegister.reload();
				}
			},
			'MngPurchaseOrderManager #quality':{
				beforeshow:function(){										
					me.qualityStore.reload();
				}
			},
			'MngPurchaseOrderManager #order':{
				beforeshow:function(){
					me.orderStore.reload();
				}
			},
			'MngPurchaseOrderManager #grid_quality':{
				itemclick:function(grid, rec){
					me.getCheckDetails(rec);
				},
			},
			'MngPurchaseOrderManager #grid_register':{
				itemclick:function(grid, rec){
					me.getDeliveryRegister(rec);
				},
			},
			'MngPurchaseOrderManager #grid_notice':{
				itemclick:function(grid, rec){
					me.getNoticelist(rec);
				},
				itemdblclick : function(grid, rec) {
					var win=Ext.widget('mngOrderNoticeInfo',{					
						addNew:false,
						closable:true
					});
					win.loadData(rec);
					win.show();				
				}
			},
			'MngPurchaseOrderManager #grid_order':{
				itemclick:function(grid, rec){
					me.getProductlist(rec);
				},
				itemdblclick : function(grid, rec) {
					var win=Ext.widget('MngPurchaseOrderMainInfo',{
						//新增、修改页面
						itemId:'MngPurchaseOrderMainInfo',
						title:'查看订单',
						glyph:0xf0f0,
						rec:rec,
						closable:true
					});
					win.show();
				}
			},
			
			'MngPurchaseOrderManager #order button':{
				click:me.doAction
			},
			'MngPurchaseOrderManager #notice button':{
				click:me.doAction2
			},
			'MngPurchaseOrderManager #register button':{
				click:me.doAction3
			},
			'MngPurchaseOrderManager #quality button':{
				click:me.doAction4
			}
		});
		me.isInited=true;
	},
	/**
	 * 查询出质检详情
	* getCheckDetails
	* @param rec
	* @return void
	* @author chenlong
	* 2017-2-23
	 */
	getCheckDetails:function(rec){
		var me = this;
		me.checkDetailsStore.load({
			params:{
				check_id:rec.get('check_id'),
				usePaging:false
			}
		}); 
	},
	/**
	 * 查询出通知单明细
	* getNoticelist
	* @param rec
	* @return void
	* @author chenlong
	* 2017-2-21
	 */
	getNoticelist:function(rec){	
		var me = this;
		me.noticedetailsStore.load({
			params:{
				delivery_notice_id:rec.get('delivery_notice_id'),
				usePaging:false
			}
		}); 
		 
	},
	/**
	 * 送货登记明细 and 送货登记附件
	* getNoticelist
	* @param rec
	* @return void
	* @author chenlong
	* 2017-2-21
	 */
	getDeliveryRegister:function(rec){	
		var me = this;
		me.orderDeliveryRegisterDetails.load({
			params:{
				register_id:rec.get('register_id'),
				usePaging:false
			}
		}); 
		me.orderDeliveryAttached.load({
			params:{
				register_id:rec.get('register_id'),
				usePaging:false
			}
		});
	},
	/**
	 * 单击展示产品的详情
	* getProductlist
	* @param grid
	* @param rec
	* @return void
	* @author chenlong
	* 2017-2-15
	 */
	getProductlist:function(rec){	
		var me = this;
		me.orderDetailsStore.load({
			params:{
				pur_order_id:rec.get('pur_order_id'),
				usePaging:false
			}
		}); 
	},
	/**
	 * 搜索1
	 */
	doAction:function(btn){
		var me = this;
		me.panel=me.getMngPurchaseOrderManager();
		switch(btn.itemId){
		case 'btn_search':
			var condition=me.panel.down('#search').getValue();
			var apply_stsSearch=me.panel.down('#state_search').getValue();
			me.orderStore.proxy.extraParams.condition=condition;
			me.orderStore.proxy.extraParams.status=apply_stsSearch;
			me.orderStore.loadPage(1); 	
			break;
		};
	},
	/**
	 * 搜索2
	 */
	doAction2:function(btn){
		var me = this;
		me.panel=me.getMngPurchaseOrderManager();
		switch(btn.itemId){
		case 'btn_search2':
			var condition=me.panel.down('#search2').getValue();
			var apply_stsSearch=me.panel.down('#state_search2').getValue();
			me.noticeStore.proxy.extraParams.condition=condition;
			me.noticeStore.proxy.extraParams.status=apply_stsSearch;
			me.noticeStore.loadPage(1); 	
			break;
		};
	},
	/**
	 * 搜索3
	 */
	doAction3:function(btn){
		var me = this;
		me.panel=me.getMngPurchaseOrderManager();
		switch(btn.itemId){
		case 'btn_search3':
			var condition=me.panel.down('#search3').getValue();
			//var apply_stsSearch=me.panel.down('#state_search3').getValue();
			me.orderDeliveryRegister.proxy.extraParams.condition=condition;
			//me.orderDeliveryRegister.proxy.extraParams.status=apply_stsSearch;
			me.orderDeliveryRegister.loadPage(1); 	
			break;
		};
	},
	/**
	 * 搜索4
	 */
	doAction4:function(btn){
		var me = this;
		me.panel=me.getMngPurchaseOrderManager();
		switch(btn.itemId){
		case 'btn_search4':
			var condition=me.panel.down('#search4').getValue();
			var apply_stsSearch= me.panel.down('#state_search4').getValue()==1?1:0;
			me.qualityStore.proxy.extraParams.condition=condition;
			me.qualityStore.proxy.extraParams.status=apply_stsSearch;
			me.qualityStore.proxy.extraParams.start_time=me.panel.down('#start_time').getValue();
			me.qualityStore.proxy.extraParams.end_time=me.panel.down('#end_time').getValue();
			me.qualityStore.loadPage(1); 	
			break;
		};
	}
});
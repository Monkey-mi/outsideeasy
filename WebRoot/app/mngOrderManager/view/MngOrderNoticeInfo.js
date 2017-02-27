Ext.define('srm.mngOrderManager.view.MngOrderNoticeInfo',{
	extend:'srm.ux.Window',
	alias:'widget.mngOrderNoticeInfo',
	width:980,
    height:800,
    modal : true,
    listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		me.noticedetailsStorevo = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryNoticedetails');//订单通知明细
		me.noticedetailsStorevx = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryNoticedetails');//订单通知明细
		Ext.apply(this,{
			title: '显示方式',
			layout:{
  	        	 type:'border',
  	        	 padding :2},
  	        	items:[{
                     region:'center',  	       
		             xtype:'tabpanel',		
		             items:[ 
                          {		           
			                title: '按订单',
				  	        itemId:'orders',
				  	        xtype:'grid',
							split:true,
				  		    columnLines:true,
				  		    store: me.noticedetailsStorevo,
				  		    columns:[
				  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
				  		                {text:'订单编号',dataIndex: 'order_bh',flex:1},
				  		                {text:'产品名称',dataIndex: 'product_name',flex:1},
			  							{text:'通知交期日期',dataIndex: 'notice_delivery_time',flex:0.5,xtype:'datecolumn',format:'Y-m-d'},
			  							{text: '确认交期日期',dataIndex: 'confirm_delivery_time',flex:0.5,xtype:'datecolumn',format:'Y-m-d'},	  							
			  							{text: '合同编号',dataIndex: 'htbh',flex:0.5},
			  							{text: '交期数量',dataIndex: 'number',flex:0.5},	
			  							{text: '单位',dataIndex: 'unit',flex:0.5},
			  							{text: '送达地址',dataIndex: 'delivery_address',flex:0.5}								  									  										  										  										  										  															  														  								  						  								  						 
			  		           		]
		  	             
                          },
                          {		           
 			                title: '按产品',
 				  	        itemId:'products',
 				  	        xtype:'grid',
							split:true,
				  		    columnLines:true,
				  		    store: me.noticedetailsStorevx,
				  		    columns:[
			  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},			  		            
			  		                {text:'产品名称',dataIndex: 'product_name',flex:1},
		  							{text:'通知交期日期',dataIndex: 'notice_delivery_time',flex:0.5,xtype:'datecolumn',format:'Y-m-d'},
		  							{text: '确认交期日期',dataIndex: 'confirm_delivery_time',flex:0.5,xtype:'datecolumn',format:'Y-m-d'},	  							
		  							{text: '合同编号',dataIndex: 'htbh',flex:0.5},
		  							{text: '交期数量',dataIndex: 'number',flex:0.5},	
		  							{text: '单位',dataIndex: 'unit',flex:0.5},
		  							{text: '送达地址',dataIndex: 'delivery_address',flex:0.5}								  									  										  										  										  										  															  														  								  						  								  						 
		  		           		]  	          		  	             
                           },
                          ]
  	        	}]
		});
		me.callParent(arguments);
	},
	loadData:function(rec){
		var me=this;
		me.noticedetailsStorevx.load({
			params:{
				detailId:"true",
				delivery_notice_id :rec.get("delivery_notice_id"),
				usePaging:false
			}
		});
		me.noticedetailsStorevo.load({
			params:{
				orderId:"true",
				delivery_notice_id :rec.get("delivery_notice_id"),
				usePaging:false
			}
		});
	}
});
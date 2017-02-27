Ext.define('srm.mngOrderManager.view.MngPurchaseOrderManager',{
	extend:'srm.ux.Panel',
	alias:'widget.MngPurchaseOrderManager',	

	initComponent:function(){
		var me=this;
		me.orderStore = Ext.create('srm.mngOrderManager.store.MngPurchaseOrder');//订单
		me.orderDetailsStore = Ext.create('srm.mngOrderManager.store.MngPurchaseOrderDetails');	//订单明细
		me.noticeStore = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryNotice');//订单通知
		me.noticedetailsStore = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryNoticedetails');//订单通知明细
		me.orderDeliveryRegister = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryRegister');//送货登记
		me.orderDeliveryRegisterDetails = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryRegisterDetails');//送货登记详情
		me.orderDeliveryAttached = Ext.create('srm.mngOrderManager.store.MngOrderDeliveryAttached');//送货登记附件
		me.qualityStore = Ext.create('srm.mngOrderManager.store.MngOrderQualitycheck');//质检反馈
	    me.checkDetailsStore = Ext.create('srm.mngOrderManager.store.MngOrderCheckDetails');//质检反馈详情
	    
			Ext.apply(this,{
				layout:{
	  	        	 type:'border',
	  	        	 padding :2},
	  	        	items:[{
                         region:'center',  	       
			             xtype:'tabpanel',		
    		             items:[ 
                              {		           
		                 title: '采购订单列表',
			  	         itemId:'order',
			  	         layout:{
			  	        	 type:'border',
			  	        	 padding :2},
			  	             items:[
			  	                {  
					        	region:'center',
					        	split: true,
					        	flex:2,
					        	title: '订单列表',	    	 	  				      				    	
				  				xtype:'gridpanel',
				  				itemId:'grid_order',		
				  		  		store: me.orderStore,
				  				columnLines:true,
				  				dockedItems:[{
				   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
				   	  	  			items:[
				   	  	  			 {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入订单编号、采购方公司或者供方公司关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
				   	  	  			 {xtype:'combo',itemId:'state_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:180,
						 					store:[[10,'已提交'],[20,'已接单'],[30,'交货完成'],[40,'提出终止'],[50,'终止'],[60,'取消']]
						 				},
				   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'}
				   	  	  			]
				   	  	  			},
						   	  		   {
										    xtype : 'pagingbar',
				                            stateId : "pagingbar"+Ext.id(),
											store : me.orderStore,
											dock : 'bottom',
											defaultPageSize:25,
											displayInfo : true
									    }],
				  				        columns:[
			                                {text:'序号',xtype:'rownumberer',align:'center',flex:0.2},	  							
				  							{text: '订单编号',dataIndex: 'order_bh',flex:1},
				  							{text: '合同编号',dataIndex: 'agreement_bh',flex:1},
				  							{text: '订单状态',dataIndex: 'order_status',flex:1,
				  								renderer: function(value,metaData,record,colIndex,store,view) { 
				  						            if(value == 10){
				  						            	return '已提交';
				  						            }else if(value == 20){
				  						            	return '已接单';
				  						            }else if(value == 30){
				  						            	return '交货完成';
				  						            }else if(value == 40){
				  						            	return '提出终止';
				  						            }else if(value == 50){
				  						            	return '终止';
				  						            }else if(value == 60){
				  						            	return '取消';
				  						            }}
				  						         },  						
				  							{text: '采购方公司',dataIndex: 'pur_cpyname_cn',flex:1},
				  							{text: '供方公司',dataIndex: 'sup_cpyname_cn',flex:1},
				  							{text:'提交时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d'},	  								  							
				  							{text: '订单总金额(元)',dataIndex: 'sum_money',flex:1},
				  							{text:'最早交期日期',dataIndex: 'delivery_date',flex:1,xtype:'datecolumn',format:'Y-m-d'}
				  		           		]	  		           	  					   	  				   
					        },
					        {
					        	region:'south',		        	
								title:'产品明细信息',
								xtype:'grid',
								split:true,
							    flex:1,	
							    itemId:'grid_productList',
					  		    store: me.orderDetailsStore,
					  		    columnLines:true,
					  		    columns:[
					  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
				  							{text:'产品名称',dataIndex: 'product_name',flex:5},
				  							{text: '产品货号',dataIndex: 'product_artno',flex:1},	  							
				  							{text: '产品规格尺寸',dataIndex: 'product_size',flex:1},
				  							{text: '单价',dataIndex: 'unit_price',flex:1},
				  							{text: '数量',dataIndex: 'number',flex:1},
				  							{text: '单位',dataIndex: 'unit',flex:1},
				  							{text: '金额(元)',dataIndex: 'money',flex:1},
				  							{text: '交期日期',dataIndex: 'delivery_date',flex:1,xtype:'datecolumn',format:'Y-m-d'},
				  							{text: '到货数量',dataIndex: 'delivery_num',flex:1},
				  							{text: '入库数量',dataIndex: 'storage_num',flex:1},
				  							{text: '采购未完数量',dataIndex: 'no_delivery_num',flex:1},
				  							{text: '备注',dataIndex: 'remark',flex:1}  									  								  						  								  						 
				  		           		]
							}
					        
		                ]
		                },
		                {          
		                 title: '送货通知',
		   	  	         itemId:'notice', 		   	  	        					  	      
		   	  	         layout:{
					  	        type:'border',
					  	        padding :2},
					  	 items:[
					  	                {  							        	     
							        	    region:'center',
								        	split: true,
								        	flex:2,
								        	title: '送货通知列表',	    	 	  				      				    	
							  				xtype:'gridpanel',
							  				itemId:'grid_notice',		
							  		  		store: me.noticeStore,
							  				columnLines:true,
							  				dockedItems:[{
							   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar3',
							   	  	  			items:[
							   	  	  			 {xtype:'textfield',itemId:'search2',fieldLabel:'快速查询',emptyText:'输入订单编号、合同号、通知编号、产品名称关键字检索关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
							   	  	  			 {xtype:'combo',itemId:'state_search2',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:180,
									 					store:[[0,'提交,等待确认'],[1,'交期已修改'],[2,'已确认交期']]
									 				},
							   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search2'}
							   	  	  			]
							   	  	  			},
									   	  		   {
													    xtype : 'pagingbar',
							                            stateId : "pagingbar"+Ext.id(),
														store : me.noticeStore,
														dock : 'bottom',
														defaultPageSize:25,
														displayInfo : true
												    }],
							  				        columns:[
						                                {text:'序号',xtype:'rownumberer',align:'center',flex:0.2},	  							
							  							{text: '通知编号',dataIndex: 'delivery_notice_bh',flex:1.5},
							  							{text: '通知时间',dataIndex: 'notice_dt',flex:1,xtype:'datecolumn',format:'Y-m-d'},
							  							{text: '通知状态',dataIndex: 'notice_status',flex:1,
							  								renderer: function(value,metaData,record,colIndex,store,view) { 
							  						            if(value == 0){
							  						            	return '提交,等待确认';
							  						            }else if(value == 1){
							  						            	return '交期已修改';
							  						            }else if(value == 2){
							  						            	return '已确认交期';
							  						            }}},						  													
							  							{text: '数据来源',dataIndex: 'source_type',flex:0.5,
							  								renderer: function(value,metaData,record,colIndex,store,view) { 
							  						            if(value == 0){
							  						            	return 'po端';
							  						            }else if(value == 1){
							  						            	return '平台';
							  						            }}},
							  							{text: '创建人名',dataIndex: 'creator_name',flex:1},
							  							{text:'采购方平台',dataIndex: 'receive_cpyname_cn',flex:1},	  								  							
							  							{text: '供方平台',dataIndex: 'send_cpyname_cn',flex:1},
							  							{text:'更新时间',dataIndex: 'update_dt',flex:1,xtype:'datecolumn',format:'Y-m-d'}
							  		           		]	  
					  	                },
					  	                {  
								        	 region:'south',
								        	 title:'送货通知的明细',
												xtype:'grid',
												split:true,
											    flex:1,	
											    itemId:'grid_Noticedetails',
									  		    store: me.noticedetailsStore,
									  		    columnLines:true,
									  		    columns:[
									  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
								  							{text:'通知交期日期',dataIndex: 'notice_delivery_time',flex:1,xtype:'datecolumn',format:'Y-m-d'},
								  							{text: '确认交期日期',dataIndex: 'confirm_delivery_time',flex:1,xtype:'datecolumn',format:'Y-m-d'},	  							
								  							{text: '交期数量',dataIndex: 'number',flex:0.5},								  						
								  							{text: '送达地址',dataIndex: 'delivery_address',flex:1},								  						
								  							{text: '是否可修改交期',dataIndex: 'is_edit',flex:0.5,
								  								renderer: function(value,metaData,record,colIndex,store,view) { 
								  						            if(value == 0){
								  						            	return '可修改';
								  						            }else if(value == 1){
								  						            	return '不可修改';
								  						            }}},
								  							{text: '合同编号',dataIndex: 'htbh',flex:0.5},
								  							{text: '合同序号',dataIndex: 'htxh',flex:1},
								  							{text: '材料 货号',dataIndex: 'clhh',flex:1},
								  							{text: '交期是否有修改过',dataIndex: 'is_modified',flex:0.5,
								  								renderer: function(value,metaData,record,colIndex,store,view) { 
								  						            if(value == 0){
								  						            	return '未修改';
								  						            }else if(value == 1){
								  						            	return '修改过';
								  						            }}}								  														  								  						  								  						 
								  		           		]
						  	                },
					  	                ]
				   	  	         },
		                {          
			                 title: '送货登记',
			   	  	         itemId:'register', 		   	  	        					  	      
			   	  	         layout:{
						  	        type:'border',
						  	        padding :2},
						  	 items:[
						  	                {  							        	     
								        	    region:'center',
									        	split: true,
									        	flex:2,
									        	title: '送货登记列表',	    	 	  				      				    	
								  				xtype:'gridpanel',
								  				itemId:'grid_register',		
								  		  		store: me.orderDeliveryRegister,
								  				columnLines:true,
								  				dockedItems:[{
								   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar4',
								   	  	  			items:[
								   	  	  			 {xtype:'textfield',itemId:'search3',fieldLabel:'快速查询',emptyText:'输入送货单号、订单编号、合同号关键字检索关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
								   	  	  			
								   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search3'}
								   	  	  			]
								   	  	  			},
										   	  		   {
														    xtype : 'pagingbar',
								                            stateId : "pagingbar"+Ext.id(),
															store : me.orderDeliveryRegister,
															dock : 'bottom',
															defaultPageSize:25,
															displayInfo : true
													    }],
								  				        columns:[
							                                {text:'序号',xtype:'rownumberer',align:'center',flex:0.2},	  							
								  							{text: '送货单号',dataIndex: 'delivery_number',flex:0.5},
								  							{text: '送货时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'							  						},						  													
								  							{text: '创建人名',dataIndex: 'creator_name',flex:0.5},
								  							{text: '送货方公司名称',dataIndex: 'send_cpyname_cn',flex:1},
								  							{text:'收货方公司名称',dataIndex: 'receive_cpyname_cn',flex:1},	  								  							
								  							{text: 'PO是否已获取过',dataIndex: 'is_get',flex:0.5
								  								}								  							
								  		           		]	  
						  	                },
						  	                {  									        									        	
						                         region:'south',  	       
									             xtype:'tabpanel',
									             flex:1,	
						    		             items:[
						    		             {
									        	    title:'送货登记明细',
													xtype:'grid',
													split:true,
												    
												    itemId:'grid_RegisterDetails',
										  		    store: me.orderDeliveryRegisterDetails,
										  		    columnLines:true,
										  		    columns:[
										  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
									  							{text:'订单编号',dataIndex: 'order_bh',flex:1},
									  							{text: '合同编号',dataIndex: 'agreement_bh',flex:1},	  							
									  							{text: '传送对象',dataIndex: 'go_type',flex:0.5,
									  								renderer: function(value,metaData,record,colIndex,store,view) { 
									  						            if(value == 0){
									  						            	return 'po协同功能';
									  						            }else if(value == 1){
									  						            	return '后期平台自主功能';
									  						            }}}								  						
									  														  														  								  						  								  						 
									  		           		]
						    		             },
						    		             {
										        	    title:'送货登记附件',
														xtype:'grid',
														split:true,
													   
													    itemId:'grid_Delivery_attached',
											  		    store: me.orderDeliveryAttached,
											  		    columnLines:true,
											  		    columns:[
											  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
										  							{text:'上传文件名称',dataIndex: 'file_name',flex:0.5},
										  							{text: '文件格式',dataIndex: 'suffix_name',flex:0.5},	  							
										  							{text: '创建时间',dataIndex: 'create_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'}	,
										  							{text: '文件类型',dataIndex: 'file_type_id',flex:1,
										  								renderer: function(value,metaData,record,colIndex,store,view) { 
										  						            if(value == 41){
										  						            	return '送货单';
										  						            }else if(value == 51){
										  						            	return '出厂报告';
										  						            }else {
										  						            	return '其他';
										  						            }}
										  							},
										  						     {
										  						        text:'操作',xtype:'actioncolumn',flex:0.5,
																		items:[{
																			tooltip:'下载',
																			icon:'resources/images/icon/download.png',
																			handler:function(grid,rowIndex,colIndex){
																				var rec = grid.getStore().getAt(rowIndex);
																				if(Ext.isEmpty(rec.get('mogodb_id')))
																				{
																					Ext.Msg.alert('提示','未上传，无法下载');return;
																				}
																				var src1='fileopt/downLoadFileFormMongo.do?filename='+rec.get('mogodb_id');
																				window.open(src1, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
																			}
																		}
																		]
																			
										  							 }	,
										  														  														  								  						  								  						 
										  		           		]
							    		             }
						    		             ]
							  	                },
						  	                ]
					   	  	         },
					   	  	         {          
						                 title: '质检反馈',
						   	  	         itemId:'quality', 		   	  	        					  	      
						   	  	         layout:{
									  	        type:'border',
									  	        padding :2},
									  	 items:[
									  	                {  							        	     
											        	    region:'center',
												        	split: true,
												        	flex:2,
												        	title: '质检反馈列表',	    	 	  				      				    	
											  				xtype:'gridpanel',
											  				itemId:'grid_quality',		
											  		  		store: me.qualityStore,
											  				columnLines:true,
											  				dockedItems:[{
											   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar5',
											   	  	  			items:[
											   	  	  			 {xtype:'textfield',itemId:'search4',fieldLabel:'快速查询',emptyText:'输入送货单号、采购商名称关键字检索关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
											   	  	  			 {xtype:'combo',itemId:'state_search4',fieldLabel:'日期类型',emptyText:'送货日期',labelWidth:60,labelAlign:'right',width:180,
													 					store:[[0,'送货日期'],[1,'质检日期']]
													 				},
													 			{xtype:'datefield',itemId:"start_time",fieldLabel:"起始时间",labelWidth:60,width:120},
													 			{xtype:'datefield',itemId:"end_time",fieldLabel:"结束时间",labelWidth:60,width:120},
											   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search4'}
											   	  	  			]
											   	  	  			},
													   	  		   {
																	    xtype : 'pagingbar',
											                            stateId : "pagingbar"+Ext.id(),
																		store : me.qualityStore,
																		dock : 'bottom',
																		defaultPageSize:25,
																		displayInfo : true
																    }],
											  				        columns:[
										                                {text:'序号',xtype:'rownumberer',align:'center',flex:0.2},	  							
											  							{text: '质检人名',dataIndex: 'checkor_name',flex:0.5},
											  							{text: '质检时间',dataIndex: 'check_dt',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'},					  													
											  							{text: '数据来源',dataIndex: 'source_type',flex:0.5,
											  								renderer: function(value,metaData,record,colIndex,store,view) { 
											  						            if(value == 0){
											  						            	return 'po端';
											  						            }else if(value == 1){
											  						            	return '平台';
											  						            }}},
											  							{text: '送货日期',dataIndex: 'delivery_dt',flex:0.5,xtype:'datecolumn',format:'Y-m-d '},
											  							{text:'送货单号',dataIndex: 'delivery_number',flex:0.5},	  								  							
											  							{text: '采购方平台企',dataIndex: 'receive_cpyname_cn',flex:1}	,
											  							{text: '供方平台企业',dataIndex: 'send_cpyname_cn',flex:1},
											  							{text: '供方对应采购方档案号',dataIndex: 'supplier_id',flex:0.5}	
											  		           		]	  
									  	                },
									  	                {  
												        	 region:'south',
												        	 title:'质检反馈明细',
																xtype:'grid',
																split:true,
															    flex:1,	
															    itemId:'grid_CheckDetails',
													  		    store: me.checkDetailsStore,
													  		    columnLines:true,
													  		    columns:[
													  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
												  							{text:'数量',dataIndex: 'check_number',flex:1},
												  							{text: '质检结论',dataIndex: 'check_result',flex:1},	  							
												  							{text: '质检判定',dataIndex: 'check_vote',flex:0.5,
												  								renderer: function(value,metaData,record,colIndex,store,view) { 
												  						            if(value == 0){
												  						            	return 'po协同功能';
												  						            }else if(value == 1){
												  						            	return '后期平台自主功能';
												  						            }}}	,
												  						    {text:'创建时间',dataIndex: 'create_dt',flex:1}
												  														  														  								  						  								  						 
												  		           		]
										  	                },
									  	                ]
								   	  	         }]
		   	  	         }
                ]
	  	        		
			});
    	this.callParent(arguments);    	
    }
});
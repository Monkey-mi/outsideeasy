Ext.define('srm.mngOrderManager.view.MngPurchaseOrderMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.MngPurchaseOrderMainInfo',
	requires : [
	            'srm.ux.SearchCombobox'
	            ],	
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
		me.orderDetailsStore=Ext.create('srm.mngOrderManager.store.MngPurchaseOrderDetails');
		me.orderDetailsStore.load({
			params:{
				pur_order_id:me.rec.get('pur_order_id')
			}
		}); 
		me.orderAttchedStore=Ext.create('srm.mngOrderManager.store.MngOrderAttchedFile');
		me.orderAttchedStore.load({
			params:{
				pur_order_id:me.rec.get('pur_order_id')
			}
		}); 
		me.orderAgreementStore=Ext.create('srm.mngOrderManager.store.MngOrderAgreementFile');
		me.orderAgreementStore.load({
			params:{
				pur_order_id:me.rec.get('pur_order_id')
			}
		});
		
		me.orderRequirementStore = Ext.create('srm.mngOrderManager.store.MngOrderRequirement');
		me.orderDdeliveryNoticeStore=Ext.create('srm.mngOrderManager.store.MngOrderDeliveryNoticedetails');
		me.orderDdeliveryNoticeStore.load({
			params:{
				pur_order_id:me.rec.get('pur_order_id')
			}
		}); 
		me.commuStore=Ext.create('srm.mngOrderManager.store.MngOrderCommunication');
		me.commuStore.load({
			params:{
				pur_order_id:me.rec.get('pur_order_id'),
				parent_id:0,
				module_type:1
			}
		}); 
		me.first_areastore=Ext.create('srm.supplierManager.store.Area');
		me.first_areastore=Ext.create('srm.supplierManager.store.Area');
		me.first_areastore.load({
			params:{
				levelType:1
			}
		});
		me.contact_second_areastore=Ext.create('srm.supplierManager.store.Area');
		me.contact_third_areastore=Ext.create('srm.supplierManager.store.Area');
		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2
				
			},
			tbar:[	   {text:'关闭',glyph:0xf00d,
	    				handler:function(){
	    					me.close();	
	    				}
	    			}],
			items:[{
				region:'center',
				xtype:'form',
				flex:2,
				title:'订单信息',
				bodyPadding: 10,
				itemId:'grid_Order',
				autoScroll:true,
				layout: 'column',
	       		defaults:{labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'0 4 4 4',
					msgTarget : 'side',
					readOnly:true,
					autoFitErrors : true},
				items:
				[
					{fieldLabel:'订单编号',name:'order_bh',columnWidth:0.25},
					{fieldLabel:'合同编号',name:'agreement_bh',columnWidth:0.25,readOnly:true},
					{fieldLabel:'订单总金额',name:'sum_money',columnWidth:0.25,maxLength:50,allowBlank:false},
					{fieldLabel:'状态',name:'order_status',columnWidth:0.25,xtype: 'combo',        
   		 	            store: [
   		 	                    ['10','已提交'],['20','已接单'],['30','交货完成'],['40','提出终止'],['50','终止'],
   		 	                    ['60','取消']
   		 	                ]},
					{fieldLabel:'采购方公司名称',name:'pur_cpyname_cn',columnWidth:0.4},
					{fieldLabel:'采购方建单人名',name:'pur_creator_name',columnWidth:0.3},
					{fieldLabel:'采购方开票抬头',name:'pur_invoice_title',columnWidth:0.3,maxLength:20},
					{
								itemId:'area_pro_contact',
								fieldLabel:'采购方收货地址',
								
								queryMode:'local',
								name:'area_pro_contact',
								columnWidth:2/9,
								xtype:'combo',
								store :me.first_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
								allowBlank:false,
								emptyText:'(必填项)',
								listeners:{						
									'change':function( field,nv,ov){
										var form=me.down('form').getForm();
										var area_cityfield=form.findField('area_city_contact');
										if(!Ext.isEmpty(nv)){
											me.contact_second_areastore.load({
												params:{
													levelType:2,
													f_id:nv
												}
											});
										}
									}
								}
							},
							{
								
								
								itemId:'area_city_contact',
								name:'area_city_contact',
								columnWidth:1/9,
								xtype:'combo',
								store :me.contact_second_areastore,
								queryMode:'local',
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
								allowBlank:false,
								emptyText:'(必填项)',
								listeners:{						
									'change':function( field,nv,ov){
										var form=me.down('form').getForm();
										var reg_addr_codefield=form.findField('contact_addr_code');
										if(!Ext.isEmpty(nv)){
											me.contact_third_areastore.load({
												params:{
													levelType:3,
													f_id:nv
												}
											});
										}
									}
								}
							},
							{
								itemId:'delivery_address_id',
								name:'delivery_address_id',
								columnWidth:1/9,
								xtype:'combo',
								queryMode:'local',
								store :me.contact_third_areastore,
								displayField:'area_name',
								valueField:'area_id',
								allowBlank:false,
								emptyText:'(必填项)',
								forceSelection:true
							},
					{
						itemId:'pur_delivery_address',
						name:'pur_delivery_address',
						
						columnWidth:1/3
					},
					{fieldLabel:'采购方收货联系人',name:'pur_delivery_contact',columnWidth:0.5},
					{fieldLabel:'采购方收货联系人电话',name:'pur_delivery_contact_phone',columnWidth:0.5},
					{fieldLabel:'采购方订单备忘',name:'pur_memo',columnWidth:1},
					{fieldLabel:'供方公司名称',name:'sup_cpyname_cn',columnWidth:0.5},
					{fieldLabel:'供方联系地址',name:'sup_contact_address',columnWidth:0.5},
					{fieldLabel:'供方联系人',name:'sup_contact',columnWidth:0.3},
					{fieldLabel:'供方联系电话',name:'sup_contact_phone',columnWidth:0.3},
					{fieldLabel:'最早交期日期',name:'delivery_date',columnWidth:0.4,xtype:'datefield',format:'Y-m-d'},
					{fieldLabel:'供方订单备忘',name:'sup_memo',columnWidth:1},
					{fieldLabel:'订单备注',name:'order_remark',columnWidth:1}
				]
			},
				{
					xtype:'tabpanel',
					flex:2,
					region:'south',
					title:'详细信息',
					items:[
						{
				    		title:'产品明细',
				    		layout:'absolute',
				    		overflowY: 'auto',
				    		overflowX:'auto',
				    		items:[
				    		{
				    			xtype:'grid',
				    			x:2,
				    			y:2,
				    			columns:[
				    			{header:'主键',dataIndex:'order_detail_id',width:60},
				    			{header:'产品名称',dataIndex:'product_name',width:500},
				    			{header:'产品货号',dataIndex:'product_artno',width:100},
				    			{header:'产品规格尺寸',dataIndex:'product_size',width:120},
				    			{header:'单价',dataIndex:'unit_price',width:60},
				    			{header:'数量',dataIndex:'number',width:60},
				    			{header:'单位',dataIndex:'unit',width:80},
				    			{header:'金额',dataIndex:'money',width:100},
				    			{header:'交期日期',dataIndex:'delivery_date',width:120,xtype:'datecolumn',format:'Y-m-d'},
				    			{header:'到货数量',dataIndex:'delivery_num',width:80},
					   	  	  	{header:'入库数量',dataIndex:'storage_num',width:80},
				    			{header:'采购未完数量',dataIndex:'no_delivery_num',width:80},
				    			{header:'备注',dataIndex:'remark',width:200}
				    			],
						    	store:me.orderDetailsStore
				    		}
				    		]
				    	
						},							
							{							
					    		title:'采购要求',
					    		itemId:'requirement',
					    		xtype:'textarea',					    	
					    		readOnly:true					    							    							    	
							},
							{							
					    		title:'合同条款',
					    		itemId:'contractTerms',
					    		xtype:'textarea',				    		
					    		readOnly:true					    							    							    	
							},
						   {
								title:'订单文件',
					    		layout:'absolute',
					    		overflowY: 'auto',
					    		overflowX:'auto',
					    		items:[
					    		{
					    			xtype:'grid',
					    			x:2,
					    			y:2,
					    			columns:[
					    			{header:'主键',dataIndex:'order_attched_id',width:60},
					    			{header:'合同编号',dataIndex:'order_bh',width:100},
					    			{header:'文件名称',dataIndex:'order_attched_name',width:100},
					    			{header:'文件类型',dataIndex:'type_name',width:120},
					    			{header:'文件后缀',dataIndex:'suffix_name',width:80},
					    			{header:'文件备注',dataIndex:'order_attched_remark',width:200},
					    			{header:'文件状态',dataIndex:'status',width:80,
					    				renderer:function(v,metaData){
								            if(v==0){
								            	return '正常';
								            }else{
								            	return '废止';
								            } 
								        }},
					    			{header:'创建者名称',dataIndex:'creator_name',width:100},
					    			{header:'创建时间',dataIndex:'create_dt',width:120,xtype:'datecolumn',format:'Y-m-d'},
					    			{
										header:'操作',xtype:'actioncolumn',width:60,
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
									}
					    			],
							    	store:me.orderAttchedStore
					    		}
					    		]

							  },
						  {
								  title:'订单合同',
						    		layout:'absolute',
						    		overflowY: 'auto',
						    		overflowX:'auto',
						    		items:[
						    		{
						    			xtype:'grid',
						    			x:2,
						    			y:2,
						    			columns:[
						    			{header:'主键',dataIndex:'agreement_id',width:60},
						    			{header:'合同编号',dataIndex:'agreement_bh',width:100},
						    			{header:'合同状态',dataIndex:'agreement_status',width:100,
						    				renderer:function(v,metaData){
									            if(v==0){
									            	return '采购方提交';
									            }else{
									            	return '供方回签';
									            } 
									        }},
						    			{header:'合同名称',dataIndex:'agreement_name',width:120},
						    			{header:'合同文件类型',dataIndex:'suffix_name',width:80},
						    			{header:'创建者名称',dataIndex:'creator_name',width:100},
						    			{header:'创建时间',dataIndex:'create_dt',width:120,xtype:'datecolumn',format:'Y-m-d'},
						    			{
											header:'操作',xtype:'actioncolumn',width:60,
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
										}
						    			],
								    	store:me.orderAgreementStore
						    		}
						    		]
									  		  
								 },

						 {
									 title:'送货通知',
							    		layout:'absolute',
							    		overflowY: 'auto',
							    		overflowX:'auto',
							    		items:[
							    		{
							    			xtype:'grid',
							    			x:2,
							    			y:2,
							    			columns:[
							    			{header:'主键',dataIndex:'details_id',width:60},
							    			{header:'通知编号',dataIndex:'delivery_notice_bh',width:150},
							    			{header:'通知状态',dataIndex:'notice_status',width:100,
							    				renderer:function(v,metaData){
										            if(v==0){
										            	return '提交，等待确认';
										            }else if(v==1){
										            	return '修改交期';
										            }else{
										            	return '确认交期';
										            } 
										        }},
							    			{header:'通知时间',dataIndex:'notice_dt',width:120,xtype:'datecolumn',format:'Y-m-d'},
							    			{header:'产品名称',dataIndex:'product_name',width:500},
							    			{header:'产品货号',dataIndex:'product_artno',width:100},
							    			{header:'产品尺寸',dataIndex:'product_size',width:120},
							    			{header:'交期数量',dataIndex:'number',width:100},
							    			{header:'单位',dataIndex:'unit',width:60},
							    			{header:'通知交期日期',dataIndex:'notice_delivery_time',width:120,xtype:'datecolumn',format:'Y-m-d'},
							    			{header:'确认交期日期',dataIndex:'confirm_delivery_time',width:120,xtype:'datecolumn',format:'Y-m-d'}
							    			],
									    	store:me.orderDdeliveryNoticeStore
							    		}
							    		]
											  		 
						      },
						 {
						      title:'交流合作',
						      layout:'absolute',
					    		overflowY: 'auto',
					    		overflowX:'auto',
					    		items:[
					    		{
					    			xtype:'grid',
					    			x:2,
					    			y:2,
					    			columns:[
								    			{header:'主键',dataIndex:'id',width:60},
								    			{header:'父留言主键',dataIndex:'parent_id',width:80},
								    			{header:'留言公司',dataIndex:'company_name',width:200},
								    			{header:'留言时间',dataIndex:'create_time',width:180,xtype:'datecolumn',format:'Y-m-d H:m:s'},
								    			{header:'留言内容',dataIndex:'com_message',width:300,
								    				renderer: function(value, meta, record) {
				                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';   
				                                          return value;   
				                                     }
								    			}
								    			],
							    	store:me.commuStore
					    		}
					    		]								  									   	  		  
						       }
						  ]	
				}]
			});
		me.callParent(arguments);
		me.loadData(me.rec);
	},
   loadData:function(rec){
	var me=this;
	var contact_addr_code=rec.get('delivery_address_id')+"";
	if(!Ext.isEmpty(contact_addr_code)){
		var area_pro_contact=parseInt(contact_addr_code.substring(0,2)+"0000");
		var area_city_contact=parseInt(contact_addr_code.substring(0,4)+"00");
		rec.set('area_pro_contact',area_pro_contact);
		rec.set('area_city_contact',area_city_contact);
		me.contact_second_areastore.load({
			params:{
				levelType:2,
				f_id:area_pro_contact
			}
		});
		me.contact_third_areastore.load({
			params:{
				levelType:3,
				f_id:area_city_contact
			}
		});
	}
	me.down("form").loadRecord(rec);
	//合同条款和采购要求
	me.orderRequirementStore.load({
		params:{
			pur_order_id:me.rec.get('pur_order_id')
		},
		callback: function (record, options, success) {
			for(var i=0;i<record.length;i++){
				me.down("#requirement").setValue(me.orderRequirementStore.data.items[i].data.req_text);
				me.down("#contractTerms").setValue(me.orderRequirementStore.data.items[i].data.contract_terms);
			}
		}
	}) ;
	//console.log(me.orderRequirementStore.data.items[0].data.contract_terms);
}

});
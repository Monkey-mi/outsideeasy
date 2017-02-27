Ext.define('srm.enquiryQuote.enquiry.view.EnquiryManager',{
	extend:'srm.ux.Panel',
	alias:'widget.enquiryManager',
	
	initComponent:function(){
		var me=this;
		me.can_use_btn=true;
		me.store=Ext.create('srm.enquiryQuote.enquiry.store.Enquiry');
		me.detailstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDetail');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		me.materialClassstore=Ext.create('srm.enquiryQuote.enquiry.store.TempMaterialClass');
		me.treeStore=Ext.create('srm.basicdata.materialClass.store.MaterialClassTree');
		me.materialClassstore.load();
		me.distributionstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDistribution');
		me.quotationstore=Ext.create('srm.enquiryQuote.enquiry.store.TempQuotation');
		Ext.apply(me.quotationstore.proxy.extraParams,{usePaging:false});
		me.quotationdetailstore=Ext.create('srm.enquiryQuote.enquiry.store.TempQuotationDetail');
		Ext.apply(me,{
			layout:{
				type:'border',
				padding:2
			},
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId:'function_btn',
			    items:[
					{text: '新增',   glyph : 0xf016,itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
					{text: '删除',   glyph : 0xf014,itemId:'BTN_DEL',disabled:true},
					'-',
					{text: '发布', glyph:0xf108,itemId:'BTN_LOCK', disabled:true},
	  		    	{text: '终止', glyph:0xf058,itemId:'BTN_FINISH', disabled:true},
					{text: '筛选', glyph:0xf002,itemId:'btn_query'}
				]
			}],
			items:[
			{
				flex:1,
				region:'center',
				xtype:'grid',
				itemId:'grd_Enquiry',
				
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				columns:[
					{header:'编号',dataIndex:'enquiry_id',width:40},
		   	  	  	{header:'询价项目',dataIndex:'enquiry_item',width:200,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
		   	  	  	{header:'询价日期',dataIndex:'enquiry_date',width:100,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		
	   	  	  		{header:'状态',dataIndex:'enquiry_status',width:120,
	   	  	  			renderer:function(v){
				            if(v==0){
				            	return "未发布";
				            }else if(v==1){
				            	return "询价中";
				            }else if(v==2){
				            	return "已终止";
				            }
				        }
	   	  	  		},
	   	  	  		{header:'发票',dataIndex:'invoice',width:80},
	   	  	  		{header:'税率',dataIndex:'tax_rate',width:100},
	   	  	  		{header:'付款方式',dataIndex:'payment_way',width:120,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
	   	  	  		{header:'报价截止日期',dataIndex:'enddate',width:100,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'备注说明',dataIndex:'remark',width:180,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
	   	  	  		{header:'询价人员',dataIndex:'enquiry_person',width:80}
	   	  	  		
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store
			},{
				region:'south',
				split:true,
				height:300,
				xtype:'tabpanel',
				items:[
				{
					xtype:'grid',
					itemId:'grd_EnquiryDistribution',
					title:'询价发布',
					columns:[
					{header:'',xtype:'rownumberer',width:25},					
					{header:'分发公司',dataIndex:'cpyname_cn',width:200,
						renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
					},
					{header:'分发日期',dataIndex:'distribute_date',width:100,xtype:'datecolumn',format:'Y-m-d'}
					],
					store:me.distributionstore
				}
				,{
					xtype:'panel',
					title:'询价明细',
					layout:'border',
					items:[
					{
						title:'明细内容',
						xtype:'grid',
						flex:1,
						region:'center',
						split:true,
						itemId:'grd_EnquiryDetail',
						columns:[
						{header:'顺序',dataIndex:'item_order',width:40},
						
						{header:'产品名称',dataIndex:'pro_name',width:200,
							renderer:function(v,metaData){
					            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				    			return v;
					        }
						},
						{header:'类别',dataIndex:'mc_id',width:120,
							renderer:function(value){
								var rec=me.materialClassstore.findRecord('mc_id',value,0,false,false,true);
								return Ext.isEmpty(rec)?value:rec.get('mc_name');
		   	  	  			}
						},
						{header:'数量',dataIndex:'qty',width:80,xtype:'numbercolumn',
				            renderer:function(v){
				            	return Ext.util.Format.number(v,'0,000');
				            }},
						{header:'单位',dataIndex:'unit',width:80},
						{header:'交货周期',dataIndex:'delivery_cycle',width:120},
						{header:'描述',dataIndex:'description',width:80},
						{header:'附件',dataIndex:'attched',width:80}
						],
						store:me.detailstore,
						listeners:{
							selectionchange:function(grid,recs){
								if(recs.length>0){
									me.quotationstore.load({
										params:{
											enquiry_detail_id:recs[0].get('enquiry_detail_id'),
											submitFlag:1
										}
									});
								}
							}
						}
					},
					{
						xtype:'panel',
						layout:'border',
						flex:1,
						split:true,
						collapsible:true,
						region:'east',
						title:'供应商报价',
						items:[
						{
							xtype:'grid',
							itemId:'grd_quotation',
							width:250,
							region:'center',
							split:true,
							viewConfig:{  
							 	enableTextSelection:true
							}, 
							columns:[
							{header:'编号',dataIndex:'quotation_id',width:40},
							
							{header:'公司名',dataIndex:'cpyname_cn',width:120,
								renderer:function(v,metaData){
						            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
					    			return v;
						        }
							},
							{header:'报价总额',dataIndex:'enquiry_price',width:80,xtype:'numbercolumn',
					            renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000.00');
					            }}
							],
							store:me.quotationstore,
							listeners:{
								selectionchange:function(grid,recs){
									if(recs.length>0){
										me.quotationdetailstore.load({params:{quotation_id:recs[0].get('quotation_id')}});
									}
								}
							}
						},
						{
							xtype:'grid',
							flex:1,
							region:'east',
							split:true,
							itemId:'grd_QuotationDetail',
							autoScroll :'true',
							features: [{
					            ftype: 'summary',
					            summaryType: 'count',
					     		dock: 'bottom'
					        }],
							columns:[
							{header:'顺序号',dataIndex:'item_order',width:60,
								summaryType: 'count',
				                summaryRenderer: function(value, summaryData, dataIndex) {
				                     return '合计';
				                }
							},
							{header:'项目名称',dataIndex:'item_name',width:120,
								renderer:function(v,metaData){
						            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
					    			return v;
						        }
							},
							{header:'项目描述',dataIndex:'item_description',width:120,
								renderer:function(v,metaData){
						            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
					    			return v;
						        }
							},
							{header:'数量',dataIndex:'qty',width:80,xtype:'numbercolumn',
					             summaryType: 'sum',
					             summaryRenderer: function(value, summaryData, dataIndex) {
					                   return Ext.util.Format.number(value,'0,000') ;
					             },
					            renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000');
					            }},
							{header:'单位',dataIndex:'uom',width:80},
							{header:'项目单价',dataIndex:'unit_price',width:100,
								 summaryType: 'sum',
					             summaryRenderer: function(value, summaryData, dataIndex) {
					                   return Ext.util.Format.number(value,'0,000') ;
					             }
							},
							{header:'项目总价',dataIndex:'total_prcie',width:100,
								 summaryType: 'sum',
					             summaryRenderer: function(value, summaryData, dataIndex) {
					                   return Ext.util.Format.number(value,'0,000') ;
					             },
								 renderer:function(v){
					            	return Ext.util.Format.number(v,'0,000.00');
					             }
							}
							],
							store:me.quotationdetailstore
						}
						]
						
					}
					]
				}
				]
			}
			]
		});
		me.callParent(arguments);
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_Enquiry').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
});
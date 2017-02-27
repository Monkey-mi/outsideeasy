//采购询价单列表页面
Ext.define('srm.supplierManager.view.PurchasingInquiryList',{
	extend:'srm.ux.Panel',
	requires:['srm.supplierManager.store.TempQuotation',
			'srm.enquiryQuote.quote.store.QuotationDetail'],
	alias:'widget.mng_PurchasingInquiryList',
	height:800,
	overflowY: 'auto',
	initComponent:function(){
		var  me=this;
		me.store=Ext.create('srm.supplierManager.store.TempQuotation');
		me.detailstore=Ext.create('srm.enquiryQuote.quote.store.QuotationDetail');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true,submitFlag:1});
		
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.condition;
			delete me.store.proxy.extraParams.submitFlag;
			delete me.store.proxy.extraParams.company_id;
 		});
		Ext.apply(me,{
			layout:'border',
			defaults:{padding:'0 0 4 0'},
	    	items:[
	    	{
	    		region:'center',
	    		flex:1,
	    		title:'询价单列表',
	    		overflowY:'auto',
    			autoScroll:true,
    			xtype:'grid',
				itemId:'grd_Quotation',
				
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				columns:[
					{header:'报价单编号',dataIndex:'quotation_id',width:40},
		   	  	  	{header:'报价公司',dataIndex:'cpyname_cn',width:120,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
		   	  	  	{header:'报价日期',dataIndex:'quote_date',width:100,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		
	   	  	  		{header:'状态',dataIndex:'status',width:120,
	   	  	  			renderer:function(v){
				            if(v==0){
				            	return "未提交";
				            }else if(v==1){
				            	return "报价中";
				            }else if(v==2){
				            	return "已终止";
				            }else{
				            	return v;
				            }
				        }
	   	  	  		},
	   	  	  		{header:'材料成本总额',dataIndex:'material_costs',width:80,xtype:'numbercolumn',format:'0,000.00'},
	   	  	  		{header:'加工成本总额',dataIndex:'process_cost',width:80,xtype:'numbercolumn',format:'0,000.00'},
	   	  	  		{header:'运输费',dataIndex:'transportation',width:80,xtype:'numbercolumn',format:'0,000.00'},
	   	  	  		{header:'其他费用描述',dataIndex:'other_item',width:120,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
	   	  	  		{header:'其他费用总额',dataIndex:'other_cost',width:80,xtype:'numbercolumn',format:'0,000.00'},
	   	  	  		{header:'增值税',dataIndex:'vat',width:80,xtype:'numbercolumn',format:'0.000'},
	   	  	  		{header:'报价总额',dataIndex:'enquiry_price',width:80,xtype:'numbercolumn',format:'0,000.00'}
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store,
					listeners:{
						selectionchange:function(grid,recs){
							if(recs.length>0){
								me.detailstore.load({params:{quotation_id:recs[0].get('quotation_id')}});
							}
						}
					}
	    		
	    		
	    	},{
	    		region:'south',
				split:true,
	    		title:'询价明细',
	    		height:300,
				xtype:'tabpanel',
				items:[
				{
					title:'明细内容',
					xtype:'grid',
					flex:1,
					region:'center',
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
					store:me.detailstore
						
					}
					]
	    		}]
		});
		this.callParent(arguments);
		
	},
	loadDate:function(supplier_rec){
		var me=this;
		Ext.apply(me.store.proxy.extraParams,{company_id:supplier_rec.get('company_id')});
		me.store.loadPage(1);
	}
});
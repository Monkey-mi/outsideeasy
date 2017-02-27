Ext.define('srm.enquiryQuote.quote.view.QuoteManager',{
	extend:'srm.ux.Panel',
	alias:'widget.quoteManager',
	autoScroll :'true',
	initComponent : function() {
		var me=this;
		me.cannotedit=true;
		me.enquirystore=Ext.create('srm.enquiryQuote.quote.store.Enquiry');
		Ext.apply(me.enquirystore.proxy.extraParams,{usePaging:true});
		me.materialClassstore=Ext.create('srm.supplier.store.MaterialClass');
		me.materialClassstore.load();
		me.detailstore=Ext.create('srm.enquiryQuote.quote.store.EnquiryDetail');
		Ext.apply(me.detailstore.proxy.extraParams,{usePaging:false});
		me.quotationstore=Ext.create('srm.enquiryQuote.quote.store.Quotation');
		Ext.apply(me.quotationstore.proxy.extraParams,{usePaging:false});
		me.quotationDetailStore=Ext.create('srm.enquiryQuote.quote.store.QuotationDetail');
		Ext.apply(me.quotationDetailStore.proxy.extraParams,{usePaging:false});
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			//功能路径
			dockedItems:[{
				itemId:'path_ctrl',
				xtype: 'toolbar',
			    dock: 'top',
				items:[
				{xtype:'panel',html:'<span style="color:#666;">当前位置:</span>'},
					{
						xtype:'buttontransparent',
						itemId:'first_level',
						text:'询价单',
						handler:function(){
							me.changeToShowView(1);
						}
					},{
						xtype:'panel',html:'>>',itemId:'first_toright',hidden:true
					},{
						xtype:'buttontransparent',
						itemId:'second_level',
						text:'询价详情',
						hidden:true,
						handler:function(){
							me.changeToShowView(2);
						}
					},{
						xtype:'panel',html:'>>',itemId:'second_toright',hidden:true
					},{
						xtype:'buttontransparent',
						hidden:true,
						itemId:'third_level',
						text:'报价'
					}
				]
			}],
			items:[
			{//询价主要信息
				xtype:'grid',
				height:560,
				title:'询价主要信息',
				itemId:'grd_head',
				hidden:true,
				autoScroll :'true',
				columns:[
					{header:'',xtype:'rownumberer',width:25},
		   	  	  	{header:'询价项目',dataIndex:'enquiry_item',width:200,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
	   	  	  		{header:'发起公司',dataIndex:'cpyname_cn',width:120},
		   	  	  	{header:'日期',dataIndex:'enquiry_date',width:100,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		
	   	  	  		{header:'状态',dataIndex:'enquiry_status',width:80,
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
	   	  	  		
	   	  	  		{header:'报价截止日期',dataIndex:'enddate',width:100,xtype:'datecolumn',format:'Y-m-d'},
	   	  	  		{header:'备注说明',dataIndex:'remark',width:180,
	   	  	  			renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
	   	  	  		},
	   	  	  		{header:'操作',xtype:'actioncolumn',width:120,
						items:[{
							icon:'resources/images/icon/book-open.png',
							tooltip:'查看详情',
							handler:function(grid,rowIndex,colIndex){
								var currentrec = grid.getStore().getAt(rowIndex);
								me.openEnquiryDetail(currentrec);
							}
						}]
					}
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
			    		store:me.enquirystore,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.enquirystore
			},
			{//询价详细信息
				xtype:'panel',
				height:540,
				hidden:true,
				itemId:'detail_panel',
				layout:{
					type:'vbox',
					align: 'stretch'
				},
				items:[
				{
					xtype:'form',
					itemId:'detailform',
					layout:'column',
					border:true,
					items:[
					{
						xtype: 'displayfield',
				        fieldLabel: '项目名称',
				        name: 'enquiry_item',
				        columnWidth:0.5
					},
					{
						xtype: 'datefield',
						border:0,
				        fieldLabel: '截止日期',
				        name: 'enddate',
				        readOnly:true,
				        columnWidth:0.5,
				        format:'Y-m-d'
					}
					]
				},
				{
					xtype:'grid',
					itemId:'grd_EnquiryDetail',
					title:'询价明细',
					height:450,
					autoScroll :'true',
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
					{header:'附件',dataIndex:'attched',width:100
						,renderer:function(v,metaData){
				            if(Ext.isEmpty(v)){
//				            	return '<div style="color:red">未上传</div>';
				            }else{
				            	return '<div style="color:green">有附件</div>';
				            } 
				        }
					},
					{header:'操作',xtype:'actioncolumn',width:120,
						items:[{
							icon:'resources/images/icon/download.png',
							tooltip:'下载附件',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								if(rec.get('enquiry_detail_id')<=0 || Ext.isEmpty(rec.get('attched'))){
									Ext.Msg.alert('提示','无附件');return;
								}
								var file_path=encodeURIComponent(encodeURIComponent(rec.get('attched')));
								window.open('common/downloadFile.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
							}
						},{
							icon:'resources/images/icon/page_edit.png',
							tooltip:'报价',
							handler:function(grid,rowIndex,colIndex){
								var currentrec = grid.getStore().getAt(rowIndex);
								me.openEditView(currentrec);
							}
						}]
					}
					],
					store:me.detailstore
				}
				]
			},
			{//报价界面
				xtype:'panel',
				hidden:true,
				height:560,
				itemId:'quote_panel',
				title:'报价界面',
				layout:{
					type:'vbox',
					align: 'stretch'
				},
				tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'},
		    				{text:'提交',glyph:0xf064,itemId:'BTN_SUBMIT',hidden:true},//前提要求：记录已经保存
		    				{text:'取消提交',glyph:0xf112,itemId:'BTN_DIS_SUBMIT',hidden:true}],
				items:[
				{
					xtype:'form',
					itemId:'quote_form',
					height:120,
					store:me.quotationstore,
					layout:'column',
					border:true,
					defaults:{labelWidth:100,xtype:'textfield',padding:3},
					items:[
					{
						fieldLabel:'报价单号',
						name:'quotation_id',
						columnWidth:.25,
						readOnly:true,
						fieldStyle:'background:#E6E6E6'	
					},
					{	fieldLabel:'报价公司',
						name:'cpyname_cn',
						columnWidth:.5,
						readOnly:true,
						fieldStyle:'background:#E6E6E6'		
					},
					{
						fieldLabel:'报价日期',
						name:'quote_date',
						xtype:'datefield',
						columnWidth:.25
					},
					{
						fieldLabel:'材料成本总额',
						name:'material_costs',
						xtype:'numberfield',
						itemId:'material_costs',
						decimalPrecision :2,
						columnWidth:.25,
						readOnly:true,
						listeners:{
							change:function(th,newValue,oldValue,eOpts)
							{
								//材料成本总额
								var material_costs=newValue;//me.down('#material_costs').getValue();
								//加工成本总额
								var process_cost=me.down('#process_cost').getValue();
								//运输费
								var transportation=me.down('#transportation').getValue();
								//其他费用总额
								var other_cost=me.down('#other_cost').getValue();
								//增值税
								var vat=me.down('#vat').getValue();
								var enquiry_price=(material_costs+process_cost+transportation+other_cost)*(1+vat);
								
								me.down('#enquiry_price').setValue(enquiry_price);
							}
						}
					},
					{
						fieldLabel:'加工成本总额',
						name:'process_cost',
						xtype:'numberfield',
						itemId:'process_cost',
						decimalPrecision :2,
						columnWidth:.25,
						listeners:{
							change:function(th,newValue,oldValue,eOpts)
							{
								//材料成本总额
								var material_costs=me.down('#material_costs').getValue();
								//加工成本总额
								var process_cost=newValue;//me.down('#process_cost').getValue();
								//运输费
								var transportation=me.down('#transportation').getValue();
								//其他费用总额
								var other_cost=me.down('#other_cost').getValue();
								//增值税
								var vat=me.down('#vat').getValue();
								var enquiry_price=(material_costs+process_cost+transportation+other_cost)*(1+vat);
								
								me.down('#enquiry_price').setValue(enquiry_price);
							}
						}
					},
					{
						fieldLabel:'运输费',
						name:'transportation',
						xtype:'numberfield',
						itemId:'transportation',
						decimalPrecision :2,
						columnWidth:.25,
						listeners:{
							change:function(th,newValue,oldValue,eOpts)
							{
								//材料成本总额
								var material_costs=me.down('#material_costs').getValue();
								//加工成本总额
								var process_cost=me.down('#process_cost').getValue();
								//运输费
								var transportation=newValue;//me.down('#transportation').getValue();
								//其他费用总额
								var other_cost=me.down('#other_cost').getValue();
								//增值税
								var vat=me.down('#vat').getValue();
								var enquiry_price=(material_costs+process_cost+transportation+other_cost)*(1+vat);
								
								me.down('#enquiry_price').setValue(enquiry_price);
							}
						}
					},
					{
						fieldLabel:'增值税',
						name:'vat',
						xtype:'numberfield',
						itemId:'vat',
						maxValue:0.99,
						decimalPrecision :3,
						columnWidth:.25,
						listeners:{
							change:function(th,newValue,oldValue,eOpts)
							{
								//材料成本总额
								var material_costs=me.down('#material_costs').getValue();
								//加工成本总额
								var process_cost=me.down('#process_cost').getValue();
								//运输费
								var transportation=me.down('#transportation').getValue();
								//其他费用总额
								var other_cost=me.down('#other_cost').getValue();
								//增值税
								var vat=newValue;//me.down('#vat').getValue();
								var enquiry_price=(material_costs+process_cost+transportation+other_cost)*(1+vat);
								
								me.down('#enquiry_price').setValue(enquiry_price);
							}
						}
					},
					{
						fieldLabel:'其他费用描述',
						name:'other_item',
						
						columnWidth:.5,
						maxLength:100,maxLengthText:'输入范围最大值为100个字符！'
					},
					{
						fieldLabel:'其他费用总额',
						name:'other_cost',
						itemId:'other_cost',
						xtype:'numberfield',
						decimalPrecision :2,
						columnWidth:.25,
						listeners:{
							change:function(th,newValue,oldValue,eOpts)
							{
								//材料成本总额
								var material_costs=me.down('#material_costs').getValue();
								//加工成本总额
								var process_cost=me.down('#process_cost').getValue();
								//运输费
								var transportation=me.down('#transportation').getValue();
								//其他费用总额
								var other_cost=newValue;//me.down('#other_cost').getValue();
								//增值税
								var vat=me.down('#vat').getValue();
								var enquiry_price=(material_costs+process_cost+transportation+other_cost)*(1+vat);
								
								me.down('#enquiry_price').setValue(enquiry_price);
							}
						}
					},
					{
						fieldLabel:'报价总额',
						name:'enquiry_price',
						xtype:'numberfield',
						itemId:'enquiry_price',
						decimalPrecision :2,
						columnWidth:.25
					}
					]
				},
				{//报价明细
					xtype:'grid',
					itemId:'grd_QuotationDetail',
					title:'报价明细',
					heigth:'400',
					autoScroll :'true',
					features: [{
			            ftype: 'summary',
			            summaryType: 'count',
			     		dock: 'bottom'
			        }],
			        tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_QuotationDetail'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_QuotationDetail'
						}],
					columns:[
					{header:'顺序号',dataIndex:'item_order',width:60,
						summaryType: 'count',
		                summaryRenderer: function(value, summaryData, dataIndex) {
		                     return '合计';
		                }
					},
					{header:'项目名称',dataIndex:'item_name',width:200,editor:{maxLength:100},
						renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
					},
					{header:'项目描述',dataIndex:'item_description',width:200,editor:{maxLength:150},
						renderer:function(v,metaData){
				            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			    			return v;
				        }
					},
					{header:'数量',dataIndex:'qty',width:80,xtype:'numbercolumn',editor:{xtype:'numberfield',decimalPrecision :4,minValue:0},
			             summaryType: 'sum',
			             summaryRenderer: function(value, summaryData, dataIndex) {
			                   return Ext.util.Format.number(value,'0,000') ;
			             },
			            renderer:function(v){
			            	return Ext.util.Format.number(v,'0,000');
			            }},
					{header:'单位',dataIndex:'uom',width:80,editor:{maxLength:100}},
					{header:'项目单价',dataIndex:'unit_price',width:100,editor:{xtype:'numberfield',decimalPrecision :4,minValue:0},
						 summaryType: 'sum',
			             summaryRenderer: function(value, summaryData, dataIndex) {
			                   return Ext.util.Format.number(value,'0,000') ;
			             },
						renderer:function(v){
			            	return Ext.util.Format.number(v,'0,000.00');
			            }
					},
					{header:'项目总价',dataIndex:'total_prcie',width:100,
						 summaryType: 'sum',
			             summaryRenderer: function(value, summaryData, dataIndex) {
			             	me.down('#material_costs').setValue(value);
			                   return Ext.util.Format.number(value,'0,000') ;
			             },
						 renderer:function(v,metaData,record,rowIndex,colIndex,store){
						 	
			            	return Ext.util.Format.number(v,'0,000.00');
			             }
			             
					}
					],
					store:me.quotationDetailStore,
					plugins: {
				        ptype: 'cellediting',
				        clicksToEdit: 1,
				        listeners: {
				        	'beforeedit':function(editor, e, obj){
									return me.canUseButtonOrEdit();				
								},
							'edit':function(field,e){
				        		rec=e.record;
				        		switch (e.field){
				        			case 'qty':
				        			case 'unit_price':
				        				var total_prcie=Ext.util.Format.round(rec.get('qty')*rec.get('unit_price'),2);
				        				rec.set('total_prcie',total_prcie);
				        			break;
				        		}
				        	}
				        }
				    }
				}
				]
			}
			]
		});
		me.callParent(arguments);
	},
	//加载数据
	loadData:function(){
		var me=this;
		if(Ext.isEmpty(srm.UInfo.currentUser.supplier)){
			Ext.Msg.alert('提示','用户没有所属供应商');return;
		}
		me.enquirystore.loadPage(1,{
			params:{
				company_id:srm.UInfo.currentUser.supplier.get('company_id')
			}
		});
	},
	//打开询价详情
	openEnquiryDetail:function(rec){
		var me=this;
		//加载数据
		me.detailstore.loadPage(1,{
			params:{
				enquiry_id:rec.get('enquiry_id')
			}
		});
		me.down('#detailform').loadRecord(rec);
		//界面显示控制
		me.changeToShowView(2);
	},
	//打开报价页面
	openEditView:function(enquiryDetail_rec){
		var me=this;
		//加载数据
		var company_id=srm.UInfo.currentUser.supplier.get('company_id');
		var cpyname_cn=srm.UInfo.currentUser.supplier.get('cpyname_cn');
		me.quotationstore.load({
			params:{
				enquiry_detail_id:enquiryDetail_rec.get('enquiry_detail_id'),company_id:company_id
			},
			callback: function(records, operation, success) {
				var form=me.down('#quote_form');
				if(records.length==0){
					rec=Ext.create('srm.enquiryQuote.quote.model.Quotation',{
						enquiry_detail_id:enquiryDetail_rec.get('enquiry_detail_id'),
						company_id:company_id,
						cpyname_cn:cpyname_cn,
						quote_date:new Date(),
						status:0
					});
				}else{
					rec=records[0];
				}
				form.loadRecord(rec);
				me.quotationDetailStore.load({
					params:{
						quotation_id:rec.get('quotation_id')
					}
				});
				//界面控制
				me.changeToShowView(3);
				//页面控制
				me.setCanNotEdit(rec);
			}
		});
		
	},
	/**显示指定代码的模块，其他隐藏
	 * 1：显示询价主要信息
	 * 2：显示详情
	 * 3.显示报价界面*/
	changeToShowView:function(num){
		var me=this;
		//全部隐藏
		//定位标记
		me.down('#first_toright').hide();
		me.down('#second_level').hide();
		me.down('#second_toright').hide();
		me.down('#third_level').hide();
		//组件
		me.down('#grd_head').hide();
		me.down('#detail_panel').hide();
		me.down('#quote_panel').hide();
		if(num==1){
			me.down('#grd_head').show();
		}else if(num==2){
			me.down('#detail_panel').show();
			me.down('#first_toright').show();
			me.down('#second_level').show();
		}else if(num==3){
			me.down('#quote_panel').show();
			me.down('#first_toright').show();
			me.down('#second_level').show();
			me.down('#second_toright').show();
			me.down('#third_level').show();
		}
	},
	//sts=true 不可编辑  ；false 可编辑
	disabledForm:function(sts){
		var me=this;
		var form=me.down('#quote_form');
		var fields=form.items;
		fields.each(function(item,index,length){
			item.setDisabled(sts);
		});
		me.cannotedit=sts;//变更控制标记
	},
	//是否可以使用按钮或者编辑
	canUseButtonOrEdit:function(){
		var me=this;
		if(me.cannotedit){
			Ext.Msg.alert('提示','已提交,不可修改');
			return false;
		}else{
			return true;
		}
	},
	setCanNotEdit:function(rec){
		var me=this;
		var btn_save=me.down('#BTN_SAVE');
		var btn_submit=me.down('#BTN_SUBMIT');
		var btn_dis_submit=me.down('#BTN_DIS_SUBMIT');
		if(rec.get('status')==0 || Ext.isEmpty(rec.get('status'))){
			me.disabledForm(false);
			btn_save.show();
			if(rec.get('quotation_id')>0){
				btn_submit.show();//显示，因为是update
			}else{
				btn_submit.hide();//不显示，因为是新增
			}
			btn_dis_submit.hide();
		}else if(rec.get('status')==1){
			me.disabledForm(true);
			btn_save.hide();
			btn_submit.hide();
			btn_dis_submit.show();
		}else if(rec.get('status')>=2){
			me.disabledForm(true);
			btn_save.hide();
			btn_submit.hide();
			btn_dis_submit.hide();
		}
	}
});
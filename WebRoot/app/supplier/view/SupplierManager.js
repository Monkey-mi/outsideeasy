Ext.define('srm.supplier.view.SupplierManager', {
	extend : 'srm.ux.Panel',
	alias : 'widget.supplierSelfManager',
	requires:['srm.basicdata.currency.store.Currency',
			  'srm.basicdata.taxmanClass.store.TaxmanClass',
			  'srm.basicdata.industryClass.store.IndustryClass'],
	initComponent : function() {
		var me=this;
		me.cannotedit=true;//默认不可编辑，在disabledForm中改变
		me.store=Ext.create('srm.supplier.store.SupplierFile');
		me.ccstore=Ext.create('srm.supplier.store.CompanyClass');
		me.ccstore.load();
		//公司性质之行业性质
		me.industryClassStore=Ext.create('srm.basicdata.industryClass.store.IndustryClass');
		me.industryClassStore.load();
		//公司性质之纳税人类别
		me.taxmanClassStore=Ext.create('srm.basicdata.taxmanClass.store.TaxmanClass');
		me.taxmanClassStore.load();
		//附件
		me.attchedstore=Ext.create('srm.supplier.store.Attched');
		//自定义附件
		me.customAttchedStore=Ext.create('srm.supplier.store.CustomAttched');
		me.invoicestore=Ext.create('srm.supplier.store.InvoiceTitle');
		me.competitorstore=Ext.create('srm.supplier.store.Competitor');
		me.bankstore=Ext.create('srm.supplier.store.BankAccount');
		me.customerstore=Ext.create('srm.supplier.store.MainCustomer');
		me.devicestore=Ext.create('srm.supplier.store.Devicelist');
		me.metarialstore=Ext.create('srm.supplier.store.Metarial');
		me.goodsstore=Ext.create('srm.supplier.store.Goods');
		me.first_areastore=Ext.create('srm.supplier.store.Area');
		me.first_areastore.load({
			params:{
				levelType:1
			}
		});
		me.reg_second_areastore=Ext.create('srm.supplier.store.Area');
		me.reg_third_areastore=Ext.create('srm.supplier.store.Area');
		me.contact_second_areastore=Ext.create('srm.supplier.store.Area');
		me.contact_third_areastore=Ext.create('srm.supplier.store.Area');
		me.materialClassstore=Ext.create('srm.supplier.store.MaterialClass');
		me.treeStore=Ext.create('srm.supplier.store.MaterialClassTree');
		me.materialClassstore.load();
		me.currencyStore=Ext.create('srm.basicdata.currency.store.Currency');
		me.currencyStore.load();
		me.toBeDeleteFileArray=[];
		//附件编辑器
		var cellEditing_fujain=Ext.create('Ext.grid.plugin.CellEditing', {
		        clicksToEdit : 1,
				autoCancel: false,
		        itemId:'cellEditing_fujain',
		        pluginId: 'cellEditing_fujain',
		        listeners: {			        												
					'beforeedit':function(editor, e, obj){
						if(!me.canUseButtonOrEdit()){
							return false;
						}
//						if(e.value=='营业执照' || e.value=='税务登记证' || e.value=='组织机构代码证'){
//							Ext.Msg.alert('提示','名称'+e.value+'不可修改');
//							return false;
//						}
						else{
							return true;
						}				
					}
		        }
		});
			
		Ext.apply(me,{
				layout: {
			        type: 'border'
			    },
			    
				items:[
			   	{
			        region: 'center',
			        itemId:'suppliermiddleView',
			        xtype:'panel',
			        scrollable :true,
			        flex:1,
			        layout:{
					     type: 'vbox',
					     pack: 'start',
					     align: 'stretch'
					},
					
					tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'},
		    				{text:'提交',glyph:0xf064,itemId:'BTN_SUBMIT',hidden:true},//前提要求：记录已经保存
		    				{text:'取消提交',glyph:0xf112,itemId:'BTN_DIS_SUBMIT',hidden:true},'->'],
					items:[
					{
					//基本信息
						title:'基本信息',
						border:true,
						//autoScroll:true,
						//height:540,
						xtype:'form',
						itemId:'basicinfo',
						layout:'column',
						defaults : {
							
							labelWidth : 100,
							xtype:'textfield',
							labelStyle : 'font-weight:nomal;text-align:left;color:#000',
							padding:'4 8 4 8',
							msgTarget : 'side',
							autoFitErrors : true
						},

						items:[
							{
								hidden:true,
								name:'company_id',
								columnWidth:1
							},
							{
								fieldLabel:'公司中文名称',
								allowBlank:false,
								name:'cpyname_cn',
								itemId:'cpyname_cn',
								emptyText:'(供应商名称)',
								maxLength:150,
								columnWidth:0.5
							},{
								fieldLabel:'公司英文名称',
								name:'cpyname_en',
								maxLength:150,
								columnWidth:0.5
							},
							{
								fieldLabel:'注册地址',
								allowBlank:false,
								queryMode:'local',
								name:'area_pro_reg',
								columnWidth:0.24,
								xtype:'combo',
								store :me.first_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
								listeners:{						
									'change':function( field,nv,ov){
										var form=me.down('form').getForm();
										var area_cityfield=form.findField('area_city_reg');
										if(!Ext.isEmpty(nv)){
											me.reg_second_areastore.load({
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
								allowBlank:false,
								itemId:'area_city_reg',
								name:'area_city_reg',
								columnWidth:0.13,
								xtype:'combo',
								store :me.reg_second_areastore,
								queryMode:'local',
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
								listeners:{						
									'change':function( field,nv,ov){
										var form=me.down('form').getForm();
										var reg_addr_codefield=form.findField('reg_addr_code');
										if(!Ext.isEmpty(nv)){
											me.reg_third_areastore.load({
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
								allowBlank:false,
								name:'reg_addr_code',
								columnWidth:0.13,
								xtype:'combo',
								queryMode:'local',
								store :me.reg_third_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true
							},
							{
								fieldLabel:'具体注册地址',
								allowBlank:false,
								name:'reg_addr',
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							{
								fieldLabel:'联系地址',
								allowBlank:false,
								queryMode:'local',
								name:'area_pro_contact',
								columnWidth:0.24,
								xtype:'combo',
								store :me.first_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
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
								allowBlank:false,
								itemId:'area_city_contact',
								name:'area_city_contact',
								columnWidth:0.13,
								xtype:'combo',
								store :me.contact_second_areastore,
								queryMode:'local',
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
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
								allowBlank:false,
								name:'contact_addr_code',
								columnWidth:0.13,
								xtype:'combo',
								queryMode:'local',
								store :me.contact_third_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true
							},
							{
								fieldLabel:'具体联系地址',
								allowBlank:false,
								name:'contact_addr',
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							
							{
								fieldLabel:'公司法人代表',
								name:'corporation',
								allowBlank:false,
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							{		
								fieldLabel:'公司固定电话',
								allowBlank:false,
								name:'f_phone',
								maxLength:20,
								emptyText:'(必填项)',
								columnWidth:0.5
								
							},
							{
								fieldLabel:'联系人',
								allowBlank:false,
								name:'contacts',
								emptyText:'(必填项)',
								columnWidth:0.5
							}
							,
							{
								fieldLabel:'联系人手机号',
								name:'m_phone',
								allowBlank:false,
								maxLength:20,
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							
							{
								fieldLabel:'公司传真号',
								name:'fax',
								columnWidth:0.5
							},
							{
								fieldLabel:'E-Mail',
								name:'email',
								columnWidth:0.5
							},
							{
								fieldLabel:'企业性质',
								name:'nature_id',
								xtype:'combo',
								store :me.ccstore ,
								displayField:'nature_name',
								valueField:'nature_id',
								forceSelection:true,//强制必须，选中下拉项
								allowBlank:false,
								emptyText:'(请选择)',
								columnWidth:0.5
							},
							{
								fieldLabel:'营业执照号',
								name:'bus_license',
								allowBlank:false,
								maxLength:20,
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							{
						itemId:'industry_id',
						name:'industry_id',
						fieldLabel:'行业性质',
						forceSelection:true,
						xtype:'combo',
						store :me.industryClassStore,
						displayField:'industry_name',
						valueField:'industry_id',
						columnWidth:0.5
						},
						{
						itemId:'taxman_id',
						name:'taxman_id',
						fieldLabel:'纳税人类别',
						forceSelection:true,
						xtype:'combo',
						store :me.taxmanClassStore,
						displayField:'taxman_name',
						valueField:'taxman_id',
						columnWidth:0.5
						},
							{
								fieldLabel:'公司税籍编号',
								name:'tax_no',
								maxLength:20,
								allowBlank:false,
								emptyText:'(必填项)',
								columnWidth:0.5
							},
							
							{
						xtype:'panel',
						layout:{type:'hbox',align:'stretch'},
						
						items:[
							{fieldLabel:'注册资金(万元)',
							itemId:'reg_fund',
							name:'reg_fund',
							xtype:'numberfield',
							labelStyle : 'font-weight:nomal;text-align:left;color:#000000',
							step:1,
							minValue: 0,
							decimalPrecision :2,
							allowBlank:false,
							emptyText:'(必填项)',
							flex:3},
							{
								xtype:'combo',
								itemId:'currency_id',
								name:'currency_id',
								forceSelection:true,
								displayField:'currency_name',
								valueField:'currency_id',
								store:me.currencyStore,
								allowBlank:false,
								emptyText:'(必填项)',
								flex:1
							}],
						
						columnWidth:0.5
					},
							{
								fieldLabel:'成立日期',
								name:'establish_dt',
								allowBlank:false,
								emptyText:'(必填项)',
								xtype:'datefield',
								format:'Y-m-d',
								columnWidth:0.5
							},
							{
								xtype:'panel',
								layout:{type:'hbox',align:'stretch'},
								items:[
								{
									fieldLabel:'营业额(万元)',
									name:'turnover',
									xtype:'numberfield',
									labelStyle : 'font-weight:nomal;text-align:left;color:#000000',
									step:1,
									minValue: 0,
									decimalPrecision :2,
									flex:3
								},{
									xtype:'combo',
								itemId:'turnover_currency_id',
								name:'turnover_currency_id',
								forceSelection:true,
								displayField:'currency_name',
								valueField:'currency_id',
								store:me.currencyStore,
								
								flex:1
								}],
								
								columnWidth:0.5
							},
							{
								fieldLabel:'认证体系',
								name:'certification_system',
								columnWidth:0.5
							},
							{
								fieldLabel:'公司总人数',
								name:'emplyees',
								xtype:'numberfield',
								step:1,
								minValue: 0,
								decimalPrecision :0,
								allowBlank:false,
								emptyText:'(必填项)',
								columnWidth:0.5
							},
				           	{
					           	fieldLabel:'操作工人数',
								name:'op_num',
								xtype:'numberfield',
								decimalPrecision :0,
								columnWidth:0.5,
								step:1,
								value:0,
								minValue: 0
				           	},
				           	{
									fieldLabel:'开发技术人数',
									name:'tech_num',
									xtype:'numberfield',
									decimalPrecision :0,
									columnWidth:0.5,
									step:1,
									value:0,
									minValue: 0		           	
				           	},
							{
									fieldLabel:'专职检验人数',
									name:'qc_num',
									xtype:'numberfield',
									decimalPrecision :0,
									columnWidth:0.5,
									step:1,
									value:0,
									minValue: 0
							},{
									fieldLabel:'间接员工人数',
									name:'staff_num',
									xtype:'numberfield',
									decimalPrecision :0,
									columnWidth:0.5,
									step:1,
									value:0,
									minValue: 0
							},{
									fieldLabel:'大专以上学历人数',
									name:'college_num',
									xtype:'numberfield',
									decimalPrecision :0,
									columnWidth:0.5,
									step:1,
									value:0,
									minValue: 0
							},{
									fieldLabel:'质量体系内审员资格人数',
									name:'qe_num',
									xtype:'numberfield',
									decimalPrecision :0,
									columnWidth:0.5,
									step:1,
									value:0,
									minValue: 0
		
							}
							,
							{
								fieldLabel:"公司面积(m²)",
								name:'company_area',
								xtype:'numberfield',
								step:1,
								minValue: 0,
								decimalPrecision :0,
								columnWidth:0.5
							},
							
			           		{
			           			fieldLabel:'厂房面积(m²)',
			           			name:'factory_area',
								xtype:'numberfield',
								step:1,
								minValue: 0,
								decimalPrecision :0,
								columnWidth:0.5
			           		},
			           		{
			           			fieldLabel:"租赁/自建",
								xtype:'combo',
								name:'factory_owner',
								store : [[0, '租赁'],
								[1, '自建']],
								columnWidth:1/3
			           			
			           		},
			           		{
			           			fieldLabel:'使用年限',
			           			labelWidth:60,
			           			xtype:'datefield',
			           			name:'use_begintime',
			           			format:'Y-m-d',
			           			columnWidth:1/3
			           		},
			           		{
			           			fieldLabel:'至',
			           			labelStyle:'text-align:center;color:#000',
			           			labelWidth:60,
			           			xtype:'datefield',
			           			name:'use_endtime',
			           			format:'Y-m-d',
			           			columnWidth:1/3
			           		}
						]
					},//基本信息
					{
						title:'主要设备明细',
						
		    			itemId:'plEquipmentDetails',
		    			height:300,
		    			tbar:[
		    			{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plEquipment'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plEquipment'
						}],
						items:[{
							xtype:'grid',
							itemId:'grdEquipmentDetails',
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">设备名称</div>',dataIndex:'device_name',editor:{maxLength:100,allowBlank:false},flex:1},
		    			{header:'<div style="text-align:center">设备规格</div>',dataIndex:'format',editor:{maxLength:50},width:150},
		    			{header:'<div style="text-align:center">设备产地</div>',dataIndex:'place',editor:{maxLength:50},flex:1},
		    			{header:'<div style="text-align:center">设备价值</div>',dataIndex:'price',editor:{
		    				xtype:'numberfield',
							step:10000,
							minValue: 0,
							decimalPrecision :2,
							allowBlank:false
		    			},width:100},
		    			{header:'<div style="text-align:center">设备购买日期</div>',dataIndex:'buy_day',width:100,xtype:'datecolumn',format:'Y-m-d',
		    				editor:{xtype:'datefield',format:'Y-m-d'}
		    			},
		    			{header:'设备数量',dataIndex:'device_num',editor:{xtype:'numberfield',minValue: 0},align:'center',width:80},
		    			{header:'<div style="text-align:center">设备先进性</div>',dataIndex:'advanced',editor:{maxLength:100},width:150}
		    			],
		    			store:me.devicestore,
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}				
								}
					        }
					    }
					    }]
					},
					{
						title:'原材料及品牌',
						itemId:'plmaterialsDetails',
						xtype:'grid',
						height:300,
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plmaterials'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plmaterials'
						}],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'material_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">材料品牌</div>',dataIndex:'material_brand',editor:{},width:150}
		    			
		    			],
		    			store:me.metarialstore,
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}				
								}
					        }
					    }
			    	},{
			    		title:'公司主要产品及品牌',
			    		itemId:'plproductDetails',
			    		xtype:'grid',
						height:300,
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plproduct'
//						},{
//							text:'编辑',glyph:0xf044,itemId:'BTN_EDT_plproduct'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plproduct'
						}],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">产品名称</div>',dataIndex:'goods_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">产品品牌</div>',dataIndex:'goods_brand',editor:{},width:150},
		    			{header:'<div style="text-align:center">类别</div>',dataIndex:'mc_id',width:150,
		    				editor:{
		    					xtype : 'comboxTree',    
							    displayField : 'text',
							    valueField: 'id',
							    store:me.treeStore,
							    rootVisible:false,
							    maxPickerWidth:240
		    				},
		    				renderer:function(value){
								var rec=me.materialClassstore.findRecord('mc_id',value,0,false,false,true);
								return Ext.isEmpty(rec)?value:rec.get('mc_name');
		   	  	  			}
		    			}//供应商的产品，就是泰普森的材料
		    			],
		    			store:me.goodsstore,
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}
								}
					        }
					    }
			    	},{
			    		title:'公司主要客户',
			    		itemId:'customerDetails',
			    		xtype:'grid',
						height:300,
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_customer'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_customer'
						}],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">客户名称</div>',dataIndex:'customer_name',editor:{},flex:1}
		    			],
		    			store:me.customerstore,
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}				
								}
					        }
					    }
					},{
			    		title:'银行账号',
			    		itemId:'plbankDetails',
			    		xtype:'grid',
						height:300,
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plbank'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plbank'
						}
//						,{
//							text:'默认',glyph:0xf00c,itemId:'BTN_DEFAULT_plbank',disabled:true,hidden:true
//						}
						],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">账号</div>',dataIndex:'account_code',editor:{},width:200},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',stopSelection:false,
//		    				renderer:function(value){
//								if(value=="true"||value=="1"){
//									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//								}else {
//									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//								}
//		   	  	  			}
		    				renderer:function(value){
									if(value=="true"||value=="1"){//是否默认
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}				
								}
					        }
					    },
		    			store:me.bankstore
					},{
			    		title:'发票抬头',
			    		itemId:'plinvoiceDetails',
			    		xtype:'grid',
						height:300,
						multiSelect:true,
	   	  	  			selModel:Ext.create('Ext.selection.CheckboxModel'),
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plinvoice'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plinvoice'
						},{
							text:'默认',glyph:0xf00c,itemId:'BTN_DEFAULT_plinvoice',disabled:true,hidden:true
						}
						],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',stopSelection:false,
//		    				renderer:function(value){
//								if(value=="true"||value=="1"){
//									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//								}else {
//									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//								}
//		   	  	  			}
		    				renderer:function(value){
		    					
									if(value=="true"||value=="1"){//是否默认
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(!me.canUseButtonOrEdit()){
										return false;
									}				
								}
					        }
					    },
		    			store:me.invoicestore
			    	},{
			    		title:'公司主要竞争对手',
			    		itemId:'plcompetitorDetails',
						xtype:'grid',
						height:300,
						multiSelect:true,
	   	  	  			selModel:Ext.create('Ext.selection.CheckboxModel'),
		    			tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD_plcompetitor'
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL_plcompetitor'
						}
						],
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">对手</div>',dataIndex:'competitor_name',editor:{},flex:1}
		    			
		    			],
		    			plugins: {
					        ptype: 'cellediting',
					        pluginId: 'plcompetitor_celledit',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(!me.canUseButtonOrEdit()){
										return false;
									}				
								}
					        }
					    },
		    			store:me.competitorstore
			    	
			    	},{
			    		title:'认证文件',
			    		itemId:'fileGridPanel',
						height:400,
			    		overflowX:'hidden',
			    		overflowY:'auto',
			    		layout:{type:'hbox',align:'stretch'},
			    		items:[{
			    			flex:1,
			    			xtype:'grid',
						itemId:'fileGrid',
						border:true,
						store:me.attchedstore,
						columns:[
				{header:'序号', xtype:'rownumberer',width:40},
				{header:'文件名称',dataIndex:'file_name',flex:1,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
				{header:'格式',dataIndex:'file_format',width:100,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
				
				{header:'必传',dataIndex:'ismust',width:40,renderer:function(value){
   	  	  					if(value==true)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
				{header:'状态',dataIndex:'file_path',width:60,
								renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
							}

				,{header:'说明',dataIndex:'remark',width:100,renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}}
				,{
					header:'操作',xtype:'actioncolumn',width:80,
					items:[
					{
						//上传
						icon:'resources/images/icon/add.png',
						tooltip:'上传',
						handler:function(grid,rowIndex,colIndex){
							var supplier_rec=srm.UInfo.currentUser.supplier;
										if(Ext.isEmpty(supplier_rec)){
											Ext.Msg.alert("提示", "请先保存,再上传附件");
				                    		return
										}
										var company_id=supplier_rec.get('company_id');
										if(company_id<=0){
											Ext.Msg.alert("提示", "请先保存,再上传附件");
				                    		return
										}
										var currentrec = grid.getStore().getAt(rowIndex);
										if(!Ext.isEmpty(currentrec.get('file_path'))){
											Ext.Msg.alert('提示','请先删除上传附件');
											return;
										}
										var isimg=false;
										
										if(currentrec.get('file_format')=='jpg/jpeg/png/gif/bmp')
										{
											isimg=true;
								
										}
										var win=Ext.widget('upAttchedFile',{				
												itemId: 'upAttchedFile',
												company_id:company_id,
												currentrec:currentrec,
												isimg:isimg,
												closable: true
										});
						
						win.show();
						
						}
					},{
						//预览
						
						icon:'resources/images/icon/download.png',
						tooltip:'下载',
						handler:function(grid,rowIndex,colIndex){
							var rec = grid.getStore().getAt(rowIndex);
							if(Ext.isEmpty(rec.get('file_path')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');return;
							}
							
							var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
							window.open('supplier/downloadAttched.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						}
						
					},{
						//删除
						icon:'resources/images/icon/delete.gif',
						tooltip:'删除',
						handler:function(grid,rowIndex,colIndex){
							var rec = grid.getStore().getAt(rowIndex);
							Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
									   		if(btn=="yes")
									   		{
									   			me.toBeDeleteFileArray.push(rec.get('file_path'));
									   			rec.set('file_path',null);
									   			me.hiddenPic('PIC1');
									   		}
									   });
//							var patharray=[];
//							patharray.push(rec.get('file_path'));
//							srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
//											patharray:patharray.join(',')
//									});
//									//删除附件记录
//							rec.set('file_path',null);
//							me.hiddenPic('PIC1');
						}
					},
					{
						//预览
						icon:'resources/images/icon/application_view_list.png',
						tooltip:'预览',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('file_path');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC1');
                            	
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}
					}
					]
				}
//				,
//				{
//					header:'预览',dataIndex:'file_path',flex:1,padding:0,
//					renderer: function(value, meta, record) {
//                            meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
//                                        'white-space: nowrap;white-space:normal;line-height:26px;';
//                            
//                            if(value!=null&&value!='')
//                            {
//                            	var suffixIndex=value.lastIndexOf('.');
//                            	var suffixStr=value.substring(suffixIndex+1).toLowerCase();
//                            	
//                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
//                            	{
//                                var return_Str='<div style="height:400px;width:96%;overflow-x:hidden;">';
//                                var file_path=encodeURIComponent(encodeURIComponent(value));
//                                
//   								var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
//   								//var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
//                                return_Str+='<img src="'+src+'" width="100%"  height="100%"/><br />';
//                                return_Str+='</div>';
//                                return return_Str;
//                            	}
//                            	else
//                            	{
//                            	return '';
//                            	}
//                             }
//                              else{return value;}          		
//                            }
//                		}
						]
			    		},
			    		{
			    			//预览图片
			    			xtype:'image',
							width:400,
							itemId:'PIC1',
							border:true,
							height:'100%',
							src:'',
							style:"position:absolute;left:0;top:0;"
			    		}
			    	]
						
						
			    	}
			    	,{
			    		
			    		itemId:'customfileGridPanel',
			    		height:400,
			    		overflowX:'hidden',
			    		overflowY:'auto',
			    		layout:{type:'hbox',align:'stretch'},
			    		items:[{
			    		//附件自定义添加表格
			    			flex:1,
							xtype:'grid',
							itemId:'customfileGrid',
							border:true,
							store:me.customAttchedStore,
							tbar:[{
								text:'自定义添加',glyph:0xf055,itemId:'btn_add_customattched'
							},{
								text:'删除',glyph:0xf014,itemId:'btn_del_customattched'
							}],
							plugins: [
				  	  			cellEditing_fujain
				   	  	  	], 
				   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
							columns:[
							{header:'序号', xtype:'rownumberer',dataIndex:'',width:40},
							{header:'文件名称',dataIndex:'file_name',flex:1,editor: {xtype: 'textfield',allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
							{header:'格式',dataIndex:'file_format',width:150,editor:{xtype:'combo',store:[['jpg/jpeg/png/gif/bmp','jpg/jpeg/png/gif/bmp'],['word','word'],['excel','excel'],['pdf','pdf'],['rar/zip','rar/zip']],allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
							{header:'状态',dataIndex:'file_path',width:100,
								renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
							},
							
							{header:'操作',xtype:'actioncolumn',width:80,
								items:[
								{
									icon:'resources/images/icon/add.png',
									tooltip:'上传',
									handler:function(grid,rowIndex,colIndex){
										if(!me.canUseButtonOrEdit()){//已经提交，不可编辑
											return;
										}
										//先完成当前的编辑状态
										cellEditing_fujain.completeEdit();
										var supplier_rec=srm.UInfo.currentUser.supplier;
										if(Ext.isEmpty(supplier_rec)){
											Ext.Msg.alert("提示", "请先保存,再上传附件");
				                    		return
										}
										var company_id=supplier_rec.get('company_id');
										if(company_id<=0){
											Ext.Msg.alert("提示", "请先保存,再上传附件");
				                    		return
										}
										var currentrec = grid.getStore().getAt(rowIndex);
										if(!Ext.isEmpty(currentrec.get('file_path'))){
											Ext.Msg.alert('提示','请先删除上传附件');
											return;
										}
										 if(currentrec.get('file_name')==null || currentrec.get('file_name')==""){
												Ext.Msg.alert("提示", "请先输入文件名");
				            					return;
										}
										if(Ext.isEmpty(currentrec.get('file_format')))
										{
											Ext.Msg.alert("提示", "请先选择上传格式");
				            				return;
										}
										var isimg=false;
										
										if(currentrec.get('file_format')=='jpg/jpeg/png/gif/bmp')
										{
											isimg=true;
										}
										var win=Ext.widget('upAttchedFile',{				
												itemId: 'upAttchedFile',
												company_id:company_id,
												currentrec:currentrec,
												isimg:isimg,
												closable: true
										});
										win.show();
									}
								},{
									icon:'resources/images/icon/download.png',
									tooltip:'下载',
									handler:function(grid,rowIndex,colIndex){
										var rec = grid.getStore().getAt(rowIndex);
										if(rec.get('id')<=0 || Ext.isEmpty(rec.get('file_path'))){
											Ext.Msg.alert('提示','未上传或者未保存，无法下载');return;
										}
										window.open('supplier/downloadAttched.do?id='+rec.get('id'), 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
									}
								},{
									icon:'resources/images/icon/delete.gif',
									tooltip:'删除',
									handler:function(grid,rowIndex,colIndex){
										if(!me.canUseButtonOrEdit()){//已经提交，不可编辑
											return;
										}
										var currentrec = grid.getStore().getAt(rowIndex);
										if(Ext.isEmpty(currentrec.get('file_path'))){
											Ext.Msg.alert('提示','文件尚未上传，无法删除');
											return;
										}
										Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
									   		if(btn=="yes")
									   		{
									   			me.toBeDeleteFileArray.push(currentrec.get('file_path'));
									   			currentrec.set('file_path',null);
									   			me.hiddenPic('PIC2');
									   		}
									   });//confirm
									}//handler
								},
								{
								//预览
						icon:'resources/images/icon/application_view_list.png',
						tooltip:'预览',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('file_path');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC2');
                            	
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
							}
								}]
							}
//							,
//							//预览
//							{
//							header:'预览',dataIndex:'file_path',flex:1,padding:0,
//							renderer: function(value, meta, record) {
//                            meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
//                                        'white-space: nowrap;white-space:normal;line-height:26px;';
//                            
//                            if(value!=null&&value!='')
//                            {
//                            	var suffixIndex=value.lastIndexOf('.');
//                            	var suffixStr=value.substring(suffixIndex+1).toLowerCase();
//                            	
//                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
//                            	{
//                                var return_Str='<div style="height:400px;width:100%;overflow-x:hidden;">';
//                                var file_path=encodeURIComponent(encodeURIComponent(value));
//                                
//   								var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
//   								//var src='common/downloadFile.do?file_path='+file_path+'&isimg=true';
//                                return_Str+='<img src="'+src+'" width="100%"  height="100%"/><br />';
//                                return_Str+='</div>';
//                                return return_Str;
//                            	}
//                            	else
//                            	{
//                            	return '';
//                            	}
//                             }
//                              else{return value;}          		
//                            }
//                			}
							]//columns结束
			    		},{
			    		
			    			//预览图片
						xtype:'image',
						width:400,
						itemId:'PIC2',
						border:true,
						height:'100%',
						src:'',
						style:"position:absolute;left:0;top:0;"
			    		}]
							
							
						}
					]
					
			    }
				]
		});
		
		this.callParent();
	},
	loadData:function(){
		var me=this;
		var form=me.down('#basicinfo');
		
		var company_id;
		if(!Ext.isEmpty(srm.UInfo.currentUser.supplier)){
			me.store.load({
				params:{
					company_id:srm.UInfo.currentUser.supplier.get('company_id')
				},
				callback: function(records, operation, success) {
					if(records.length>0){
						var rec=records[0];
						company_id=rec.get('company_id');
						//注册地址
						var reg_addr_code=rec.get('reg_addr_code')+"";
						if(!Ext.isEmpty(reg_addr_code)){
							var area_pro_reg=parseInt(reg_addr_code.substring(0,2)+"0000");
							var area_city_reg=parseInt(reg_addr_code.substring(0,4)+"00");
							rec.set('area_pro_reg',area_pro_reg);
							rec.set('area_city_reg',area_city_reg);
							me.reg_second_areastore.load({
								params:{
									levelType:2,
									f_id:area_pro_reg
								}
							});
							me.reg_third_areastore.load({
								params:{
									levelType:3,
									f_id:area_city_reg
								}
							});
						}
						//联系地址
						var contact_addr_code=rec.get('contact_addr_code')+"";
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
						me.invoicestore.load({
							params:{
								company_id:company_id
							}
						});
						me.competitorstore.load({
							params:{
								company_id:company_id
							}
						});
						me.bankstore.load({
							params:{
								company_id:company_id
							}
						});
						me.customerstore.load({
							params:{
								company_id:company_id
							}
						});
						me.devicestore.load({
							params:{
								company_id:company_id
							}
						});
						me.metarialstore.load({
							params:{
								company_id:company_id
							}
						});
						me.goodsstore.load({
							params:{
								company_id:company_id
							}
						});
						me.attchedstore.load({
							params:{
								company_id:company_id,
								iscustom:0
							},
							callback:function(records, operation, success){
								if(records[0]==null)
								{
									
									//为空时加载默认模板
									me.setDefaultAttchedData(company_id);
								}}
						});
						me.customAttchedStore.load({params:{
				 			company_id:company_id,
				 			iscustom:1
						}});
						form.loadRecord(rec);
						//页面控制
						me.setCanNotEdit(rec);
					}
					
				}//callback
			});//load
		}else{
			rec=Ext.create('srm.supplier.model.SupplierFile');
			var create_dt=new Date();
			//新增时加载默认的附件
			me.setDefaultAttchedData(-1);
			
			form.loadRecord(rec);
			//页面控制
			me.setCanNotEdit(rec);
		}
		
	},
	//sts=true 不可编辑  ；false 可编辑
	disabledForm:function(sts){
		var me=this;
		var form=me.down('#basicinfo');
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
	//删除上传的文件,在保存时执行
	deleteUploadFile:function(){
		var me=this;
		srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
				patharray:me.toBeDeleteFileArray.join(',')
		});
		me.toBeDeleteFileArray=[];//重置
	},
	setCanNotEdit:function(rec){
		var me=this;
		var btn_save=me.down('#BTN_SAVE');
		var btn_submit=me.down('#BTN_SUBMIT');
		var btn_dis_submit=me.down('#BTN_DIS_SUBMIT');
		if(rec.get('apply_sts')==0 || Ext.isEmpty(rec.get('apply_sts'))){
			me.disabledForm(false);
			btn_save.show();
			if(rec.get('company_id')>0){
				btn_submit.show();//显示，因为是update
			}else{
				btn_submit.hide();//不显示，因为是新增
			}
			btn_dis_submit.hide();
		}else if(rec.get('apply_sts')==5){
			me.disabledForm(true);
			btn_save.hide();
			btn_submit.hide();
			btn_dis_submit.show();
		}else if(rec.get('apply_sts')>=10){
			me.disabledForm(true);
			btn_save.hide();
			btn_submit.hide();
			btn_dis_submit.hide();
		}else{
			me.disabledForm(true);
			btn_save.hide();
			btn_submit.hide();
			btn_dis_submit.hide();
		}
	}
	,//新增时设置默认的必须上传的附件
	setDefaultAttchedData:function(company_id){
		var me=this;
		var create_dt=new Date();
			
			//新增时加载默认的附件
		var array=[];
			var create_dt=new Date();
			var file1=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'营业执照',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file2=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'税务登记证',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file3=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'组织机构代码证',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:true,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file4=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'公司介绍',create_dt:create_dt,file_format:'word/pdf/excel/rar/zip',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file5=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'厂容厂貌',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file6=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'认证体系证书复印件',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file7=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'公司/工厂机器设备清单',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp/word/pdf/excel/rar/zip',ismust:false,remark:'文件大小不得超过10M',iscustom:false});
			var file8=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'代理商/贸易商需提供代理证明资质',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file9=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'同类产品国家认定机构检测报告或行业出具的等级证明、优质产品证书、知识产权证书复印件',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			var file10=Ext.create('srm.supplier.model.Attched',{company_id:company_id,file_name:'与院校、科研机构合作、交流情况(提供相关文件复印件)',create_dt:create_dt,file_format:'jpg/jpeg/png/gif/bmp',ismust:false,remark:'请上传图片格式，如jpg,jpeg,png,gif,bmp',iscustom:false});
			array.push(file1);
			array.push(file2);
			array.push(file3);
			array.push(file4);
			array.push(file5);
			array.push(file6);
			array.push(file7);
			array.push(file8);
			array.push(file9);
			array.push(file10);
			me.attchedstore.add(array);
			
	}
	,//图片展示
   		showPic:function(file_path,id){
   				var me=this;
   				
   				var panel=me.down('#'+id);
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src='supplier/downloadAttched.do?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src);
   					//panel.setHeight(390);
   				}
   		}
   	//删除图片时，删除预览框中的图片
   	,hiddenPic:function(id)
   	{
   		var me=this;
   		var panel=me.down('#'+id);
   		panel.setSrc(null);
   	}
});
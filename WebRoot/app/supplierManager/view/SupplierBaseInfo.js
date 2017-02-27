//供应商基本信息页面
Ext.define('srm.supplierManager.view.SupplierBaseInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierBaseInfo',
	requires:['srm.supplierManager.view.SupplierBusInfo',
			'srm.basicdata.companyClass.store.CompanyClass',
			'srm.basicdata.industryClass.store.IndustryClass',
			'srm.basicdata.taxmanClass.store.TaxmanClass',
			'srm.basicdata.currency.store.Currency',
			'srm.supplierManager.store.Area'],
	overflowY: 'auto',
	//height:800,
//	isAdd:false,
//	isEdit:false,
	initComponent:function(){
		var me=this;
		me.companyClassStore=Ext.create('srm.basicdata.companyClass.store.CompanyClass');
		me.companyClassStore.load();
		me.industryClassStore=Ext.create('srm.basicdata.industryClass.store.IndustryClass');
		me.industryClassStore.load();
		me.taxmanClassStore=Ext.create('srm.basicdata.taxmanClass.store.TaxmanClass');
		me.taxmanClassStore.load();
		me.currencyStore=Ext.create('srm.basicdata.currency.store.Currency');
		me.currencyStore.load();
		me.first_areastore=Ext.create('srm.supplierManager.store.Area');
		me.first_areastore.load({
			params:{
				levelType:1
			}
		});
		me.reg_second_areastore=Ext.create('srm.supplierManager.store.Area');
		me.reg_third_areastore=Ext.create('srm.supplierManager.store.Area');
		me.contact_second_areastore=Ext.create('srm.supplierManager.store.Area');
		me.contact_third_areastore=Ext.create('srm.supplierManager.store.Area');
//		//厂商类别
//		me.treepickerStore=Ext.create('srm.basicdata.materialClass.store.MaterialClassTreeChk');
//		//归档的类别排除
//		me.treepickerStore.proxy.extraParams.is_archive=0;
		me.materialClassStore_1=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_2=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_3=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_1.proxy.extraParams.is_archive=0;
		me.materialClassStore_2.proxy.extraParams.is_archive=0;
		me.materialClassStore_3.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.load({params:{f_id:0}});
		//供应商子材料类别
		me.supplierMaterialSub1Store=Ext.create('srm.supplierManager.store.SupplierMaterialSub1');
		
		Ext.apply(me,{
			defaults:{padding:0},
			//layout:'border',
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    	},
    	
			items:[{
			//基本信息
				//title:'基本信息',
				border:true,
				autoScroll:true,
				//height:480,
				//region:'center',
				//flex:2,
				xtype:'form',
				itemId:'PanelBaseInfo',
				dockedItems:[
   	  	  		{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  		items:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'}]}
				//buttons:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'}
//				,
//				"-",
//    			{text:'关闭',glyph:0xf00d,
//    				handler:function(){
//    					me.close();	
//    					}
//    			}
   			],
    			items:[{
    				xtype:'fieldset',
    				title:'<span style="color:#008cd6">基本信息</span>',
					collapsible: true,
					padding:4,
					
				layout:'column',
				defaults : {
					
					labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'0 4 4 4',
					msgTarget : 'side',
					autoFitErrors : true
				},
					items:[{
						fieldLabel:'公司中文名称',
						allowBlank:false,
						name:'cpyname_cn',
						itemId:'cpyname_cn',
						
						emptyText:'(供应商名称)',
						maxLength:150,
						columnWidth:1/3
					},{
						itemId:'cpyname_en',
						name:'cpyname_en',
						fieldLabel:'公司英文名称',
						maxLength:150,
						columnWidth:1/3
					},
					{
						itemId:'corporation',
						name:'corporation',
						fieldLabel:'公司法人代表',
						
						columnWidth:1/3
					},
					{
						itemId:'is_chinese',
						name:'is_chinese',
						fieldLabel:'是否国内',
						xtype:'combo',
						allowBlank:false,
						emptyText:'(必填项)',
						store:[[0,'国内'],[1,'国外']],
						listeners:{	
							'change':function(th,newValue,oldValue,eOpts){
								//国内
								if(newValue==0)
								{
									me.down('#area_pro_reg').setDisabled(false);
									me.down('#area_city_reg').setDisabled(false);
									me.down('#reg_addr_code').setDisabled(false);
									me.down('#area_pro_contact').setDisabled(false);
									me.down('#area_city_contact').setDisabled(false);
									me.down('#contact_addr_code').setDisabled(false);
								}
								//国外,则地址三级选择下拉框不可用
								else
								{
									me.down('#area_pro_reg').setValue(null);
									me.down('#area_city_reg').setValue(null);
									me.down('#reg_addr_code').setValue(null);
									me.down('#area_pro_contact').setValue(null);
									me.down('#area_city_contact').setValue(null);
									me.down('#contact_addr_code').setValue(null);
									
									me.down('#area_pro_reg').setDisabled(true);
									me.down('#area_city_reg').setDisabled(true);
									me.down('#reg_addr_code').setDisabled(true);
									me.down('#area_pro_contact').setDisabled(true);
									me.down('#area_city_contact').setDisabled(true);
									me.down('#contact_addr_code').setDisabled(true);
								}
							}
						},
						columnWidth:2/9
					},
					
					{
						fieldLabel:'注册地址',
						itemId:'area_pro_reg',
						queryMode:'local',
						name:'area_pro_reg',
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
								
								itemId:'area_city_reg',
								name:'area_city_reg',
								columnWidth:1/9,
								xtype:'combo',
								store :me.reg_second_areastore,
								queryMode:'local',
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true,
								allowBlank:false,
								emptyText:'(必填项)',
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
								itemId:'reg_addr_code',
								name:'reg_addr_code',
								columnWidth:1/9,
								xtype:'combo',
								queryMode:'local',
								allowBlank:false,
								emptyText:'(必填项)',
								store :me.reg_third_areastore,
								displayField:'area_name',
								valueField:'area_id',
								forceSelection:true
							},
					{
						itemId:'reg_addr',
						name:'reg_addr',
						fieldLabel:'详细注册地址',
						
						columnWidth:1/3
					},
					{	
						itemId:'f_phone',
						name:'f_phone',
						fieldLabel:'公司固定电话',
						
						columnWidth:2/9
						
					},

					{
						itemId:'area_pro_contact',
								fieldLabel:'联系地址',
								
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
								itemId:'contact_addr_code',
								name:'contact_addr_code',
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
						itemId:'contact_addr',
						name:'contact_addr',
						fieldLabel:'详细联系地址',
						
						columnWidth:1/3
					},
					//厂商类别一级
					{
 						fieldLabel:'厂商类别',
						name:'mc_id_1',
						itemId:'materialClass_1',
						xtype:'combo',
						allowBlank:false,
						emptyText:'(必填项)',
						columnWidth:2/9,
						queryMode:'local',
						forceSelection:true,
						store:me.materialClassStore_1,
						displayField:'mc_name',
						valueField:'mc_id',
						listeners:{
							//'change':function(th,newValue,oldValue,eOpts)
							'select':function(combo,record,eOpts)
							{
								me.down('#materialClass_2').setValue('');
								me.materialClassStore_2.load({params:{f_id:record.get('mc_id')}});
								
							}
						}
						
 					},
 					//厂商类别二级
 					{
 						itemId:'materialClass_2',
 						name:'mc_id_2',
 						xtype:'combo',
						allowBlank:false,
						emptyText:'(必填项)',
						columnWidth:2/9,
						queryMode:'local',
						multiSelect:true,
						forceSelection:true,
						store:me.materialClassStore_2,
						displayField:'mc_name',
						valueField:'mc_id',
						listConfig:{
 						//itemTpl:'<tpl for="."><div class="x-combo-list-item" onClick="onClick(this)"><span><input type="checkbox" value="{[values.id]}" /> {name}</span></div></tpl>'
 						itemTpl : Ext.create('Ext.XTemplate','<input type=checkbox />{mc_name}'),
 						listeners:{
 							itemclick:function(view, record, item, index, e, eOpts ){  
 								
 							 	var isSelected = view.isSelected(item);  
 								var checkboxs = item.getElementsByTagName("input");  
 				 			 	if(checkboxs!=null)  
  							 	{  
      								var checkbox = checkboxs[0];  
      								if(!isSelected)  
     							 	{  
         							 checkbox.checked = true;  
      								}else{  
          							checkbox.checked = false;  
      								}  
  							 	}  
 							}	  
 							}
 						},
						listeners:{
							'select':function(combo,records,eOpts)
							{
								
								me.down('#materialClass_3').setValue('');
								me.materialClassStore_3.removeAll();
								me.isLastMaterialClass=true;
								var fidArray=[];
								for(var i=0;i<records.length;i++)
								{
									fidArray.push(records[i].get('mc_id'));
								}
								
								var list=me.getMaterialClassListByFids(fidArray);
								
								if(list.length>0)
								{
									me.isLastMaterialClass=false;
									me.materialClassStore_3.add(list);
								}
								
							}
						}
 					},
 					//厂商类别三级
 					{
 						itemId:'materialClass_3',
 						name:'mc_id_3',
 						xtype:'combo',
						queryMode:'local',
						forceSelection:true,
						multiSelect:true,
						columnWidth:2/9,
						store:me.materialClassStore_3,
						displayField:'mc_name',
						valueField:'mc_id',
						listConfig:{
 						//itemTpl:'<tpl for="."><div class="x-combo-list-item" onClick="onClick(this)"><span><input type="checkbox" value="{[values.id]}" /> {name}</span></div></tpl>'
 						itemTpl : Ext.create('Ext.XTemplate','<input type=checkbox />{mc_name}'),
 						listeners:{
 							itemclick:function(view, record, item, index, e, eOpts ){  
 								
 							 	var isSelected = view.isSelected(item);  
 								var checkboxs = item.getElementsByTagName("input");  
 				 			 	if(checkboxs!=null)  
  							 	{  
      								var checkbox = checkboxs[0];  
      								if(!isSelected)  
     							 	{  
         							 checkbox.checked = true;  
      								}else{  
          							checkbox.checked = false;  
      								}  
  							 	}  
 							}	  
 							}
 						},
 						listeners:{
//							'select':function(combo,records,eOpts)
//							{
//								console.log("第三级select事件");
//								me.isLastMaterialClass=true;
//							},
							'change':function(th, newValue, oldValue, eOpts)
							{
								
								if(!Ext.isEmpty(newValue))
								{
								me.isLastMaterialClass=true;
								}
								else
								{
								me.isLastMaterialClass=false;
								}
							}
 						}
 					},
					{
						itemId:'fax',
						name:'fax',
						fieldLabel:'公司传真号',
						
						columnWidth:1/3
					},
					
					{
						itemId:'contacts',
						name:'contacts',
						fieldLabel:'联系人',
						
						columnWidth:1/3
					}
					,
					{
						
						itemId:'m_phone',
						name:'m_phone',
						fieldLabel:'联系人手机号',
						
						columnWidth:1/3
					},
					
					
					{
						itemId:'email',
						name:'email',
						fieldLabel:'E-Mail',
						
						columnWidth:1/3
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
//						allowBlank:false,
//						emptyText:'(必填项)',
						columnWidth:1/3
					},
					{
						itemId:'nature_id',
						name:'nature_id',
						fieldLabel:'企业性质',
						
						xtype:'combo',
						store :me.companyClassStore,
						displayField:'nature_name',
						valueField:'nature_id',
						forceSelection:true,
						
						columnWidth:1/3
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
//						allowBlank:false,
//						emptyText:'(必填项)',
						columnWidth:1/3
					},
					{
						fieldLabel:'营业执照号',
						itemId:'bus_license',
						name:'bus_license',
						
						columnWidth:1/3
					},
					{
						fieldLabel:'公司税籍编号',
						itemId:'tax_no',
						name:'tax_no',
						
						columnWidth:1/3
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
							allowBlank:false,
							emptyText:'(必填项)',
							step:1,
							minValue: 0,
							decimalPrecision :2,
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
						
						columnWidth:1/3
					},
					{
						fieldLabel:'成立日期',
						itemId:'establish_dt',
						name:'establish_dt',
						
						xtype:'datefield',
						format:'Y-m-d',
						columnWidth:1/3
					}
					,
					{
						fieldLabel:"公司面积(m²)",
						itemId:'company_area',
						name:'company_area',
						xtype:'numberfield',
						step:1,
						minValue: 0,
						decimalPrecision :0,
						columnWidth:1/3
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
						columnWidth:1/3
					},
	           		
					{
						fieldLabel:'公司总人数',
						itemId:'emplyees',
						name:'emplyees',
						xtype:'numberfield',
						step:1,
						minValue: 0,
						decimalPrecision :0,
						
						columnWidth:1/3
					},
					{
	           			fieldLabel:'厂房面积(m²)',
	           			//labelWidth:60,
	           			itemId:'factory_area',
						name:'factory_area',
						xtype:'numberfield',
						step:1,
						minValue: 0,
						decimalPrecision :0,
						columnWidth:1/3
	           		},
		           	{
		           	fieldLabel:'操作工人数',
					itemId:'op_num',
					name:'op_num',
					xtype:'numberfield',
					decimalPrecision :0,
					columnWidth:1/3,
					step:1,
					value:0,
					minValue: 0
		           	},
		           	{
						fieldLabel:'开发技术人数',
						itemId:'tech_num',
						name:'tech_num',
						xtype:'numberfield',
						decimalPrecision :0,
						columnWidth:1/3,
						step:1,
						value:0,
						minValue: 0		           	
		           	},
					{
						fieldLabel:'专职检验人数',
						itemId:'qc_num',
						name:'qc_num',
						xtype:'numberfield',
						decimalPrecision :0,
						columnWidth:1/3,
						step:1,
						value:0,
						minValue: 0
					},{
						fieldLabel:'间接员工人数',
						itemId:'staff_num',
						name:'staff_num',
						xtype:'numberfield',
						decimalPrecision :0,
						columnWidth:1/3,
						step:1,
						value:0,
						minValue: 0
					},{
							fieldLabel:'大专以上人数',
							itemId:'college_num',
						name:'college_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
					},{
							fieldLabel:'内审员资格人数',
						itemId:'qe_num',
						name:'qe_num',
							xtype:'numberfield',
							decimalPrecision :0,
							columnWidth:1/3,
							step:1,
							value:0,
							minValue: 0
					}
					,
					
	           		{
	           			fieldLabel:"认证体系",
	           			itemId:'certification_system',
	           			name:'certification_system',
	           			xtype:'combo',
	           			store:[['ISO9000','ISO9000'],['ISO14000','ISO14000']],
	           			columnWidth:1/3
	           		},
	           		{
	           			fieldLabel:"租赁/自建",
	           			itemId:'factory_owner',
						name:'factory_owner',
						xtype:'combo',
						store : [[1, '租赁'],
						[2, '自建']],
						columnWidth:1/3
	           			
	           		},
	           		{
	           			fieldLabel:'使用年限',
	           			labelWidth:100,
	           			xtype:'datefield',
	           			itemId:'use_begintime',
						name:'use_begintime',
	           			format:'Y-m-d',
	           			columnWidth:1/3
	           		},
	           		{
	           			fieldLabel:'至',
	           			labelStyle:'text-align:center;color:#000',
	           			labelWidth:100,
	           			xtype:'datefield',
	           			itemId:'use_endtime',
						name:'use_endtime',
	           			format:'Y-m-d',
	           			columnWidth:1/3
	           		}
				]
				}]
			},
			{xtype:'splitter'}
			,{//业务信息
				//region:'south',
				title:'业务信息',
				border:true,
				autoScroll :'true',
				//minHeight:'150',
				flex:1,
				itemId:'supplierBusInfo',
				xtype:'SupplierBusInfo'
				
			}
			]
		});
		me.callParent(arguments);
		
	}
	,
	loadBaseData:function(rec)
	{
		
		var me=this;
		//默认为最后一级，true，防止编辑后打开时为undefined
		me.isLastMaterialClass=true;
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
			
			
			me.down('#PanelBaseInfo').loadRecord(rec);
			
			if(!me.isAdd)
			{
				if(!Ext.isEmpty(rec.get('mc_id_1')))
				{
					//厂商类别二级的设置
					me.materialClassStore_2.load({params:{f_id:rec.get('mc_id_1')}});
					
					if(!Ext.isEmpty(rec.get('mc_id_2')))
					{
						var array_2=[];
						array_2=rec.get('mc_id_2').split(',');
						//多选
						me.down('#materialClass_2').setValue(array_2);
						//第三级store
						var list_3=me.getMaterialClassListByFids(array_2);
						me.materialClassStore_3.add(list_3);
						
					}
				}
				if(!Ext.isEmpty(rec.get('mc_id_3')))
				{
					//设置厂商类别第三级多选数组
					var array_3=[];
					array_3=rec.get('mc_id_3').split(',');
					me.down('#materialClass_3').setValue(array_3);
				}
				//供应商与最末级材料关联表store
				me.supplierMaterialSub1Store.load({
					params:{
						company_id:rec.get('company_id')
					}
				});
				
			}
			
	}
	//将供应商Id赋值给供应商材料类别关系表
	,setCIdToSupplierMaterial:function(rec)
	{
		var me=this;
		var s_m_Records1=me.supplierMaterialSub1Store.getRange();
  		for(var i=0;i<s_m_Records1.length;i++)
  		{
  			
  			s_m_Records1[i].set('company_id',rec.get('company_id'));
  			
  		}
		
	},
	//根据多个父级Id获取材料类别
	getMaterialClassListByFids:function(fidArray)
	{
		var me=this;
		var list=srm.Const.callServiceMethodSync('materialClass/materialClass.do?method=getMaterialClassListByFids',{fidArray:fidArray.join(',')});
		return list;
	}
});
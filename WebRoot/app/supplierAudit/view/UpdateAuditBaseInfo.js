Ext.define('srm.supplierAudit.view.UpdateAuditBaseInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.update_auditBaseInfo',
	requires:['srm.basicdata.companyClass.store.CompanyClass',
			'srm.basicdata.industryClass.store.IndustryClass',
			'srm.basicdata.tradeClass.store.TradeClass',
			'srm.basicdata.currency.store.Currency',
			'srm.supplierAudit.store.Area'],
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		
		//企业类型
		me.companyClassStore=Ext.create('srm.basicdata.companyClass.store.CompanyClass');
		me.companyClassStore.load();
		//经营模式
		me.industryClassStore=Ext.create('srm.basicdata.industryClass.store.IndustryClass');
		me.industryClassStore.load();
		//所属行业
		me.tradeClassStore=Ext.create('srm.basicdata.tradeClass.store.TradeClass');
		me.tradeClassStore.load();
		//币种
		me.currencyStore=Ext.create('srm.basicdata.currency.store.Currency');
		me.currencyStore.load();
		me.first_areastore=Ext.create('srm.supplierAudit.store.Area');
		me.first_areastore.load({
			params:{
				levelType:1
			}
		});
		me.second_areastore=Ext.create('srm.supplierAudit.store.Area');
		me.second_areastore.load({
			params:{
				levelType:2
			}
		});
		me.third_areastore=Ext.create('srm.supplierAudit.store.Area');
		me.third_areastore.load({
			params:{
				levelType:3
			}});
		
		Ext.apply(me,{
			defaults:{padding:0},
				layout:{type:'vbox',//垂直分布
						align:'stretch'
						},
				padding:'10 0 0 0',
				items:[{
					//基本信息
					
					autoScroll:true,
					xtype:'form',
					itemId:'PanelBaseInfo',
					layout:'column',
					defaults : {
						
						labelWidth : 80,
						xtype:'textfield',
						labelStyle : 'font-weight:nomal;text-align:left;color:#000',
						padding:'0 6 6 6',
						msgTarget : 'side',
						autoFitErrors : true
					},
					items:[{
						fieldLabel:'企业名称',
						name:'cpyname_cn',
						itemId:'cpyname_cn',
						columnWidth:1/3
					},
					{
						fieldLabel:'企业类型',
						name:'nature_id',
						itemId:'nature_id',
						readOnly:true,
						xtype:'combo',
						store :me.companyClassStore,
						displayField:'nature_name',
						valueField:'nature_id',
						columnWidth:1/3
					}
					,
					{
						fieldLabel:'营业模式',
						name:'industry_id',
						itemId:'industry_id',
						readOnly:true,
						xtype:'combo',
						store :me.industryClassStore,
						displayField:'industry_name',
						valueField:'industry_id',
						columnWidth:1/3
						
					},
					{
						fieldLabel:'所属行业',
						name:'class_id',
						itemId:'class_id',
						readOnly:true,
						xtype:'combo',
						store :me.tradeClassStore,
						displayField:'class_name',
						valueField:'class_id',
						columnWidth:1/3
						
					},
					{
						fieldLabel:'主营业务',
						name:'key_remark',
						itemId:'key_remark',
						columnWidth:1/3
						
					},
					{
						fieldLabel:'法人代表',
						name:'corporation',
						itemId:'corporation',
						columnWidth:1/3
						
					},
					{
						xtype:'panel',
						layout:{type:'hbox',align:'stretch'},
						items:[
							{fieldLabel:'注册资本(万)',
							itemId:'reg_fund',
							name:'reg_fund',
							xtype:'textfield',
							labelStyle : 'font-weight:nomal;text-align:left;color:#000000',
							labelWidth : 80,
							flex:2},
							{
								xtype:'textfield',
								itemId:'currency_id',
								name:'currency_id',
								readOnly:true,
								xtype:'combo',
								store :me.currencyStore,
								displayField:'currency_name',
								valueField:'currency_id',
								flex:1
							}],
						columnWidth:1/3
						
					},
					{
						fieldLabel:'成立日期',
						name:'establish_dt',
						itemId:'establish_dt',
						xtype:'datefield',
						format:'Y-m-d',
						readOnly:true,
						columnWidth:1/3
						
					}
					/*,
					{
						fieldLabel:'联系电话',
						name:'f_phone',
						itemId:'f_phone',
						columnWidth:1/3
						
					}
					,
					
					{
						xtype:'panel',
						layout:{type:'hbox',align:'stretch'},
						defaults : {
						labelWidth : 80,
						xtype:'textfield',
						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
						
						},
						items:[
						
						{
							fieldLabel:'联系地址',
							itemId:'area_pro_contact',
							name:'area_pro_contact',
							xtype:'combo',
							readOnly:true,
							store :me.first_areastore,
							displayField:'area_name',
							valueField:'area_id',
							flex:3
						},
						{
						
							itemId:'area_city_contact',
							name:'area_city_contact',
							xtype:'combo',
							readOnly:true,
							store :me.second_areastore,
							displayField:'area_name',
							valueField:'area_id',
							flex:2	
						},
						{
						
							itemId:'contact_addr_code',
							name:'contact_addr_code',
							xtype:'combo',
							readOnly:true,
							store :me.third_areastore,
							displayField:'area_name',
							valueField:'area_id',
							flex:2
						}
						],
						columnWidth:2/3
					},
					{
						name:'contact_addr',
						itemId:'contact_addr',
						columnWidth:1/3
					},
					{
						fieldLabel:'企业简介',
						xtype:'textareafield',
						name:'company_introduction',
						itemId:'company_introduction',
						grow:false,
						height:150,
						columnWidth:1
						
					}*/
					,{
						hidden:true,
						xtype:'panel',
						itemId:'opinion_pl',
						columnWidth:1,
						layout:{type:'hbox',align:'stretch'},
						defaults:{
							labelWidth:80,xtype:'textfield',
 							labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
						items:[{
							fieldLabel:'审核意见',
							xtype:'textareafield',
							name:'auth_opinion',
							itemId:'auth_opinion',
							grow:false,
							height:150,
							flex:1
						}]
					}
					]
				}]
		});
		me.callParent(arguments);
		
	},
	loadBaseData:function(rec)
	{
		var me=this;
		me.down('#PanelBaseInfo').loadRecord(rec);
		//不合格，显示审核意见
		if(rec.get('state')==3)
		{
			console.log("当前状态："+rec.get('state'));
			me.down('#opinion_pl').show();
		}
		/*var contact_addr_code=rec.get('contact_addr_code')+"";
		if(!Ext.isEmpty(contact_addr_code)){
			var area_pro_contact=parseInt(contact_addr_code.substring(0,2)+"0000");
			var area_city_contact=parseInt(contact_addr_code.substring(0,4)+"00");
			me.down('#area_pro_contact').setValue(area_pro_contact);
			me.down('#area_city_contact').setValue(area_city_contact);
		}
		*/
	}
	
});
Ext.define('srm.supplierAudit.view.SupplierBaseInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.audit_supplierBaseInfo',
	requires:['srm.basicdata.companyClass.store.CompanyClass',
			'srm.basicdata.industryClass.store.IndustryClass',
			'srm.basicdata.tradeClass.store.TradeClass',
			'srm.basicdata.currency.store.Currency',
			'srm.supplierAudit.store.Area'],
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		/*var companyNatureStore=new Ext.data.JsonStore({
			autoDestroy: true,
			autoLoad:true,
			storeId:'companyNatureStore',
			proxy: {
		        type: 'ajax',
		        url: '/newresources/json/companyNature.json',
		        reader:{type:'json',rootProperty:'CompanyClassesUtil'}
		    	},
		    fields:['class_id','class_name']
		});
		me.companyNatureStore=Ext.create('Ext.data.JsonStore',{
			fields:['nature_id','nature_name'],
			data:[{nature_id: '1', nature_name: '个体经营'},
                    {nature_id: '2', nature_name: '内资企业'},
                    {nature_id: '3', nature_name: '国有企业'},
                    {nature_id: '4', nature_name: '集体企业'},
                    {nature_id: '5', nature_name: '股份合作企业'},
                    {nature_id: '6', nature_name: '联营企业'},
                    {nature_id: '7', nature_name: '有限责任公司'},
                    {nature_id: '8', nature_name: '股份有限公司'},
                    {nature_id: '9', nature_name: '私营企业'},
                    {nature_id: '10', nature_name: '其他企业'},
                    {nature_id: '11', nature_name: '港、澳、台商投资企业'},
                    {nature_id: '12', nature_name: '合资经营企业（港或澳、台资）'},
                    {nature_id: '13', nature_name: '合作经营企业（港或澳、台资）'},
                    {nature_id: '14', nature_name: '港、澳、台商独资经营企业'},
                    {nature_id: '15', nature_name: '港、澳、台商投资股份有限公司'},
                    {nature_id: '16', nature_name: '外商投资企业'},
                    {nature_id: '17', nature_name: '中外合资经营企业'},
                    {nature_id: '18', nature_name: '中外合作经营企业'},
                    {nature_id: '19', nature_name: '外商投资股份有限公司'}]
			
		});*/
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
					]
				},
				{xtype:'splitter'},
				{
					//其他
					title:'其他信息',
					autoScroll :'true',
					flex:1
					,
					itemId:'supplierotherInfo',
					xtype:'audit_SupplierotherInfo'
				}]
		});
		me.callParent(arguments);
		
	},
	loadBaseData:function(rec)
	{
		var me=this;
		me.down('#PanelBaseInfo').loadRecord(rec);
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
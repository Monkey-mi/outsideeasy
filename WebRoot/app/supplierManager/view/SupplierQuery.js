/*筛选查询*/
Ext.define('srm.supplierManager.view.SupplierQuery',{
	extend:'srm.ux.Window',
	alias:'widget.supplierMoreQuery',
	//iconCls:'page_find',
	title:'供应商筛选条件',
	width:600,
	height:290,
	frame:true,
	modal:true,
	prefix:'t_app_company_info.',
	initComponent : function() {
		var me=this;
		me.companyClassStore=Ext.create('srm.basicdata.companyClass.store.CompanyClass');
		me.companyClassStore.load();
		me.industryClassStore=Ext.create('srm.basicdata.industryClass.store.IndustryClass');
		me.industryClassStore.load();
		me.materialClassStore_1=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_2=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_3=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_1.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.proxy.extraParams.f_id=0;
		me.materialClassStore_2.proxy.extraParams.is_archive=0;
		me.materialClassStore_3.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.load();
		me.first_areastore=Ext.create('srm.supplierManager.store.Area');
		me.first_areastore.load({
			params:{
				levelType:1
			}
		});
		
//		me.reg_second_areastore=Ext.create('srm.supplierManager.store.Area');
//		me.reg_third_areastore=Ext.create('srm.supplierManager.store.Area');
		Ext.apply(me,{
			layout:'fit',
			padding:10,
			items:[{
				xtype:'form',
				frame:true,
				//heigth:50,
				layout:'column',
				defaults:{padding:4,xtype:'textfield',labelWidth:80,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
				items:[
					{
						name      : 'checkbox_cpyname_cn',
						itemId:'checkbox_cpyname_cn',
                    	xtype 	  :'checkbox',
                    	
	                    columnWidth:0.1
					},
					{
						fieldLabel:'供应商名称',
						name:'cpyname_cn',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cpyname_cn').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					
					{
						name      : 'checkbox_apply_sts',
						itemId:'checkbox_apply_sts',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'供应商状态',
						name:'apply_sts',
						xtype:'combo',
						store:[[0,'全部'],[5,'已提交'],[10,'审核中'],[15,'审核通过'],[20,'不合格']],
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								
								if(!Ext.isEmpty(value)&&value!='0'){
							  		me.down('#checkbox_apply_sts').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
						
					},	
					{
						name      : 'checkbox_materialClass',
						itemId:'checkbox_materialClass',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'厂商类别',
						name:'mc_id_1',
						itemId:'materialClass_1_search',
						xtype:'combo',
						displayField:'mc_name',
						valueField:'mc_id',
						store:me.materialClassStore_1,
						queryMode:'local',
						columnWidth:.4
						,listeners:{
							'change':function(th,newValue,oldValue,eOpts){
								if(!Ext.isEmpty(newValue)){
							  		me.down('#checkbox_materialClass').setValue(true);
							  		me.down('#materialClass_2_search').setValue('');
 									me.materialClassStore_2.load({params:{f_id:newValue}});
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name:'mc_id_2',
						itemId:'materialClass_2_search',
						xtype:'combo',
						displayField:'mc_name',
						valueField:'mc_id',
						store:me.materialClassStore_2,
						queryMode:'local',
						columnWidth:.25
						,listeners:{
							'change':function(th,newValue,oldValue,eOpts){
								if(!Ext.isEmpty(newValue)){
							  		me.down('#checkbox_materialClass').setValue(true);
							  		me.down('#materialClass_3_search').setValue('');
 									me.materialClassStore_3.load({params:{f_id:newValue}});
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					}
					,{
						name:'mc_id_3',
						itemId:'materialClass_3_search',
						xtype:'combo',
						displayField:'mc_name',
						valueField:'mc_id',
						store:me.materialClassStore_3,
						queryMode:'local',
						columnWidth:.25
						,listeners:{
							'change':function(th,newValue,oldValue,eOpts){
								if(!Ext.isEmpty(newValue)){
							  		me.down('#checkbox_materialClass').setValue(true);
 									
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					
					{
						name      : 'checkbox_reg_addr',
						itemId:'checkbox_reg_addr',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'注册省份',
						name:'reg_addr',
						item:'reg_add',
						xtype:'combo',
						displayField:'area_name',
						valueField:'area_id',
						forceSelection:true,
						store:me.first_areastore,
						queryMode:'local',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_reg_addr').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_operator',
						itemId:'checkbox_operator',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'操作员',
						name:'operator',
						itemId:'operator',
						columnWidth:0.4
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_operator').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
						
					},
					{
						fieldLabel:'审核员',
						name:'auditor',
						itemId:'auditor',
						columnWidth:0.5
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_operator').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_industry_id',
						itemId:'checkbox_industry_id',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
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
						columnWidth:0.4
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_industry_id').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
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
						columnWidth:0.5
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_industry_id').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					}
					
				],
			
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
				handler:me.doQuery
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	doQuery:function(){
		Ext.apply(me.mainstore.proxy.extraParams, 
			{
				moreCondition:me.getQueryCondition()
			 }
		);
		me.mainview.loadMain();
		me.close();
	},
	getQueryCondition:function(){
		var me=this;
		var condition=null;
		var form=me.down('form');
		 if (form.getForm().isDirty()){
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
						if(!Ext.isEmpty(obj[x]))
						{ 
							
							//供应商名称					
						 	if(x=='cpyname_cn' && obj['checkbox_cpyname_cn']){
						 		arr.push(me.prefix+"cpyname_cn like '%"+obj[x]+"%' ");
					 		}
					 		//供应商状态
					 		else if(x=='apply_sts' && obj['checkbox_apply_sts']){
					 			arr.push(me.prefix+"apply_sts = '"+obj[x]+"' ");
					 		}
					 		//厂商类别勾选
					 		else if((x=='mc_id_1'||x=='mc_id_2'||x=='mc_id_3')&&obj['checkbox_materialClass']){
					 			if(x=='mc_id_1'&&obj[x]>0)
					 			{
						 		arr.push(me.prefix+"mc_id_1='"+obj[x]+"'");
						 		}
						 		if(x=='mc_id_2'&&obj[x]>0)
					 			{
						 		arr.push(" FIND_IN_SET("+obj[x]+",mc_id_2) ");
						 		}
						 		if(x=='mc_id_3'&&obj[x]>0)
					 			{
					 			
						 		arr.push(" FIND_IN_SET("+obj[x]+",mc_id_3) ");
						 		}
					 		}
					 		//操作员、审核员
					 		else if((x=='operator'||x=='auditor')&& obj['checkbox_operator']){
					 			
					 			if(x=='operator')
					 			{
						 		arr.push(me.prefix+"operator like '%"+obj[x]+"%' ");
					 			}
					 			if(x=='auditor')
					 			{
						 		arr.push(me.prefix+"auditor like '%"+obj[x]+"%' ");
					 			}
					 		}
					 		//注册地址省份
					 		else if(obj['checkbox_reg_addr']){
					 			if(x=='reg_addr')
					 			{
					 				
					 				arr.push("LEFT("+me.prefix+"reg_addr_code,2)= '"+obj[x].toString().substring(0,2)+"' ");
					 			}
						 	}
						 	//行业性质、企业性质
					 		else if( obj['checkbox_industry_id']){
					 			if(x=='industry_id')
					 			{
						 		arr.push(me.prefix+"industry_id='"+obj[x]+"' ");
					 			}
					 			if(x=='auditor'&&!Ext.isEmpty(obj['auditor']))
					 			{
						 		arr.push(me.prefix+"auditor ='"+obj[x]+"' ");
					 			}
					 		}
						}
				}
				condition=arr.join(' and ');
			}
			
			return condition;
	}
});
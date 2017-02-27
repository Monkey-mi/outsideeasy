//供应商业务信息页面
Ext.define('srm.supplierFile.view.SupplierFileBusShow',{
	extend:'Ext.tab.Panel',
	requires:[
	        'srm.supplierFile.store.AccInvoiceTitle',
			'srm.supplierFile.store.AccDevicelist',
			'srm.supplierFile.store.AccMetarial',
			'srm.supplierFile.store.AccMainCustomer',
			'srm.supplierFile.store.AccCompetitor',
			'srm.supplierFile.store.AccBankAccount',
			'srm.supplierFile.store.AccGoods',
			'Ext.ux.TreePicker'],
	alias:'widget.SupplierFileBusShow',
	//company_id:-1,
	overflowY: 'auto',
	//height:300,
	initComponent:function(){
		var  me=this;
		//发票抬头store
		me.invoicestore=Ext.create('srm.supplierFile.store.AccInvoiceTitle');
		//主要设备明细store
		me.devicelistStore=Ext.create('srm.supplierFile.store.AccDevicelist');
		//公司产品主要用料表
		me.metarialStore=Ext.create('srm.supplierFile.store.AccMetarial');
		//公司主要客户
		me.maincustomerStore=Ext.create('srm.supplierFile.store.AccMainCustomer');
		//公司主要竞争对手
		me.competitorStore=Ext.create('srm.supplierFile.store.AccCompetitor');
		//公司银行账号
		me.bankAccountStore=Ext.create('srm.supplierFile.store.AccBankAccount');
		//公司产品
		me.goodsStore=Ext.create('srm.supplierFile.store.AccGoods');
		//材料类别
		me.treepickerStore=Ext.create('srm.basicdata.materialClass.store.MaterialClassTreeChk');
		me.materialClassStore=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore.load();
		Ext.apply(me,{
		defaults:{padding:5,layout:'fit'},	
		border:false,
		items:[
		    	{
		    		title:'主要设备明细',
		    		itemId:'plEquipmentDetails',
		    		//layout:'anchor',
		    		layout:'absolute',
		    		overflowY: 'auto',
		    		overflowX:'auto',
		    		tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdEquipmentDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccDevicelist',{"company_id":me.company_id});
								
								//rowEditing.cancelEdit();
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdEquipmentDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
		    		items:[
		    		{
		    			xtype:'grid',
		    			itemId:'grdEquipmentDetails',
		    			x:2,
		    			y:2,
		    			multiSelect:true,
						selModel:Ext.create('Ext.selection.CheckboxModel'),
		    			columns:[
		    			{header:'序号',xtype:'rownumberer',width:60},
		    			{header:'<div style="text-align:center"><span style="color:red;">*</span>设备名称</div>',dataIndex:'device_name',editor:{xtype:'textfield',allowblank:false},width:120},
		    			{header:'<div style="text-align:center">设备规格</div>',dataIndex:'specifications',editor:{xtype:'textfield'},width:150},
		    			{header:'<div style="text-align:center">设备产地</div>',dataIndex:'place',editor:{xtype:'textfield',maxLength:150},width:120},
		    			{header:'设备价值(万元)',dataIndex:'price',align:'right',editor:{xtype:'textfield',maxLength:150},width:150},
		    			{header:'<div style="text-align:center">设备购买日期</div>',dataIndex:'buy_day',width:120,xtype:'datecolumn',format:'Y-m-d',
		    				renderer:function(value){
								if(value!=null){
									return Ext.Date.format(value, 'Y-m-d');  
								}},field:{
									xtype:'datefield',
									maxValue:new Date()
								},
								align:'center'
//								,
//								allowBlank:false,
//			   	  	  			blankText:'请选择购买日期'
			   	  	  	},
			   	  	  	{header:'设备数量',dataIndex:'device_num',editor:{xtype:'numberfield',minValue: 0},align:'center',width:80},
		    			{header:'<div style="text-align:center">设备先进性</div>',dataIndex:'advanced',editor:{xtype:'textfield',maxLength:150},width:180}
		    			],
		    			plugins: {
							 ptype: 'cellediting',
							 clicksToEdit: 1,
					         listeners:{
							      beforeedit:function(editor,con,e){
							        	if(!me.isEdit){
							        		return false
							        	}
							      },
							      edit:function(editor,con,e){
							        	var field=con.field;
							        	var rec=con.record;
							      }
							 }
						},
				    	store:me.devicelistStore
		    		}
		    		]
		    	},{
						title:'原材料及品牌',
						itemId:'plmaterialsDetails',
						layout:'absolute',
						
						overflowY: 'auto',
		    			overflowX:'auto',
						tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdMaterialsDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccMetarial',{"company_id":me.company_id});
								
								
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdMaterialsDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
						items:[{
							xtype:'grid',
							//minHeight:100,
							itemId:'grdMaterialsDetails',
							border:true,
							//anchor:'70%',
							x:2,
		    			y:2,
		    			width:800,
							multiSelect:true,
							selModel:Ext.create('Ext.selection.CheckboxModel'),
							columns:[
				    			{header:'序号',xtype:'rownumberer',width:60},
				    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'material_name',editor:{allowblank:false},flex:1},
				    			{header:'<div style="text-align:center">材料品牌</div>',dataIndex:'material_brand',editor:{},flex:1}
				    			],
				    		store:me.metarialStore,
				    		plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1,
							        listeners:{
									      beforeedit:function(editor,con,e){
									        	if(!me.isEdit){
									        		return false
									        	}
									      },
									      edit:function(editor,con,e){
									        	var field=con.field;
									        	var rec=con.record;
									      }
									 }
							    }
						}]
						
		    	},{
		    		title:'公司主要产品及品牌',
		    		itemId:'plproductDetails',
		    		layout:'absolute',
						overflowY: 'auto',
		    			overflowX:'auto',
						tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdproductDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccGoods',{"company_id":me.company_id});
								
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdproductDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
		    		
					items:[{
							xtype:'grid',
							//minHeight:100,
							itemId:'grdproductDetails',
							border:true,
							//anchor:'70%',
							x:2,
		    				y:2,
		    				width:800,
							multiSelect:true,
							selModel:Ext.create('Ext.selection.CheckboxModel'),
							columns:[
				    			{header:'序号',xtype:'rownumberer',width:60},
				    			{header:'<div style="text-align:center">产品名称</div>',dataIndex:'goods_name',editor:{allowblank:false},flex:1},
				    			{header:'<div style="text-align:center">产品品牌</div>',dataIndex:'goods_brand',editor:{},flex:1}
				    			],
				    		store:me.goodsStore,
				    		plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1,
							        listeners:{
									      beforeedit:function(editor,con,e){
									        	if(!me.isEdit){
									        		return false
									        	}
									      },
									      edit:function(editor,con,e){
									        	var field=con.field;
									        	var rec=con.record;
									      }
									 }
							    }
					}]
		    	},{
		    		title:'公司主要客户',
		    		itemId:'plcustomerDetails',
		    		layout:'absolute',
		    		overflowY: 'auto',
		    		overflowX:'auto',
		    		tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdcustomerDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccMainCustomer',{"company_id":me.company_id});
								
								//rowEditing.cancelEdit();
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdcustomerDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
					items:[{
							xtype:'grid',
							//minHeight:100,
							itemId:'grdcustomerDetails',
							border:true,
							//anchor:'70%',
							x:10,
		    			y:10,
		    			width:800,
							multiSelect:true,
							selModel:Ext.create('Ext.selection.CheckboxModel'),
							columns:[
				    			{header:'序号',xtype:'rownumberer',width:60},
				    			{header:'<div style="text-align:center">客户名称</div>',dataIndex:'customer_name',editor:{},flex:1}
				    			],
				    		store:me.maincustomerStore,
				    		plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1
							    }
					}]
		    	},{
		    		title:'公司主要竞争对手',
		    		itemId:'plcompeteDetails',
		    		layout:'absolute',
		    		overflowY: 'auto',
		    		overflowX:'auto',
		    		tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdCompeteDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccCompetitor',{"company_id":me.company_id});
								
								//rowEditing.cancelEdit();
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdCompeteDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						})
							}
						}],
					items:[{
							xtype:'grid',
							//minHeight:100,
							itemId:'grdCompeteDetails',
							border:true,
							//anchor:'70%',
							x:2,
		    			y:2,
		    			width:800,
							multiSelect:true,
							selModel:Ext.create('Ext.selection.CheckboxModel'),
							columns:[
				    			{header:'序号',xtype:'rownumberer',width:60},
				    			{header:'<div style="text-align:center">对手</div>',dataIndex:'competitor_name',editor:{},flex:1}
				    			],
				    		store:me.competitorStore,
				    		plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1,
							        listeners:{
									      beforeedit:function(editor,con,e){
									        	if(!me.isEdit){
									        		return false
									        	}
									      },
									      edit:function(editor,con,e){
									        	var field=con.field;
									        	var rec=con.record;
									      }
									 }
							    } 
					
					}]
		    	},{
		    		title:'银行账号',
		    		itemId:'plbankDetails',
		    		layout:'absolute',
		    		overflowY: 'auto',
		    		overflowX:'auto',
		    		tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdBankDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccBankAccount',{"company_id":me.company_id});
								
								store.insert(store.getCount(),r);
							}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdBankDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
		   						if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
					items:[{
						xtype:'grid',
						//minHeight:100,
						itemId:'grdBankDetails',
		    			border:true,
		    			//anchor:'70%',
		    			x:2,
		    			y:2,
		    			width:800,
						multiSelect:true,
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						columns:[
				    			{header:'序号',xtype:'rownumberer',width:60},
				    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',editor:{},flex:1},
				    			{header:'<div style="text-align:center">银行账号</div>',dataIndex:'account_code',editor:{},width:200},
				    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:50,
				    				renderer:function(value){
											if(value=="true"||value=="1"){//是否默认
												return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
											}else {
												return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
											}
				   	  	  			},
				   	  	  			field:{
				    					xtype:'checkbox'
				    				}
				    			}
				    			],
				    	plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1,
							        listeners:{
									      beforeedit:function(editor,con,e){
									        	if(!me.isEdit){
									        		return false
									        	}
									      },
									      edit:function(editor,con,e){
									        	var field=con.field;
									        	var rec=con.record;
									        	switch(field){
									        		case 'default_id':
									        		break;
									        	}
									      }
									 }
							        
							    },
				    	store:me.bankAccountStore
					}]
		    	},{
		    		title:'发票抬头',
		    		itemId:'plinvoiceDetails',
		    		layout:'absolute',
		    		overflowY: 'auto',
		    		overflowX:'auto',
		    		tbar:[{
							text:'添加',glyph:0xf055,itemId:'BTN_ADD',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdInvoiceDetails');
		   						var store=grid.getStore();
		   						
								var r = Ext.create('srm.supplierFile.model.AccInvoiceTitle',{"company_id":me.company_id});
								
								//rowEditing.cancelEdit();
								store.insert(store.getCount(),r);}
						},{
							text:'删除',glyph:0xf014,itemId:'BTN_DEL',
							hidden:!me.isEdit,
							handler:function(){
								var grid=me.down('#grdInvoiceDetails');
		   						var store=grid.getStore();
		   						var recs=grid.getSelectionModel().getSelection();
								if(recs.length==0){
		   							Ext.Msg.alert('提示','请至少选择一条记录！');
		   							return ;
		   						}
		   						 Ext.Msg.confirm('提示','你确定要删除所选记录吗?',function(btn){
								 	if(btn=='yes'){
										 store.remove(recs);
								 	}
		   						 })
							}
						}],
		    		items:[{
		    			xtype:'grid',
		    			//minHeight:100,
		    			itemId:'grdInvoiceDetails',
		    			border:true,
		    			//anchor:'70%',
		    			x:2,
		    			y:2,
		    			width:800,
						multiSelect:true,
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						columns:[
				    			{header:'序号',xtype:'rownumberer',width:60,align:'center'},
				    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',editor:{},flex:1},
				    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:50,
									renderer:function(value){
											if(value=="true"||value=="1"){
												return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
											}else {
												return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
											}
				   	  	  			},
				   	  	  			field:{
				    					xtype:'checkbox'
				    				}
				    			}
				    			],
				    	plugins: {
							        ptype: 'cellediting',
							        clicksToEdit: 1,
							        listeners:{
									      beforeedit:function(editor,con,e){
									        	if(!me.isEdit){
									        		return false
									        	}
									      },
									      edit:function(editor,con,e){
									        	var field=con.field;
									        	var rec=con.record;
									      }
									 }
							    },
				    	store:me.invoicestore
		    		}]
		    	}
				]	
		});
		this.callParent(arguments);
		},
		//加载业务数据
		loadbusData:function(rec)
		{
			var me=this;
			if(rec.get('supplier_id')>0){
				//发票抬头store
				me.invoicestore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				//主要设备明细
				me.devicelistStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				//公司产品主要用料表
				me.metarialStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				//公司主要客户maincustomerStore
				me.maincustomerStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				//公司主要竞争对手
				me.competitorStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				//公司银行账号
				me.bankAccountStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
				me.goodsStore.load({
					params:{
						supplier_id:rec.get('supplier_id')
					}
				});
			}
		},
		//保存业务信息中的company_id值
		SavebusData:function(rec)
		{
			var me=this;
			
			//发票抬头
			me.invoicestore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		//主要设备明细
//			me.devicelistStore.each(function(record){
//	  			record.set('company_id',rec.get('company_id'));
//	  			
//	  		});
	  		var deviceRecords=me.devicelistStore.getRange();
	  		for(var i=0;i<deviceRecords.length;i++)
	  		{
	  			
	  			deviceRecords[i].set('company_id',rec.get('company_id'));
	  			deviceRecords[i].set('supplier_id',rec.get('supplier_id'));
	  			deviceRecords[i].set('isSync',rec.get('isSync'));
	  		}
	  		
	  		//公司产品主要用料表
			me.metarialStore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		//公司主要客户
			me.maincustomerStore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		me.bankAccountStore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		//公司主要竞争对手competitorStore
	  		me.competitorStore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		me.goodsStore.each(function(record){
	  			record.set('company_id',rec.get('company_id'));
	  			record.set('supplier_id',rec.get('supplier_id'));
	  			record.set('isSync',rec.get('isSync'));
	  		});
	  		me.company_id=rec.get('company_id');
		}
});
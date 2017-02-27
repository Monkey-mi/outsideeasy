//供应商业务信息页面
Ext.define('srm.supplierManager.view.SupplierBusInfo',{
	extend:'Ext.tab.Panel',
	requires:['srm.basicdata.materialClass.store.MaterialClassTreeChk',
			'srm.supplierManager.store.MaterialClass',
			'Ext.ux.TreePicker'],
	alias:'widget.SupplierBusInfo',
	//company_id:-1,
	overflowY: 'auto',
	//height:300,
	initComponent:function(){
		//Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
		var  me=this;
//		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//			clicksToMoveEditor: 1,
//			autoCancel: false,
//			pluginId: 'rowedit',
//			listeners: {
//				edit: function(editor, obj, eopts) {
//					me.fireEvent('rowedit', editor);
//				}
//			}
//			
//		});
		
		//发票抬头store
		me.invoicestore=Ext.create('srm.supplierManager.store.AppInvoiceTitle');
		//主要设备明细store
		me.devicelistStore=Ext.create('srm.supplierManager.store.AppDevicelist');
		//公司产品主要用料表
		me.metarialStore=Ext.create('srm.supplierManager.store.AppMetarial');
		//公司主要客户
		me.maincustomerStore=Ext.create('srm.supplierManager.store.AppMainCustomer');
		//公司主要竞争对手
		me.competitorStore=Ext.create('srm.supplierManager.store.AppCompetitor');
		//公司银行账号
		me.bankAccountStore=Ext.create('srm.supplierManager.store.AppBankAccount');
		//公司产品
		me.goodsStore=Ext.create('srm.supplierManager.store.AppGoods');
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
    		//minHeight:150,
    		tbar:[{
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdEquipmentDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppDevicelist',{"company_id":me.company_id});
						
						//rowEditing.cancelEdit();
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdEquipmentDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
					}
				}],
    		items:[
    		{
    			xtype:'grid',
    			//minHeight:100,
    			border:true,
    			itemId:'grdEquipmentDetails',
    			//anchor:'70%',
    			x:2,
    			y:2,
    			width:800,
    			multiSelect:true,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
    			columns:[
    			{header:'序号',xtype:'rownumberer',width:40},
    			{header:'<div style="text-align:center"><span style="color:red;">*</span>设备名称</div>',dataIndex:'device_name',editor:{xtype:'textfield',allowblank:false},flex:1},
    			{header:'<div style="text-align:center">设备规格</div>',dataIndex:'specifications',editor:{xtype:'textfield'},width:150},
    			{header:'<div style="text-align:center">设备产地</div>',dataIndex:'place',editor:{xtype:'textfield'},flex:1,maxLength:150},
    			{header:'设备价值(万元)',dataIndex:'price',align:'right',editor:{xtype:'textfield'},width:100,maxLength:150},
    			{header:'<div style="text-align:center">设备购买日期</div>',dataIndex:'buy_day',width:120,xtype:'datecolumn',format:'Y-m-d',
    				renderer:function(value){
						if(value!=null){
							return Ext.Date.format(value, 'Y-m-d');  
						}},field:{
							xtype:'datefield',
							maxValue:new Date()
						},
						align:'center'
//						,
//						allowBlank:false,
//	   	  	  			blankText:'请选择购买日期'
	   	  	  	},
	   	  	  	{header:'设备数量',dataIndex:'device_num',editor:{xtype:'numberfield',minValue: 0},align:'center',width:80},
    			{header:'<div style="text-align:center">设备先进性</div>',dataIndex:'advanced',editor:{xtype:'textfield'},width:150,maxLength:150}
    			],
    			plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1   
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
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdMaterialsDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppMetarial',{"company_id":me.company_id});
						
						
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdMaterialsDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'material_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">材料品牌</div>',dataIndex:'material_brand',editor:{},flex:1}
		    			],
		    		store:me.metarialStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    }
				}]
				
    	},{
    		title:'公司主要产品及品牌',
    		itemId:'plproductDetails',
    		layout:'absolute',
				overflowY: 'auto',
    			overflowX:'auto',
				tbar:[{
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdproductDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppGoods',{"company_id":me.company_id});
						
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdproductDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">产品名称</div>',dataIndex:'goods_name',editor:{allowblank:false},flex:1},
		    			{header:'<div style="text-align:center">产品品牌</div>',dataIndex:'goods_brand',editor:{},flex:1},
		    			{header:'<div style="text-align:center">类别</div>',dataIndex:'mc_id',width:150,
		    				editor:{
		    					xtype : 'treepicker',    
							    displayField : 'text',
							    valueField: 'id',
							    store:me.treepickerStore,
							    rootVisible:false,
							    maxPickerWidth:240,
							    listeners:{
							'select':function(picker,record,eOpts)
							{
								if(!record.get('leaf'))
								{
									
									Ext.Msg.alert('提示','请选择最后一级类别！');
									picker.setValue('');
									
									return;
								}
							}
						}
		    				}
		    				,
		    				renderer:function(value, metaData, record, rowIndex, colIndex, store){
		    					var return_value='';
								me.materialClassStore.load();
								var rec=me.materialClassStore.findRecord('mc_id',value);
								if(!Ext.isEmpty(rec))
								{
									return_value=rec.get('mc_name');
								}
								return return_value;
		   	  	  			}
		    			}
		    			],
		    		store:me.goodsStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    }
			}]
    	},{
    		title:'公司主要客户',
    		itemId:'plcustomerDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
    		tbar:[{
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdcustomerDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppMainCustomer',{"company_id":me.company_id});
						
						//rowEditing.cancelEdit();
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdcustomerDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
		    			{header:'序号',xtype:'rownumberer',width:40},
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
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdCompeteDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppCompetitor',{"company_id":me.company_id});
						
						//rowEditing.cancelEdit();
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdCompeteDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">对手</div>',dataIndex:'competitor_name',editor:{},flex:1}
		    			],
		    		store:me.competitorStore,
		    		plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					    } 
			
			}]
    	},{
    		title:'银行账号',
    		itemId:'plbankDetails',
    		layout:'absolute',
    		overflowY: 'auto',
    		overflowX:'auto',
    		tbar:[{
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdBankDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppBankAccount',{"company_id":me.company_id});
						
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdBankDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
				//selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[
		    			{header:'序号',xtype:'rownumberer',width:40},
		    			{header:'<div style="text-align:center">开户银行</div>',dataIndex:'account_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">银行账号</div>',dataIndex:'account_code',editor:{},width:200},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype: 'checkcolumn',stopSelection: false,
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
					        clicksToEdit: 1
					        
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
					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD,
					handler:function(){
						var grid=me.down('#grdInvoiceDetails');
   						var store=grid.getStore();
   						
						var r = Ext.create('srm.supplierManager.model.AppInvoiceTitle',{"company_id":me.company_id});
						
						//rowEditing.cancelEdit();
						store.insert(store.getCount(),r);}
				},{
					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL,
					handler:function(){
						var grid=me.down('#grdInvoiceDetails');
   						var store=grid.getStore();
   						var recs=grid.getSelectionModel().getSelection();
						store.remove(recs);
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
		    			{header:'序号',xtype:'rownumberer',width:40,align:'center'},
		    			{header:'<div style="text-align:center">发票抬头名称</div>',dataIndex:'invoice_title_name',editor:{},flex:1},
		    			{header:'<div style="text-align:center">默认</div>',dataIndex:'default_id',width:40,xtype:'checkcolumn',
							renderer:function(value){
									if(value=="true"||value=="1"){
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
									}else {
										return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
									}
		   	  	  			}
		    			}
		    			],
		    	plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1
					        
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
			
			me.company_id=-1;
			if(rec.get('company_id')>0)
			{
				me.company_id=rec.get('company_id');
				//发票抬头store
			me.invoicestore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//主要设备明细
			me.devicelistStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司产品主要用料表
			me.metarialStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司主要客户maincustomerStore
			me.maincustomerStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司主要竞争对手
			me.competitorStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			me.goodsStore.load({
				params:{
					company_id:rec.get('company_id')
				}
			});
			}
			else
			{
			me.invoicestore.load({
				params:{
					company_id:0
				}
			});
			//主要设备明细
			me.devicelistStore.load({
				params:{
					company_id:0
				}
			});
			//公司产品主要用料表
			me.metarialStore.load({
				params:{
					company_id:0
				}
			});
			//公司主要客户maincustomerStore
			me.maincustomerStore.load({
				params:{
					company_id:0
				}
			});
			//公司主要竞争对手
			me.competitorStore.load({
				params:{
					company_id:0
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:0
				}
			});
			me.goodsStore.load({
				params:{
					company_id:0
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
  	
  		});
  		//主要设备明细
//		me.devicelistStore.each(function(record){
//  			record.set('company_id',rec.get('company_id'));
//  			
//  		});
  		var deviceRecords=me.devicelistStore.getRange();
  		for(var i=0;i<deviceRecords.length;i++)
  		{
  			
  			deviceRecords[i].set('company_id',rec.get('company_id'));
  			
  		}
  		
  		//公司产品主要用料表
		me.metarialStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  			
  		});
  		//公司主要客户
		me.maincustomerStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  			
  		});
  		me.bankAccountStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  		});
  		//公司主要竞争对手competitorStore
  		me.competitorStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  		});
  		me.goodsStore.each(function(record){
  			record.set('company_id',rec.get('company_id'));
  		});
  		me.company_id=rec.get('company_id');
	}
		});
/*供应商基本信息控制页*/
Ext.define('srm.supplierManager.controller.Supplier',{
	extend:'Ext.app.Controller',
	requires:['srm.supplierManager.store.SupplierFile',
			  'srm.supplierManager.store.ArchiveSupplierFile',
			  'srm.ux.PagingBar',
			  'srm.supplierManager.store.AppInvoiceTitle',
			  'srm.supplierManager.store.AppDevicelist',
			  'srm.supplierManager.store.AppMetarial',
			  'srm.supplierManager.store.AppCompetitor',
			  'srm.supplierManager.store.AppBankAccount',
			  'srm.supplierManager.store.AppGoods',
			  'srm.supplierManager.store.AppRegisterAttched',
			  'srm.supplierManager.store.AppCustomAttched',
			  'srm.supplierManager.store.AppMainCustomer',
			  'srm.supplierManager.store.AccessScoreSummary',
			  'srm.supplierManager.store.SupplierAccessScoreDetails',
			  'srm.materialConfirmation.store.MaterialCheckclass',
			  'srm.materialConfirmation.store.MaterialCheckDetail',
			  'srm.materialConfirmation.store.MaterialConfirmation',
			  'srm.materialConfirmation.store.MaterialSample',
			  'srm.supplierManager.store.SupplierMaterialSub1'
	],
	views:[
	    'srm.supplierManager.view.SupplierManager'
	 	,'srm.supplierManager.view.WestTab'
	    ,'srm.supplierManager.view.SupplierBaseInfo'
	    ,'srm.supplierManager.view.SupplierMainInfo'
	    ,'srm.supplierManager.view.SupplierFileInfo'	  
		,'srm.supplierManager.view.PurchasingInquiryList'
		,'srm.supplierManager.view.accessToEvaluate.EvaluateMain'
		,'srm.supplierManager.view.materialConfirm.SupplierMaterialConfirm'
		,'srm.supplierManager.view.SupplierQuery'
	   ],
	refs : [{ref:'mng_panelSupplier',selector : 'SupplierManager'},//管理页面
			{ref:'mng_SupplierTab',selector:'SupplierManager #supplier_tab'},//供应商列表Tab
			{ref:'mng_Suppliergrid',selector:'SupplierManager #grd_Supplier'},//管理页面的供应商列表
			{ref:'mng_ArchivesSuppliergrid',selector:'SupplierManager #grd_ArchiveSupplier'},//归档列表
			{ref:'mng_SupplierPanel',selector:'SupplierManager #plSupplier'},//管理页面的供应商
			{ref:'panelMainInfo',selector:'SupplierMainInfo'},
			{ref:'panel_BaseInfo',selector:'SupplierMainInfo #supplierBaseInfo'},
			{ref:'baseInfo_form',selector:'SupplierBaseInfo #PanelBaseInfo'},//基本信息form
			{ref:'busform_Tab',selector:'SupplierBaseInfo #supplierBusInfo'},//基本信息下界面的业务信息Tab页面
			{ref:'panel_Attched',selector:'SupplierMainInfo #supplierFileInfo'},
			{ref:'panel_materialConfirm',selector:'panel_materialConfirmInfo'},//物料确认Tab信息页面
			{ref:'panel_materalSample',selector:'panel_materialConfirmInfo #materialSample'}
			],
			
	init:function(){
	
		// controller只初始化一次
		var me = this;
		//该函数将最先执行，甚至先于 appliction.launch
		if (me.isInited)
			return;
		//处理所有view上面的交互
		me.control({
			//供应商档案列表Grid初始化
			'SupplierManager':{
				afterrender:function(cmp){
					var panel=me.getMng_panelSupplier();
					me.mainpanel=panel;
					var store=me.getMng_Suppliergrid().getStore();
					var grid=me.getMng_Suppliergrid();
					me.grdStore=store;

					//归档供应商列表
					me.grdArchiveStore=me.getMng_ArchivesSuppliergrid().getStore();
					var supplierTab=me.getMng_SupplierTab();
					var activeTab=supplierTab.getActiveTab();
					me.supplierTab=0;
					if(activeTab.itemId=='grd_Supplier')
 	 				{
 	 				//当前tab是当前供应商列表
 	 					me.grdStore.proxy.extraParams.usePaging=true;
						me.grdStore.proxy.extraParams.is_delete=0;
						me.grdStore.proxy.extraParams.is_archive=0;
						me.grdStore.load();
						panel.down('#btn_Archive').setText('归档');
 	 				}
 	 				else if(activeTab.itemId=='grd_ArchiveSupplier')
 	 				{
 	 					me.supplierTab=1;
 	 					//当前tab为归档供应商列表
 	 					me.grdArchiveStore.proxy.extraParams.usePaging=true;
 	 					me.grdArchiveStore.proxy.extraParams.is_delete=0;
						me.grdArchiveStore.proxy.extraParams.is_archive=1;
						me.grdArchiveStore.load();
						panel.down('#btn_Archive').setText('取消归档');
 	 				}
 	 				
					//功能权限设置
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdStore.proxy.extraParams.history=0;
					//todo:删除检索条件变量的值
					delete me.grdStore.proxy.extraParams.condition;
					delete me.grdStore.proxy.extraParams.is_delete;
					delete me.grdStore.proxy.extraParams.is_archive;
					//归档供应商
					me.grdArchiveStore.proxy.extraParams.history=0;
					delete me.grdArchiveStore.proxy.extraParams.condition;
					delete me.grdArchiveStore.proxy.extraParams.is_delete;
					delete me.grdArchiveStore.proxy.extraParams.is_archive;
				}
			},
			//编辑新增页面加载、关闭事件
			'SupplierMainInfo':{
				afterrender:function(cmp){
					//新增/修改页面打开时，管理页面禁用
					//me.getMng_panelSupplier().disable();
					
				},
				beforeclose:function(th){
//					var panel=me.getMng_panelSupplier();
//					panel.down('#search').setValue('');
//					delete me.grdStore.proxy.extraParams.condition;
					var grid=me.getMng_Suppliergrid();
					
					var panelBaseInfo=th.down('#supplierBaseInfo');
					if(panelBaseInfo!=null)
					{
					var rec=th.down('#supplierBaseInfo').down('#PanelBaseInfo').getRecord();
					if(rec!=null)
					{
						me.grdStore.reload();
						grid.getSelectionModel().select(me.grdStore.find('company_id',rec.get('company_id')));
					}
					}
				}
				
				
			},
			//新增编辑页面提交按钮事件
			'SupplierBaseInfo #PanelBaseInfo button':{
				
				click:me.btnEditformAction
			},
			//附件保存按钮事件
			'SupplierFileInfo button':{
				click:me.saveFileUpload
			},
			
			//供应商档案管理界面的按钮事件，如新增、修改、删除
			'SupplierManager #plSupplier button':{
				click:me.doAction
			},
			'SupplierManager #grd_Supplier':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						me.setBtnStatus1(false);
						me.setBtnText(rec[0].get('apply_sts'));
						//选择某条记录时加载其相关联的业务信息和附件信息，用作删除操作时获取数据
//						var panel=me.getMng_panelSupplier();
//						panel.loadSingleData(rec[0]);
					}
					//列表记录为空
					else
					{
						me.setBtnStatus1(true);
						
					}
				},
				itemdblclick : function(grid, rec) {
							me.EditSupplierInfo(srm.def.Const.FUNC_ITEMID_BTN_EDT);
						}
			},
			'SupplierManager #supplier_tab tab':{
				click:function(button,e,eOpts){

					var panel=me.getMng_panelSupplier();
					if(button.title=='当前供应商')
					{
						me.supplierTab=0;
						me.grdStore.proxy.extraParams.usePaging=true;
						me.grdStore.proxy.extraParams.is_delete=0;
						me.grdStore.proxy.extraParams.is_archive=0;
						me.grdStore.load();
						panel.down('#btn_Archive').setText('归档');
					}
					else if(button.title=='归档供应商')
					{
						me.supplierTab=1;
 	 					//当前tab为归档供应商列表
 	 					me.grdArchiveStore.proxy.extraParams.usePaging=true;
 	 					me.grdArchiveStore.proxy.extraParams.is_delete=0;
						me.grdArchiveStore.proxy.extraParams.is_archive=1;
						me.grdArchiveStore.load();
						panel.down('#btn_Archive').setText('取消归档');
						me.setBtnStatus2(false);
					}
				}
			}
			,
			//归档列表
			'SupplierManager #grd_ArchiveSupplier':{
				selectionchange:function(grid, rec){
					if(rec.length>0)
					{
						me.setBtnStatus2(false);
					}
					else
					{
						me.setBtnStatus2(true);
					}
				}
			},
			//物料确认列表选择事件
			'panel_materialConfirmInfo #grd_materialConfirm':{
				selectionchange:function(grid, rec){
					//列表有数据
					if(rec.length > 0)
					{
						var mateConfirmlPanel=me.getPanel_materialConfirm();
					
						mateConfirmlPanel.loadCheckDetailsByConfirmId(rec[0].get('confirmation_id'));
					}
				}
			}
			,'panel_materialConfirmInfo #materialSample #sampleGrid':{
			selectionchange:function(grid, rec){
					var samplePanel=me.getPanel_materalSample();
					if(rec.length>0)
					{
						
						//加载检测明细
						samplePanel.checkDetailStore.load({
						params:{sample_id:rec[0].get('sample_id')},
						callback:function(records){
						
							}});
						
					}
				}
			}
			,
			//查询框回车事件
			'SupplierManager #plSupplier #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mng_WestTab #levelclass' : {
						select : function(rowModel, rec) {
							
							var panel = me.getMng_panelSupplier();
							panel.loadGridByTreeNodeId(rec,1);
						}
					},
			'mng_WestTab #materialclass' : {
						select : function(rowModel, rec) {
							//叶节点
							if(rec.get('leaf')==true)
							{
								var panel = me.getMng_panelSupplier();
								panel.loadGridByTreeNodeId(rec,2);
							}
						}
					}
			
		});
		// controller初始化完成
		this.isInited = true;
		},
	/*主面板按钮响应*/
	doAction : function(btn) {
		var me=this;
		switch (btn.itemId) {
			//管理页面的新增、修改按钮事件
			case srm.def.Const.FUNC_ITEMID_BTN_ADD:
			case srm.def.Const.FUNC_ITEMID_BTN_EDT:
				this.EditSupplierInfo(btn.itemId);
				break;
			case srm.def.Const.FUNC_ITEMID_BTN_DEL:
				this.doDeleteSupplier();
				break;
			case 'btn_search':
				this.doQuery();
				break;
			//修改供应商状态
			case 'btn_Accept':
			case 'btn_AuditPass':
			case 'btn_AuditUnPass':
				this.doSupplierStatus(btn);
			case 'btn_Archive':
				this.doArchive(btn);
				break;
			case 'btn_reflash':
				this.doReflash();
				break;
			case 'btn_queryMore':
				var win=Ext.widget('supplierMoreQuery',{
					itemId:'supplierMoreQuery',
					mainstore:me.grdStore,
					mainview:me.mainpanel,
					rec:Ext.create('srm.supplierManager.model.supplierQueryParam')
				});
				win.show();
				break;
		}
	},
	/*修改、新增供应商按钮事件*/
	EditSupplierInfo:function(itemId)
	{
		var me=this; 
		var rec,isAdd,isEdit;
		var grid=me.getMng_Suppliergrid();
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case srm.def.Const.FUNC_ITEMID_BTN_ADD://新增按钮
				
				
				var today=Ext.Date.format(new Date(),'Y-m-d H:i:s');
				rec=Ext.create('srm.supplierManager.model.SupplierFile',{
				 	//申请状态,5:外部是已提交未审核，作为内部新增的状态
				 	apply_sts:5,
				 	create_dt:today,
				 	version:0,
				 	//行业类目编号
				 	class_id:0,
				 	//企业性质编号
				 	nature_id:0
				 	
				 	
				 });
				isAdd=true;
				isEdit=true;
				break;
			case srm.def.Const.FUNC_ITEMID_BTN_EDT:
				rec=grid.getSelectionModel().getSelection()[0];
				isAdd=false;
				isEdit=true;
				break;
		}
		var opentitle='新增供应商';
		var openglyph=0xf234;
		if(!isAdd)
		{
			opentitle='修改供应商';
			openglyph=0xf0f0;
		}
		
		var win=Ext.widget('SupplierMainInfo',{
			//新增、修改页面
			itemId:'supplierMainInfo',
			title:opentitle,
			glyph:openglyph,
			supplierRec:rec,
			isAdd:isAdd,
			isEdit:isEdit,
			store:grid.getStore(),
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
		});
		win.show();
	},
	
	

	/*供应商提交、修改保存表单*/
	btnEditformAction:function(btn){
		
		var me=this;
		var mainPanel=me.getPanelMainInfo();
		var formpanel=me.getPanel_BaseInfo();
		var isAdd=mainPanel.isAdd;
		var isEdit=mainPanel.isEdit;
		//基本信息form
		var form=me.getBaseInfo_form();
		//获取界面数据
		var rec=form.getRecord();
		
		//业务信息Tab页面
		var buspanel=me.getBusform_Tab();
		//附件
		var registerAttchedPanl=me.getPanel_Attched();
		
		switch(btn.itemId){
			case 'BTN_SAVE':
			
			if(form.getForm().isValid()&&form.getForm().isDirty())
			{
				//厂商类别是否选到最末级
				if(!formpanel.isLastMaterialClass)
			 	{
			 		Ext.Msg.alert('提示','厂商类别请选到最末级！');
					return;
			 	}
			 	
				
			 Ext.Msg.confirm('提示','你确定要保存供应商基本信息及业务信息吗?',function(btn){
			 	if(btn=='yes')
			 	{
			 		
			 		
			 		//更新数据到数据库
					form.updateRecord(rec);	
					if(isAdd)
					{

						var count=srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=getCountByName',{
							cpyname_cn:rec.get('cpyname_cn').trim()
			 			});
			 			
			 			if(count>0)
			 			{
			 			Ext.Msg.alert('提示','当前名称的供应商已存在，不能重名！');
							return;
			 			}
					}
			 		var is_chinese=rec.get('is_chinese');
			 		//如果是国外供应商，则把注册地址联系地址的地区基础数据设置为空
			 		if(is_chinese!=0)
			 		{
			 			rec.set('reg_addr_code',null);
			 			rec.set('contact_addr_code',null);
			 			
			 		}
			 		var reg_fund=rec.get('reg_fund');
			 		if(reg_fund<=0)
			 		{
			 			Ext.Msg.alert('提示','注册资金不为空且大于零！');
						return;
			 		}
			 		
			 		//前端业务信息数据判断
			 		//银行账号默认值只能设置一个
			 		var bankaccountRecs=buspanel.bankAccountStore.getRange();
			 		var bankDefaultCount=0;
			 		for(var i=0;i<bankaccountRecs.length;i++)
			 		{
			 			var current= bankaccountRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							bankDefaultCount++;
						}
						
			 		}
			 		
					if(bankDefaultCount>1)
					{
						Ext.Msg.alert('提示','银行账号的默认只有一个，请重新设置！');
						return;
					}
					//发票抬头的默认只能设置一个
			 		var invoiceRecs=buspanel.invoicestore.getRange();
			 		var invoiceDefaultCount=0;
			 		for(var i=0;i<invoiceRecs.length;i++)
			 		{
			 			var current= invoiceRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							invoiceDefaultCount++;
						}
						
			 		}
					if(invoiceDefaultCount>1)
					{
						Ext.Msg.alert('提示','发票抬头的默认只有一个，请重新设置！');
						return;
					}
					//设置操作人和操作时间
					rec.set('operator',srm.UInfo.currentUser.name);
					rec.set('operater_dt',new Date());
					//厂商类别改成三级联动，最后一级可多选
					var materialClass_1=formpanel.down('#materialClass_1');
					var materialClass_2=formpanel.down('#materialClass_2');
			 		var materialClass_3=formpanel.down('#materialClass_3');
			 		
					var mc_id_2_str='';
			 		//第三级可为空
			 		var mc_id_3_str='';
			 		//先清空第二级、第三级存放的store表
			 		formpanel.supplierMaterialSub1Store.removeAll();
			 		
			 		
			 		//第三级下拉不为空,取第三级
					if(!Ext.isEmpty(materialClass_3.value)&&materialClass_3.value.length>0)
					{
			 			mc_id_3_str=materialClass_3.value[0];
			 			for(var i=0;i<materialClass_3.value.length;i++)
			 			{
			 				if(i>0)
			 				{
			 					mc_id_3_str+=','+materialClass_3.value[i];
				 			}
				 			var s_m_model=Ext.create('srm.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_3.value[i],
				 				create_dt:new Date()
				 			});
				 			//将界面上的第三级下拉列表框中选择的选项逐个添加到supplierMaterialInfoStore中
				 			formpanel.supplierMaterialSub1Store.add(s_m_model);
			 			}
			 			
					}
					//取第二级作为最末级材料类别存入关联表中
					else
					{
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					var s_m_model1=Ext.create('srm.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_2.value[i],
				 				create_dt:new Date()
				 				});
				 				formpanel.supplierMaterialSub1Store.add(s_m_model1);
			 				}
			 			}
					}
					if(mc_id_2_str=='')
					{
						//保存第二级id
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					
			 				}
			 			}
					}
			 		rec.set('mc_id_1',materialClass_1.value);
			 		rec.set('mc_name_1',materialClass_1.rawValue);
			 		rec.set('mc_id_2',mc_id_2_str);
			 		rec.set('mc_name_2',materialClass_2.rawValue);
			 		rec.set('mc_id_3',mc_id_3_str);
			 		rec.set('mc_name_3',materialClass_3.rawValue);
					
					var reg_fund=rec.get('reg_fund');
			 		
			 		//新增保存
					
					if(isAdd)
					{
						
						//将新增的记录添加到store
						formpanel.store.add(rec);
						//me.grdStore.add(rec);
						formpanel.store.sync({
							success:function(e,batch){
								
								var newSupplier=batch.operations.create[0];
								
								if(newSupplier!=null)
								{
									
									//重新加载新增的供应商信息，包括后台生成的Company_id等后台生成字段信息
									form.loadRecord(newSupplier);
									
									var array_2=[];
									array_2=newSupplier.get('mc_id_2').split(',');
									formpanel.down('#materialClass_2').setValue(array_2);
									
									var array_3=[];
									array_3=newSupplier.get('mc_id_3').split(',');
									formpanel.down('#materialClass_3').setValue(array_3);
									
									registerAttchedPanl.company_id=newSupplier.get('company_id');
									registerAttchedPanl.SaveAttchedData(newSupplier);
									//将新增的供应商Id赋值给供应商材料类别第三级下拉列表store中
									formpanel.setCIdToSupplierMaterial(newSupplier);
									//业务信息company_id设置
									buspanel.SavebusData(newSupplier);
									
									//业务信息保存数据
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
								}
								//todo:业务信息的保存
								Ext.Msg.alert('提示','新增成功！');
//								me.grdStore.reload();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
						});
						mainPanel.isAdd=false;
						formpanel.isEdit=true;
						return;
					}
					//修改保存
					else
					{
						
						formpanel.store.sync({
							success:function(e,batch){
								
								var updateSupplier=batch.operations.update[0];
								
								formpanel.setCIdToSupplierMaterial(updateSupplier);
								formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
//								form.loadRecord(newSupplier);
//								me.grdStore.reload();
			 					//Ext.Msg.alert('提示','修改成功！');
							},
							failure : function(batch, options) {
								
								Ext.Msg.alert('提示', '保存失败!');
								return;
							}
						});
						
					
					//业务信息保存数据
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						Ext.Msg.alert('提示','修改成功！');
					}
			 	}
			 	var panel=me.getMng_panelSupplier();
				panel.down('#search').setValue('');
				delete me.grdStore.proxy.extraParams.condition;
			 });
			}
		break;
		}
	}
	
	,/* 修改按钮状态*/
	setBtnStatus1 : function(sts) {
		var me = this;
		var panel = me.getMng_SupplierPanel();
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
		//受理
		panel.down('#btn_Accept').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
		//归档
		panel.down('#btn_Archive').setDisabled(sts);
	},
	/*归档列表为当前列表时的按钮状态修改*/
	setBtnStatus2:function(sts)
	{
		var me = this;
		var panel = me.getMng_SupplierPanel();
		panel.down('#BTN_ADD').setDisabled(true);
		panel.down('#BTN_EDT').setDisabled(true);
		panel.down('#BTN_DEL').setDisabled(true);
		//受理
		panel.down('#btn_Accept').setDisabled(true);
		panel.down('#btn_AuditPass').setDisabled(true);
		panel.down('#btn_AuditUnPass').setDisabled(true);
		//取消归档
		panel.down('#btn_Archive').setDisabled(sts);
	}
	,
	/*供应商状态变化操作按钮导致的状态变化，如受理、审核通过、不合格*/
	setBtnText:function(apply_sts)
	{
		var me = this;
		var panel = me.getMng_SupplierPanel();
		if(apply_sts>=5&&apply_sts<10)
		{
//			panel.down('#btn_Accept').setDisabled(false);
//			panel.down('#btn_AuditPass').setDisabled(true);
//			panel.down('#btn_AuditUnPass').setDisabled(true);
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('不合格');
			panel.down('#btn_AuditPass').setDisabled(true);
			panel.down('#btn_AuditUnPass').setDisabled(true);
			panel.down('#btn_Archive').setDisabled(true);
		}
		else if(apply_sts>=10&&apply_sts<15)
		{
			panel.down('#btn_Accept').setText('取消受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('不合格');
		}
		else if(apply_sts=15)
		{
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('取消审核');
			panel.down('#btn_AuditUnPass').setText('不合格');
			panel.down('#btn_Accept').setDisabled(true);
			panel.down('#btn_AuditUnPass').setDisabled(true);
		}
		else if(apply_sts=20)
		{
			panel.down('#btn_Accept').setText('受理');
			panel.down('#btn_AuditPass').setText('审核通过');
			panel.down('#btn_AuditUnPass').setText('取消审核');
			panel.down('#btn_Accept').setDisabled(true);
			panel.down('#btn_AuditPass').setDisabled(true);
		}
	}
	
	,
	/*保存附件store到数据库*/
	saveFileUpload:function(btn){
		var me=this;
		
		var attchedPanel=me.getPanel_Attched();
		
		switch(btn.itemId){
			case 'BTN_SAVE':
			
				Ext.Msg.confirm('提示','你确定要保存上传的附件吗?',function(btn){
			 	if(btn=='yes')
			 	{
//					var recs=attchedPanel.registerAttchedStore.getRange();
//					var company_id=recs[0].get('company_id');

			 		var company_id=attchedPanel.company_id;
					
			 		attchedPanel.registerAttchedStore.sync({
			 			success:function(){
			 				
			 				attchedPanel.registerAttchedStore.load({params:{company_id:company_id,iscustom:0}});
			 				//放里面，防止attchedstore新增没完成时customAttchedStore获取到的ID值不是最大值而导致插入失败
//			 				attchedPanel.customAttchedStore.sync({
//			 					success:function(){
//			 						attchedPanel.customAttchedStore.load({params:{company_id:company_id,iscustom:1}});
//			 						
//			 					},
//			 					failure : function(batch, options) {
//											Ext.Msg.alert('提示', '保存失败!');
//											return;
//										}
//			 					});
			 				
			 			},
			 			failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
			 		});
			 		attchedPanel.customAttchedStore.sync({
			 					success:function(){
			 						attchedPanel.customAttchedStore.load({params:{company_id:company_id,iscustom:1}});
			 						
			 					},
			 					failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
			 					});
			 		//删除附件文件
			 		attchedPanel.deleteUploadFile();
			 		Ext.Msg.alert('提示','保存成功！');
			 		return;
			 	}
			 	});
			
			break;
		}
	}
	,
	/*修改供应商状态按钮操作*/
	doSupplierStatus:function(btn)
	{
		var me=this;
		//mng_Suppliergrid
		var grid=me.getMng_Suppliergrid();
		var store=grid.getStore();
		//获取当前选择项，可多选
		var recs=grid.getSelectionModel().getSelection();
		var apply_sts=0;
		var panel = me.getMng_SupplierPanel();
		switch(btn.itemId)
		{
			//受理
			case 'btn_Accept':
				
				if(btn.getText()=='受理')
				{
					btn.setText('取消受理');
					apply_sts=10;
					panel.down('#btn_AuditPass').setDisabled(false);
					panel.down('#btn_AuditUnPass').setDisabled(false);
					panel.down('#btn_Archive').setDisabled(false);
				}
				else
				{
					apply_sts=5;
					btn.setText('受理');
					panel.down('#btn_AuditPass').setDisabled(true);
					panel.down('#btn_AuditUnPass').setDisabled(true);
					panel.down('#btn_Archive').setDisabled(true);
					
				}
				break;
			case 'btn_AuditPass':
				if(btn.getText()=='审核通过')
				{
					btn.setText('取消审核');
					apply_sts=15;
					panel.down('#btn_AuditUnPass').setDisabled(true);
					panel.down('#btn_Accept').setDisabled(true);
				}
				else
				{
					apply_sts=10;
					btn.setText('审核通过');
					panel.down('#btn_AuditUnPass').setDisabled(false);
					panel.down('#btn_Accept').setDisabled(false);
				}
				
				break;
			case 'btn_AuditUnPass':
				if(btn.getText()=='不合格')
				{
					btn.setText('取消审核');
					apply_sts=20;
					panel.down('#btn_AuditPass').setDisabled(true);
					panel.down('#btn_Accept').setDisabled(true);
				}
				else
				{
					apply_sts=10;
					btn.setText('不合格');
					panel.down('#btn_AuditPass').setDisabled(false);
					panel.down('#btn_Accept').setDisabled(false);
				}
				break;	
		}
		if(apply_sts!=0)
		{
		//将供应商当前的状态apply_sts设置成10，表示受理完成，当前状态为审核中
		for(var i=0;i<recs.length;i++){
			recs[i].set('apply_sts',apply_sts);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',srm.UInfo.currentUser.name);
			recs[i].set('auditor',srm.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
			}
		store.sync({
			 		success:function(){
			 			
			 				//Ext.Msg.alert('提示','操作成功！');
			 			},
			 		failure : function(batch, options) {
							Ext.Msg.alert('提示', '操作失败!');
						}
			 		});
		}
	}
	,doReflash:function(){
		var me=this;
		var panel=me.getMng_panelSupplier();
		delete panel.store.proxy.extraParams.condition;
		panel.store.loadPage(1);
	}
	
	/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getMng_panelSupplier();
		var condition=panel.down('#search').getValue();
		var apply_stsSearch=panel.down('#applysts_search').getValue();
		var materialClass_1_search=panel.down('#materialClass_1_search').getValue();
		var materialClass_2_search=panel.down('#materialClass_2_search').getValue();
		var materialClass_3_search=panel.down('#materialClass_3_search').getValue();

		//当前供应商
		if(me.supplierTab==0)
		{
		//panel.store.proxy.extraParams.condition=condition;
		Ext.apply(panel.store.proxy.extraParams,{
			usePaging:true,condition:condition,apply_sts:apply_stsSearch,mc_id_1:materialClass_1_search,mc_id_2:materialClass_2_search,mc_id_3:materialClass_3_search});
		panel.store.loadPage(1);
		}
		//归档供应商
		else if(me.supplierTab==1)
		{
		//Archivestore
			
			//Ext.apply(panel.Archivestore.extraParams,{usePaging:true,condition:condition,apply_sts:apply_stsSearch});
			//panel.Archivestore.loadPage(1);
			me.grdArchiveStore.proxy.extraParams.condition=condition;
			me.grdArchiveStore.proxy.apply_sts=apply_stsSearch;
			me.grdArchiveStore.loadPage(1);
		}
	},
	/*删除供应商*/
	doDeleteSupplier : function() {
		var me = this;
		var grid = me.getMng_Suppliergrid();
		var rec = grid.getSelectionModel().getSelection()[0];		
		var managerPanel=me.getMng_panelSupplier();

		
		Ext.Msg.confirm("提醒", "你确定要删除供应商:【" + rec.get('cpyname_cn') + "】的所有信息吗?", function(
						btn) {
					if (btn == "yes") {
						rec.set('is_delete',true);
						
						rec.set('operator',srm.UInfo.currentUser.name);
						rec.set('operater_dt',new Date());
						
						me.grdStore.sync({
							success:function(){
								
								me.grdStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
						});
						
						/*物理删除改成逻辑删除
						me.grdStore.remove(rec);// 从 Store 中删除给定的记录,
												// 对每条删除的记录都会触发一次 'remove' 事件.
												// 在此次的所有数据删除完成后,会触发一次
												// 'datachanged' 事件.
						
												
						me.grdStore.sync({
							success:function(){
								
								//发票抬头
								managerPanel.invoicestore.removeAll();
								managerPanel.invoicestore.sync(
								{
									success:function(){}
								});
								//主要设备明细
								managerPanel.devicelistStore.removeAll();
								managerPanel.devicelistStore.sync(
								{
									success:function(){}
								});
								//公司产品主要用料表
								managerPanel.metarialStore.removeAll();
								managerPanel.metarialStore.sync(
								{
									success:function(){}
								});
								//公司主要客户
								managerPanel.maincustomerStore.removeAll();
								managerPanel.maincustomerStore.sync(
								{
									success:function(){}
								});
								//公司主要竞争对手
								managerPanel.competitorStore.removeAll();
								managerPanel.competitorStore.sync(
								{
									success:function(){}
								});
								//公司银行账号
								managerPanel.bankAccountStore.removeAll();
								managerPanel.bankAccountStore.sync(
								{
									success:function(){}
								});
								//公司产品
								managerPanel.goodsStore.removeAll();
								managerPanel.goodsStore.sync(
								{
									success:function(){}
								});
								//附件
								//先删除文件在删数据库记录
								var attchedstore=managerPanel.registerAttchedStore;
								var customattchedstore=managerPanel.customAttchedStore;
								
								var patharray=[];
								for(var i=0;i<attchedstore.getCount();i++)
								{
									var record=attchedstore.getAt(i);
									
									patharray.push(record.get('file_path'));
								}
								for(var i=0;i<customattchedstore.getCount();i++)
								{
									var record=customattchedstore.getAt(i);
									patharray.push(record.get('file_path'));
								}
//								
								srm.Const.callServiceMethodSync('supplier/deleteAttchedByPath.do',{
											patharray:patharray.join(',')
									});
								
								managerPanel.registerAttchedStore.removeAll();
								managerPanel.registerAttchedStore.sync(
								{
									success:function(){}
								});
								
								managerPanel.customAttchedStore.removeAll();
								managerPanel.customAttchedStore.sync(
								{
									success:function(){}
								});
								Ext.Msg.alert('提示','删除成功！');
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
							}
						);
						//end
						 */
					}
				});
	}
	//归档与取消归档操作
	,doArchive:function(btn)
	{
		var me=this;
		
		if(btn.text=='归档')
		{
			var grid=me.getMng_Suppliergrid();
			var recs=grid.getSelectionModel().getSelection();
			if(recs.length==0)
			{
				Ext.Msg.alert('提示','请先选择归档记录！');
				return;
			}
			for(var i=0;i<recs.length;i++){
			recs[i].set('is_archive',true);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',srm.UInfo.currentUser.name);
			recs[i].set('auditor',srm.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
			}
			me.grdStore.sync({
							success:function(){
								
								me.grdStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '归档失败!');
										}
						});
		}
		else if(btn.text=='取消归档')
		{
			
			var grid=me.getMng_ArchivesSuppliergrid();
			var recs=grid.getSelectionModel().getSelection();
			if(recs.length==0)
			{
				Ext.Msg.alert('提示','请先选择归档记录！');
				return;
			}
			for(var i=0;i<recs.length;i++){
			recs[i].set('is_archive',false);
			//设置操作人、操作时间、审核人、审核时间
			recs[i].set('operator',srm.UInfo.currentUser.name);
			recs[i].set('auditor',srm.UInfo.currentUser.name);
			recs[i].set('operater_dt',new Date());
			recs[i].set('audit_dt',new Date());
			}
			me.grdArchiveStore.sync({
							success:function(){
								
								me.grdArchiveStore.load();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '取消归档失败!');
										}
						});
		}
		
	}
});
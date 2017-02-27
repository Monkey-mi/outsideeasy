Ext.define('srm.materialConfirmation.controller.MaterialConfirmationCtrl',{
	extend:'Ext.app.Controller',
	requires:[	'srm.ux.PagingBar',
				'srm.materialConfirmation.store.MaterialConfirmation',
				'srm.materialConfirmation.store.MaterialCheckDetail'
				,'srm.supplier.store.SupplierFile'
				,'srm.materialConfirmation.store.MaterialCheckclass'
				,'srm.materialConfirmation.store.MaterialSample'],
	views:[
			'srm.supplierManager.view.WestTab',
			'srm.materialConfirmation.view.ConfirmManager',
			'srm.materialConfirmation.view.ConfirmMainInfo',
			'srm.materialConfirmation.view.MaterialSample'],
	refs:[{ref : 'mng_Confirm',selector : 'mng_MaterialConfirm'},//管理页面
			{ref:'mng_Confirmgrid',selector:'mng_MaterialConfirm #grd_MaterialConfirm'},
			{ref:'panel_SamplyDetails',selector:'MaterialSample'},//样品明细及检测详细页面
			{ref:'panel_ConfirmInfo',selector:'panel_ConfirmMainInfo'}
		],
	init:function(){
	// controller只初始化一次
		var me = this;
		//该函数将最先执行，甚至先于 appliction.launch
		if (me.isInited)
			return;
		//处理所有view上面的交互
		me.control({
			//评估准入管理页面中供应商档案列表Grid初始化
			'mng_MaterialConfirm':{
				afterrender:function(cmp){
					var store=me.getMng_Confirmgrid().getStore();
					var grid=me.getMng_Confirmgrid();
					me.grdConfirmStore=store;
					me.grdConfirmStore.proxy.extraParams.usePaging=true;
					
					me.grdConfirmStore.load();
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdConfirmStore.proxy.extraParams.history=0;
					//todo:删除检索条件变量的值
					delete me.grdConfirmStore.proxy.extraParams.condition;
					
				}
			},
//			'panel_ConfirmInfo':{
//				beforeclose:function(th){
//					
//					var panelBaseInfo=th.down('#panelMainInfo');
//					if(panelBaseInfo!=null)
//					{
//						var rec=th.down('#panelMainInfo').getRecord();
//						if(rec!=null)
//						{
//							
//							me.grdConfirmStore.reload();
//							//me.grdConfirmStore.select(mainStore.find('confirmation_id',rec.get('confirmation_id')));
//						}
//					}
//				}
//			},
			//查询框回车事件
			'mng_MaterialConfirm #plMaterialConfirm #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mng_MaterialConfirm #grd_MaterialConfirm':{
				selectionchange:function(grid, rec){
					
					//列表有数据
					if (rec.length > 0) {
						me.setBtnStatus(false);
						var panel=me.getMng_Confirm();
						panel.loadCheckDetailsData(rec[0]);
					}
					//列表记录为空
					else
					{
						me.setBtnStatus(true);
						
					}
				},
				itemdblclick : function(grid, rec) {
							me.EditConfirmInfo(srm.def.Const.FUNC_ITEMID_BTN_EDT);
						}
			},
			//
			'mng_MaterialConfirm #plMaterialConfirm button':{
				click:me.doAction
			},
			'panel_ConfirmMainInfo #panelMainInfo button':{
				click:me.btnEditformAction
			},
			//物料确认样品明细guid选择改变事件
			'MaterialSample #sampleGrid':{
				selectionchange:function(grid, rec){
					var samplePanel=me.getPanel_SamplyDetails();
					if(rec.length>0)
					{
						
						//加载检测明细
						samplePanel.checkDetailStore.load({
						params:{sample_id:rec[0].get('sample_id')}});
						
					}
				}
			}
		});
		// controller初始化完成
	me.isInited=true;
	},
	/*主面板按钮响应*/
	doAction : function(btn) {
		var me=this;
		switch (btn.itemId) {
			//物料确认打开窗口按钮事件
			//管理页面的新增、修改按钮事件
			case srm.def.Const.FUNC_ITEMID_BTN_ADD:
			case srm.def.Const.FUNC_ITEMID_BTN_EDT:
				me.EditConfirmInfo(btn.itemId);
				break;
			case srm.def.Const.FUNC_ITEMID_BTN_DEL:
				me.doDelete();
				break;
			case 'btn_search':
				this.doQuery();
			break;
		}
	},
	/*修改、新增物料确认按钮事件*/
	EditConfirmInfo:function(itemId)
	{
		var me=this;
		var rec,isAdd;
		var grid=me.getMng_Confirmgrid();
		
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case srm.def.Const.FUNC_ITEMID_BTN_ADD://新增按钮
				
				rec=Ext.create('srm.materialConfirmation.model.MaterialConfirmation',{
				confirm_date:new Date(),
				confirmation_status:0
				});
				isAdd=true;
				break;
			case srm.def.Const.FUNC_ITEMID_BTN_EDT:
				rec=grid.getSelectionModel().getSelection()[0];

				isAdd=false;
				break;
		}
		var opentitle='新增物料确认';
		var openglyph=0xf044;
		if(!isAdd)
		{
			opentitle='修改物料确认';
			openglyph=0xf044;
		}

		var win=Ext.widget('panel_ConfirmMainInfo',{
			//新增、修改页面
			xtype:'panel_ConfirmMainInfo',
			itemId:'panelConfirmMainInfo',
			title:opentitle,
			glyph:openglyph,
			ConfirmRec:rec,
			isAdd:isAdd,
			store:grid.getStore(),
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
			
		});
		win.show();
	},
	
	btnEditformAction:function(btn)
	{
		var me=this;
		var mainPanel=me.getPanel_ConfirmInfo();
		//是否新增
		var isAdd=mainPanel.isAdd;
		var form=mainPanel.down('form');
		var rec=form.getRecord();
		form.updateRecord(rec);

		//样品明细及确认详细检测信息页面
		var detailPanel=me.getPanel_SamplyDetails();//me.getPanel_CheckDetails();
		switch(btn.itemId)
		{
			case 'BTN_SAVE':
			if(form.getForm().isValid()&&form.getForm().isDirty())
			{
				 Ext.Msg.confirm('提示','你确定要保存物料确认报告及相关检测信息吗?',function(btn){
				 	if(btn=='yes')
				 	{
				 		
				 		//提交原因为其它时，获取界面自定义的原因
				 		var submitReson=rec.get('submit_reason');
				 		if(submitReson=='其它')
				 		{
				 			var otherReson=mainPanel.down('#submit_reason_other').getValue();
				 		
				 			rec.set('submit_reason',otherReson);
				 		}
				 		var submitItem=rec.get('submit_item');
				 		//提交材料多选组装赋值
				 		var submitItemArray=submitItem[0];
				 		for(var i=0;i<submitItem.length;i++)
				 		{
				 			if(i>0)
				 			{
				 				submitItemArray+=','+submitItem[i];
				 			}
				 		}
				 		
				 		rec.set('submit_item',submitItemArray);
				 		//材料类别树下拉列表
						var treepicker=mainPanel.down('#classComboTree');
						//材料类别赋值
				 		var mc_id=treepicker.getValue();
						var mc_name=treepicker.getRawValue();
						
						rec.set('mc_id',mc_id);
						rec.set('mc_name',mc_name);
						
				 		if(isAdd)
				 		{
				 			
				 			rec.set('company_id',mainPanel.company_id);
				 			rec.set('company_name',mainPanel.company_name);
			 				rec.set('confirm_date',new Date());
			 					//rec.set('assess_person',srm.Util.currentUser.name);
				 			//me.grdConfirmStore.add(rec);
			 				mainPanel.store.add(rec);
				 			mainPanel.store.sync({
				 				success:function(e,batch){
				 					var newConfirm=batch.operations.create[0];
				 					if(newConfirm!=null)
				 					{
				 						//重新加载
										form.loadRecord(newConfirm);
										//将返回的主键confirmation_id赋值给详细检测信息store
				 						detailPanel.setconfirmationIdToSimply(newConfirm.get('confirmation_id'));
				 						
				 						detailPanel.materialSampleStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
											
												}
				 						});
				 						detailPanel.checkDetailStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 					}
				 					Ext.Msg.alert('提示', '新增成功!');
				 					me.grdConfirmStore.reload();
										
				 				},
				 				failure:function(e,batch){
				 					Ext.Msg.alert('提示', '保存失败!');
											return;
				 				}
				 			});
				 			mainPanel.isAdd=false;
				 			return;
				 		}
				 		else
				 		{
				 			
				 			mainPanel.store.sync({
				 				success:function(e,batch){
				 					
				 				},
				 				failure:function(e,batch){
				 					Ext.Msg.alert('提示', '保存失败!');
									return;
				 				}
				 			});
				 			detailPanel.materialSampleStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 						detailPanel.checkDetailStore.sync({
				 							success:function(){
				 								
				 							},
				 							failure : function(batch, options) {
												
												}
				 						});
				 			
				 			Ext.Msg.alert('提示','修改成功！');
				 		}
				 		
				 	}
				 });
			}
			break;
		}
	},
	/* 修改按钮状态*/
	setBtnStatus : function(sts) {
		var me = this;
		var panel = me.getMng_Confirm();
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
	},
	/*查询列表页面功能*/
	doQuery:function(){
		var me=this;
		var panel=me.getMng_Confirm();
		var condition=panel.down('#search').getValue();
		
		panel.store.proxy.extraParams.condition=condition;
		panel.store.proxy.extraParams.usePaging=true;
		panel.store.loadPage(1);
	}
	,doDelete:function()
	{
		var me=this;
		var grid=me.getMng_Confirmgrid();
		var rec=grid.getSelectionModel().getSelection()[0];
		var Panel=me.getMng_Confirm();
		//确认详细检测信息页面
		var detailPanel=me.getPanel_CheckDetails();
		Ext.Msg.confirm("提示","你确定要删除当前物料确认记录吗？",function(btn){
			if(btn=='yes')
			{
				
				me.grdConfirmStore.remove(rec);
				me.grdConfirmStore.sync({
					success:function(e,batch){
						Panel.checkDetailStore.removeAll();
						Panel.checkDetailStore.sync({success:function(){}});
						Ext.Msg.alert('提示','删除成功！');
					},
					failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
							
				});
			}
		});
	}
});
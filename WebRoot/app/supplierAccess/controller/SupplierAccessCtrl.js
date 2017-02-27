/*供应商评估准入控制页*/
Ext.define('srm.supplierAccess.controller.SupplierAccessCtrl',{
	extend:'Ext.app.Controller',
	requires:['srm.ux.PagingBar'
			,'srm.supplierManager.store.SupplierFile'
			,'srm.supplierAccess.store.SupplierAccessScore'
			,'srm.supplierAccess.store.EvaluateItemTree'
			],
	views:[
	    'srm.supplierAccess.view.SupplierAccessManager'
	   ,'srm.supplierAccess.view.AccessMainInfo'
	   ,'srm.supplierAccess.view.EvaluateManager'
	   ,'srm.supplierAccess.view.EvaluateItemDetails'
	   ,'srm.supplierAccess.view.UpImg'
	   ,'srm.supplierAccess.view.SupplierAccessManager'
	   ,'srm.supplierAccess.view.AccessMainInfo'
	   ,'srm.supplierAccess.view.EvaluateManager'
	   ,'srm.supplierAccess.view.EvaluateItemDetails'
	   ,'srm.supplierAccess.view.WestTab'
	   ],
	refs : [{ref : 'mng_panelSupplierAccess',selector : 'mng_supplierAccess'},//管理页面
			{ref:'mng_Suppliergrid',selector:'mng_supplierAccess #grd_Supplier'},
			{ref:'mng_EvaluateManager',selector:'access_MainInfo #access_EvaluateManager'},//评估管理页面
			{ref:'tree_evaluateNav',selector:'access_EvaluateManager treepanel'},
			{ref:'panl_evaluateDetails',selector:'access_EvaluateItemDetails'},//评估项页面
			//{ref : 'upPic',selector:'edt_Img'},//上传评估图片
			{ref:'form_evaluateDetails',selector:'access_EvaluateItemDetails #PanelEvaluateInfo'},//准入评估表单信息
			{ref:'panl_ScoreCollectInfo',selector:'access_ScoreCollectInfo'}
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
			'mng_supplierAccess':{
				afterrender:function(cmp){
					me.mainpanel=me.getMng_panelSupplierAccess();
					
					var store=me.getMng_Suppliergrid().getStore();
					var grid=me.getMng_Suppliergrid();
					me.grdSupplierStore=store;
					me.grdSupplierStore.proxy.extraParams.usePaging=true;
					//自定义参数，当前加载条件是准入评估，即apply_sts为10：供应商受理，或者为20：不合格
					me.grdSupplierStore.proxy.extraParams.accessflag=true;
					me.grdSupplierStore.load();
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdSupplierStore.proxy.extraParams.history=0;
					//todo:删除检索条件变量的值
					delete me.grdSupplierStore.proxy.extraParams.condition;
					
				}
			},
			
			'mng_supplierAccess #grd_Supplier':{
				selectionchange:function(grid, rec){
					
					//列表有数据
					if (rec.length > 0) {
						me.setBtnStatus(false);
						
					}
					//列表记录为空
					else
					{
						me.setBtnStatus(true);
						
					}
				},
				itemdblclick : function(grid, rec) {
							me.doAccessEvaluateInfo();
						}
			},
			
			//供应商准入评估管理界面的按钮事件，如准入申请、准入评估
			'mng_supplierAccess #plSupplierAccess button':{
				click:me.doAction
			},
			
			'access_EvaluateManager treepanel':{
				//afterrender:me.treepanelLoad,
				select:function(rowModel,rec){
					me.onSelectNode(rec);
				}
			},
			
			'access_EvaluateItemDetails #evaluateGrid':{
				selectionchange:function(grid,rec){
					
					if(rec.length>0){
						
						me.setImgBtnStatus(false);
					}
					else{
					me.setImgBtnStatus(true);
					}
					var panel=me.getPanl_evaluateDetails();
					if(rec.length>0&&rec[0].get('file_path')!=null&&rec[0].get('file_path')!=''){
						panel.showPic(rec[0]);
					}
				}
						
			},
			//评估信息保存
			'access_EvaluateItemDetails button':{
				click:me.EvaluateDoAction
			},
			//查询框回车事件
			'mng_supplierAccess #plSupplierAccess #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			'mng_AcessWestTab #levelclass' : {
						select : function(rowModel, rec) {
							
							var panel = me.getMng_panelSupplierAccess();
							panel.loadGridByTreeNodeId(rec,1);
						}
					},
			'mng_AcessWestTab #materialclass' : {
						select : function(rowModel, rec) {
							//叶节点
							if(rec.get('leaf')==true)
							{
								
								me.mainpanel.loadGridByTreeNodeId(rec,2);
							}
						}
					}
		});
		// controller初始化完成
		this.isInited = true;
	},
	/* 修改按钮状态*/
	setBtnStatus : function(sts) {
		var me = this;
		var panel = me.getMng_panelSupplierAccess();
		//panel.down('#btn_accessApply').setDisabled(sts);
		panel.down('#btn_accessEvaluate').setDisabled(sts);
		
		
	},
	setEvaluateBtnStatus:function(sts)
	{
		var me = this;
		var detailsPanel = me.getPanl_evaluateDetails();
		detailsPanel.down('#PanelEvaluateInfo').down('#BTN_SAVE').setDisabled(sts);
		detailsPanel.down('#PanelEvaluateInfo').down('#BTN_DEL').setDisabled(sts);
	},
	setImgBtnStatus:function(sts)
	{
		var me=this;
		
		var detailsPanel = me.getPanl_evaluateDetails();
		detailsPanel.down('#delPicture').setDisabled(sts);
		
		detailsPanel.down('#downloadPicture').setDisabled(sts);
	},
	/*主面板按钮响应*/
	doAction : function(btn) {
		var me=this;
		switch (btn.itemId) {
			//准入申请事件
//			case 'btn_accessApply':
//				me.doAccessApply();
			//准入评估
			case 'btn_accessEvaluate':
				me.doAccessEvaluateInfo();
				break;
			
			case 'btn_search':
				this.doQuery();
			break;
		}
	}
	
	/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getMng_panelSupplierAccess();
		var condition=panel.down('#search').getValue();
		
		panel.store.proxy.extraParams.condition=condition;
		panel.store.proxy.extraParams.usePaging=true;
		panel.store.loadPage(1);
	}
	/*准入申请事件方法*/
//	,doAccessApply:function()
//	{
//		var me=this;
//		var grid=me.getMng_Suppliergrid();
//		var store=grid.getStore();
//		//获取当前选择项，可多选
//		var recs=grid.getSelectionModel().getSelection();
//		//将供应商当前的状态apply_sts设置成9，表示准入申请操作完成
//		for(var i=0;i<recs.length;i++){
//			recs[i].set('apply_sts',9);
//			}
//		store.sync({
//			 		success:function(){
//			 				Ext.Msg.alert('提示','操作成功！');
//			 			},
//			 		failure : function(batch, options) {
//							Ext.Msg.alert('提示', '操作失败!');
//						}
//			 		});
//	}
	
	,
	//打开准入评估页面
	doAccessEvaluateInfo:function()
	{
		var me=this;
		var rec,isAdd,isEdit;
		var grid=me.getMng_Suppliergrid();
		rec=grid.getSelectionModel().getSelection()[0];
		//apply_sts=9为准入申请
		//todo:
//		if(rec.get('apply_sts')<9)
//		{
//			Ext.Msg.alert('提示','当前供应商还未进行准入申请，不得进行准入评估！');
//			return;
//		}
		var accessScore=Ext.create('srm.supplierAccess.store.SupplierAccessScore');
		 accessScore.load({params:{company_id:rec.get('company_id')}});
//		if(accessScore.getCount<=0)
//		{
//			var accessModel=Ext.create('srm.supplierAccess.model.SupplierAccessScore',{
//				company_id:rec.get('company_id'),
//				assess_date:new Date(),
//				version_id:0
//			});
//			accessScore.add(accessModel);
//		}
		
		var win=Ext.widget('access_MainInfo',{
			xtype:'access_MainInfo',
			itemId:'accessMainInfo',
			title:'评估详细',
			glyph:0xf02b,
			supplierRec:rec,
			accessScore:accessScore,
			company_id:rec.get('company_id'),
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
		});
		win.show();
	},
	onSelectNode:function(rec){
		var me=this;
		var treepanel=me.getTree_evaluateNav();
		//var rec=treepanel.getSelectionModel().getSelection()[0];
		var id=rec.get('id');
		var parentId=rec.get('parentId');

		var panlevaluateDetails=me.getPanl_evaluateDetails();
		
		if(rec.get('leaf')==true)
		{
			me.setEvaluateBtnStatus(false);
			panlevaluateDetails.setAccessScoreData(id,parentId);
		}
		else
		{
			me.setEvaluateBtnStatus(true);
		}
	},
	
	//提交评估信息
	EvaluateDoAction:function(btn)
	{
		var me=this;
		//评估页面
		var detailsPanel=me.getPanl_evaluateDetails();
		var isAdd=detailsPanel.isAdd;
		var company_id=detailsPanel.company_id;
		var item_id=detailsPanel.item_id;
		var item_fid=detailsPanel.item_fid;
		//表单上的得分
		var assess_score=detailsPanel.down('#assess_score').getChecked()[0].inputValue;
		var currentUser=srm.Util.currentUser.name;
		//基本信息form
		var form=me.getPanl_evaluateDetails().down('form');
		//获取界面数据
		var rec=form.getRecord();
		switch(btn.itemId)
		{
			case 'BTN_SAVE':
				if(form.getForm().isValid()&&form.getForm().isDirty())
				{
					if(company_id!=null&&company_id>0&&item_id!=null&&item_id>=0&&item_fid!=null&&item_fid>=0)
					{
					Ext.Msg.confirm('提示','你确定要保存当前评估明细吗?',function(btn){
						if(btn=='yes')
						{
							//更新form绑定的model
			 				form.updateRecord(rec);
			 				//将上传的图片路径保存到评估打分表的assess_view1字段中，用'逗号'隔开
			 				var imgView='';
			 				for(var i=0;i<detailsPanel.accessUploadImgStore.getCount();i++)
			 				{
			 					var file_path=detailsPanel.accessUploadImgStore.getAt(i).get('file_path');
			 					if(file_path!=null&&file_path!='')
			 					{
			 						if(imgView=='')
			 						{
			 							imgView=file_path;
			 						}
			 						else
			 						{
			 						imgView+=','+file_path;
			 						}
			 					}
			 				}
			 				
			 				//新增
			 				if(isAdd)
			 				{

			 					//得分赋值
			 					rec.set('assess_score',assess_score);
			 					rec.set('assess_date',new Date());
			 					rec.set('assess_person',srm.Util.currentUser.name);
			 					
			 					rec.set('assess_view1',imgView);
			 					
			 					detailsPanel.accessScore.add(rec);
			 					detailsPanel.accessScore.sync({
			 						success:function(e,batch){
			 							var newAccessScore=batch.operations.create[0];
									
										if(newAccessScore!=null)
										{
											//重新加载新增的评估明细
											form.loadRecord(newAccessScore);
											//将新记录的主键编号赋值给上传图片的store中
											detailsPanel.setScoreIdToImgStore(newAccessScore.get('score_id'));
											detailsPanel.accessUploadImgStore.sync({
												success:function(){
			 										
			 									},
			 									failure : function(batch, options) {
													
												}
											});
											//todo:暂时不做处理，有供应商档案中的按钮来控制
//											var supRecord=me.grdSupplierStore.findRecord('company_id',newAccessScore.get('company_id'));
//				 							if(supRecord!=null)
//				 							{
//				 								//将当前供应商的状态设置为10，已准入评估
//				 							supRecord.set('apply_sts',10);
//				 							me.grdSupplierStore.sync({
//			 									success:function(){
//			 										
//			 										},
//			 									failure : function(batch, options) {
//													
//													}
//			 								});
//				 							}
											Ext.Msg.alert('提示','保存成功！');
											return;
										}
			 						},
			 						failure:function(batch,options)
			 						{
			 							Ext.Msg.alert('提示', '保存失败!');
										return;
			 						}
			 					});
			 				}
			 				else
			 				{
			 					
			 					recs=detailsPanel.accessScore.getRange();
			 					
			 					if(recs==null||recs.length<=0)
			 					{
			 						Ext.Msg.alert('提示', '修改失败,请重新选择评估项!');
			 						return;
			 					}
			 					//得分修改后赋值给当前store中的记录
			 					recs[0].set('assess_score',assess_score);
			 					//图片路径的保存
			 					recs[0].set('assess_view1',imgView);
			 					detailsPanel.accessScore.sync({
			 						success:function(e,batch){
			 						
			 						},
			 						failure:function(batch,options)
			 						{
			 							Ext.Msg.alert('提示', '修改失败!');
										return;
			 						}
			 					});
			 					detailsPanel.accessUploadImgStore.sync({
												success:function(){
			 									
			 									},
			 									failure : function(batch, options) {
												
												}
			 							});
			 					Ext.Msg.alert('提示','修改成功！');
			 					return;
			 				}
						}
					});
					}
					else
					{
						Ext.Msg.confirm('提示','请选择具体的评估项！');
					}
				}
			break;
			case 'BTN_DEL':
				if(company_id!=null&&company_id>0&&item_id!=null&&item_id>=0&&item_fid!=null&&item_fid>=0)
				{
					//编辑状态时删除
					if(isAdd==false)
					{
						Ext.Msg.confirm('提示','你确定要删除当前评估明细吗?',function(btn){
							if(btn=='yes')
							{
								detailsPanel.accessScore.remove(rec);
								detailsPanel.accessScore.sync({
									success:function(){
										//删除图片的上传文件
										var imgStore=detailsPanel.accessUploadImgStore;
										var patharray=[];
										for(var i=0;i<imgStore.getCount();i++)
										{
											var imgRecord=imgStore.getAt(i);
											patharray.push(imgRecord.get('file_path'));
										}
										srm.Const.callServiceMethodSync('common/deleteFileByPath.do',{
											patharray:patharray.join(',')
										});
										detailsPanel.accessUploadImgStore.removeAll();
										detailsPanel.accessUploadImgStore.sync({
											success:function(){
											
											}
										});
										Ext.Msg.alert('提示','删除成功！');
										//表单重置清空
										form.reset();
									},
									failure : function(batch, options) {
											Ext.Msg.alert('提示', '删除失败!');
										}
							
								});
							}
						});
					}
				}
			break;
		}
	},
	
	//评估项Ext treepanel 加载时 默认选中第一条叶子节点
	treepanelLoad:function(store,node,records,successful,eOpts){
		var me=this;
		var treepanel=me.getTree_evaluateNav();
		
		//var rec=treepanel.getSelectionModel().getSelection()[0];
		if(successful && records.length>0 && node){
			for(var i = 0; i<records.length;i++){
				var leafNode = getLeafNode(node);
				if(leafNode!=''){
					treepanel.getSelectionModel().select(leafNode);
					if(!leafNode.get('expanded')){
		    				leafNode.expand();
		    				return;
					}
				}
			}
		}
	},
	getLeafNode: function(node){
			var leafNode='';
			if(node){
				if(!node.isLeaf()&&node.hasChildNodes()){
					var childrenNodes = node.childNodes;
					for(var i = 0;i<childrenNodes.length;i++){
						var childrenNode = childrenNodes[i];
						leafNode = getLeafNode(childrenNode);
						if(leafNode==''||leafNode==null){
							continue;
						}
						return leafNode;
					}
				}else if(node.isLeaf()){
					return node;
				}
			}
			return leafNode;
		}
});
/*供应商入驻审核控制页*/
Ext.define('srm.supplierAudit.controller.SupplierAuditCtrl',{
	extend:'Ext.app.Controller',
	requires:[
			'srm.ux.PagingBar',
			'srm.supplierAudit.store.SupplierFile',
			'srm.supplierAudit.store.AuthcationInfo',
			'srm.supplierAudit.store.AppBankAccount',
			'srm.supplierAudit.store.AppInvoiceTitle',
			'srm.supplierAudit.store.Area',
			'srm.supplierAudit.store.Attched',
			'srm.supplierAudit.store.AuthcationUpdate',
			'srm.supplierAudit.store.AuthUpdateAttched'],
	views:['srm.supplierAudit.view.SupplierAuditManager',//入驻审核管理界面
			'srm.supplierAudit.view.AuditOpinion',//审核不通过意见
			'srm.supplierAudit.view.SupplierMainInfo',//入驻审核供应商信息查看页面
			'srm.supplierAudit.view.SupplierAttchedFile',//入驻审核附件信息页面
			'srm.supplierAudit.view.SupplierOtherInfo',//入驻审核其他信息页面
			'srm.supplierAudit.view.SupplierBaseInfo',//入驻审核供应商基本信息页面
			'srm.supplierAudit.view.UpdateAuditManager',//入驻变更审核管理界面
			'srm.supplierAudit.view.UpdateAuditBaseInfo',
			'srm.supplierAudit.view.UpdateAuditMainInfo',
			'srm.supplierAudit.view.UpdateAuditOpinion',
			'srm.supplierAudit.view.UpdateAuditAttchedFile'],
	refs:[{ref:'mng_supplierAudit',selector:'mng_supplierAudit'},//入驻审核管理页面
		  {ref:'mng_SupplierAuditgrid',selector:'mng_supplierAudit #grd_supplierAudit'},//管理页面的供应商列表
		  {ref:'pl_mngSupplierAudit',selector:'mng_supplierAudit #plSupplierAudit'},
		  {ref:'pl_AuditOpinion',selector:'win_auditOpinion'},
		  //{ref:'pl_SupplierMainInfo',select:'SupplierMainInfo'},
		  {ref:'mng_UpdateAudit',selector:'mng_UpdateAudit'},
		  {ref:'mng_UpdateAuditgrid',selector:'mng_UpdateAudit #grd_updateAudit'},
		  {ref:'pl_mngUpdateAudit',selector:'mng_UpdateAudit #plSupplierUpdateAudit'},
		  {ref:'pl_UpdateAuditOpinion',selector:'win_update_auditOpinion'},
		  {ref:'pl_UpdateAttchedFile',selector:'update_audit_AttchedFileInfo'}
	],
	init:function(){
		var me=this;
		if(me.isInited)
			return;
		me.control({
			//供应商待审核列表Grid初始化
			'mng_supplierAudit':{
				afterrender:function(cmp){
					var panel=me.getMng_supplierAudit();
					//applysts_search
					me.getPl_mngSupplierAudit().down('#applysts_search').setValue(5);
					me.mainpanel=panel;
					var store=me.getMng_SupplierAuditgrid().getStore();
					me.grdStore=store;
					me.grdStore.proxy.extraParams.usePaging=true;
					me.grdStore.proxy.extraParams.apply_sts=5;
					//按操作提交时间倒序排列
					me.grdStore.proxy.extraParams.orderby_flag=2;
					me.grdStore.load();
					
					//功能权限设置
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					me.grdStore.proxy.extraParams.history=0;
					delete me.grdStore.proxy.extraParams.condition;
					
				}
			},
			//变更待审记录列表
			'mng_UpdateAudit':{
				afterrender:function(cmp){
					
					//入驻变更审核
					var updatePanel=me.getMng_UpdateAudit();
					me.updateMainpanel=updatePanel;
					me.getPl_mngUpdateAudit().down('#state_search').setValue(1);
					me.updategrdStore=me.getMng_UpdateAuditgrid().getStore();
					me.updategrdStore.proxy.extraParams.usePaging=true;
					me.updategrdStore.proxy.extraParams.state=1;
					//按创建时间倒序排列
					me.updategrdStore.proxy.extraParams.orderby_flag=2;
					me.updategrdStore.load();
					
					//原供应商Store,去掉，集成到后台一个方法中解决
					//me.supplierStore=Ext.create('srm.supplierAudit.store.SupplierFile');
					//me.supplierStore.proxy.extraParams.apply_sts=15;
					//me.supplierStore.load();
					//原供应商附件Store
					//me.supplierAttchedFileStore=Ext.create('srm.supplierAudit.store.Attched');
					//me.supplierAttchedFileStore.proxy.extraParams.is_license=true;
					//me.supplierAttchedFileStore.load();
					//功能权限设置
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestory:function(){
					
					me.updategrdStore.proxy.extraParams.history=0;
					delete me.updategrdStore.proxy.extraParams.condition;
				}
			},
			//认证审核按钮事件
			'mng_supplierAudit #plSupplierAudit button':{
				click:me.doAction
				
			},
			//变更认证审核按钮事件
			'mng_UpdateAudit #plSupplierUpdateAudit button':{
				click:me.doUpdateAction
			},
			'mng_supplierAudit #grd_supplierAudit':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						//按钮可用
						me.setBtnStatus(false);
						
					}
					else
					{
						//按钮不可用
						me.setBtnStatus(true);
					}
				},
				itemdblclick : function(grid, rec) {
					me.doSupplierInfoView();
				}
			},
			'mng_UpdateAudit #grd_updateAudit':{
				selectionchange:function(grid, rec){
					//列表有数据
					if (rec.length > 0) {
						//按钮可用
						me.setBtnStatus2(false);
						var panel=me.getMng_UpdateAudit();
						panel.loadSingleData(rec);
					}
					else
					{
						//按钮不可用
						me.setBtnStatus2(true);
					}
				},
				itemdblclick : function(grid, rec) {
					me.doUpdateSupplierInfoView();
				}
			},
			//入驻审核不合格建议页面提交按钮事件
			'win_auditOpinion #auditOpinionForm button':{
				click:me.doAuditOpinion
			}
			,
			'win_update_auditOpinion #updateAuditOpinionForm button':{
			
				click:me.doUpdateAuditOpinion
			}
			,
			//查询框回车事件
			'mng_supplierAudit #plSupplierAudit #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doQuery();
					}
				}
			},
			//查询框回车事件
			'mng_UpdateAudit #plSupplierUpdateAudit #search':{
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						me.doUpdateQuery();
					}
				}
			}
		});
		this.isInited=true;
	},
	/*管理页面按钮事件方法*/
	doAction : function(btn) {
		var me=this;
		var grid=me.getMng_SupplierAuditgrid();
		switch (btn.itemId) {
			case 'btn_view':
				this.doSupplierInfoView();
				break;
			case 'btn_AuditPass':
			this.supplierAuditPass();
			break;
			case 'btn_AuditUnPass':
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length>1)
				{
					Ext.Msg.alert('提示','请选择单条审核！');
				}
				else
				{
					
					var auditOpinionRec=Ext.create('srm.supplierAudit.model.AuthcationInfo',{
						company_id:recs[0].get('company_id'),
						auth_state:1
					});
					var win=Ext.widget('win_auditOpinion',{
						itemId:'win_auditOpinion',
						auditOpinionRec:auditOpinionRec,
						modFuncsDisabled:me.modFuncsDisabled,
						closable:true
					});
					win.show();
				}
				break;
			case 'btn_search':
				this.doQuery();
				break;
			case 'btn_reflash':
				this.doReflash();
				break;
		}
		
	},
	/*变更管理页面按钮事件方法*/
	doUpdateAction:function(btn){
		var me=this;
		var grid=me.getMng_UpdateAuditgrid();
		switch (btn.itemId) {
			case 'btn_view':
				this.doUpdateSupplierInfoView();
				break;
			case 'btn_AuditPass':
			this.updateAuditPass();
			break;
			case 'btn_AuditUnPass':
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length>1)
				{
					Ext.Msg.alert('提示','请选择单条审核！');
				}
				else
				{
					
					
					var win=Ext.widget('win_update_auditOpinion',{
						itemId:'win_update_auditOpinion',
						updateAuditOpinionRec:recs[0],
						updateStore:me.updategrdStore,
						modFuncsDisabled:me.modFuncsDisabled,
						closable:true
					});
					win.show();
				}
				break;
			case 'btn_search':
				this.doUpdateQuery();
				break;
			case 'btn_reflash':
				this.doUpdateReflash();
				break;
				
		}
	},
	//入驻认证审核通过方法
	supplierAuditPass:function()
	{
		var me=this;
		var grid=me.getMng_SupplierAuditgrid();
		var store=grid.getStore();
		//多选操作
		var recs=grid.getSelectionModel().getSelection();
		var companyid_array=[];
		for(var i=0;i<recs.length;i++)
		{
			companyid_array.push(recs[i].get('company_id'));
			
			recs[i].set('apply_sts',15);
			recs[i].set('auditor',srm.UInfo.currentUser.name);
			recs[i].set('audit_dt',new Date());
		}
		store.sync({
			 		success:function(){
			 			//保存最新的企业信息到历史版本中
			 			srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=saveCompanyAuthHistory',{companyid_array:companyid_array.join(',')});
			 			Ext.Msg.alert('提示','操作成功！');
			 			me.grdStore.reload();
			 			
			 			},
			 		failure : function(batch, options) {
							Ext.Msg.alert('提示', '操作失败!');
						}
			 		});
	},
	//变更审核通过方法
	updateAuditPass:function()
	{
		var me=this;
		var grid=me.getMng_UpdateAuditgrid();
		var updatestore=grid.getStore();
		var updateMngPanel=me.getMng_UpdateAudit();
		var updateAttechFileStore=updateMngPanel.attchedStore;
		//console.log(updateAttechFileStore);
		//多选操作
		var recs=grid.getSelectionModel().getSelection();
		//console.log('recs.length:'+recs.length);
		var authUpdateIdArray=[];
		
		for(var i=0;i<recs.length;i++)
		{
			recs[i].set('state',2);
			var rec=recs[i];
			//将当前变更ID存放起来
			authUpdateIdArray.push(rec.get('auth_update_id'));
			//console.log("authUpdateIdArray");
			//console.log(authUpdateIdArray);
			
			//console.log("company_id:"+rec.get('company_id'));
			
			//var oldsupplierRec=me.supplierStore.findRecord('company_id',rec.get('company_id'),0,false,true,true);
			
			//console.log("i:"+i);
			//console.log(rec);
			//console.log("oldsupplierRec:");
			//console.log(oldsupplierRec);
			
			/*作废，整合到后台一个方法中去完成企业信息及历史企业信息的修改
			if(!Ext.isEmpty(oldsupplierRec))
			{
				oldsupplierRec.set('class_id',rec.get('class_id'));
				oldsupplierRec.set('nature_id',rec.get('nature_id'));
				oldsupplierRec.set('key_remark',rec.get('key_remark'));
				oldsupplierRec.set('cpyname_cn',rec.get('cpyname_cn'));
				
				oldsupplierRec.set('industry_id',rec.get('industry_id'));
				
				oldsupplierRec.set('corporation',rec.get('corporation'));
				oldsupplierRec.set('reg_fund',rec.get('reg_fund'));
				oldsupplierRec.set('currency_id',rec.get('currency_id'));
				oldsupplierRec.set('establish_dt',rec.get('establish_dt'));
				
			}
			*/
		}
		/*
		var updateAttechFileRecs=updateAttechFileStore.getRange();
			
			for(var i=0;i<updateAttechFileRecs.length;i++)
			{
				var company_id=updateAttechFileRecs[i].get('company_id');
				var file_type_id=updateAttechFileRecs[i].get('file_type_id');
				var mongdb_id=updateAttechFileRecs[i].get('object_id');
				
				var n=0;
				var oldsupplierAttchedFileRecs=me.supplierAttchedFileStore.getRange();
				for(var j=0;j<oldsupplierAttchedFileRecs.length;j++)
				{
					var record=oldsupplierAttchedFileRecs[j];
					if(record.get('company_id')==company_id && record.get('file_type_id')==file_type_id)
					{
						//console.log("配对成功："+company_id+","+file_type_id);
						record.set('mogodb_id',mongdb_id);
						n=1;
						continue;
					}
					
				}
				if(n==0)
				{
				//变更表里有，原表里没有，是新增的证照
					var newRec=Ext.create('srm.supplierAudit.model.Attched',{
						company_id:company_id,
						file_type_id:file_type_id,
						mogodb_id:mongdb_id,
						create_dt:new Date()
					});
					me.supplierAttchedFileStore.add(newRec);
					//console.log("新增的："+mongdb_id);
				}
				
			}
		*/
		updatestore.sync({
			 		success:function(){
			 			/*
			 			me.supplierStore.sync({
			 				success:function(){
			 				//console.log("供应商变更信息保存成功");
			 				},
			 				failure:function(){
			 				//console.log("供应商变更信息保存失败");
			 				}
			 			});
			 			me.supplierAttchedFileStore.sync({
			 				success:function(){
			 				//console.log("供应商变更附件信息保存成功");
			 				},
			 				failure:function(){
			 				//console.log("供应商变更附件信息保存失败");
			 				}
			 			});
			 			*/
			 			//保存最新的企业信息到历史版本中
			 			srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=saveCompanyUpdateAuthToHistory',{authUpdateIdArray:authUpdateIdArray.join(',')});
			 			
			 			Ext.Msg.alert('提示','操作成功！');
			 			me.updategrdStore.reload();
			 			},
			 		failure : function(batch, options) {
							Ext.Msg.alert('提示', '操作失败!');
						}
			 		});
	},
	
	//审核不通过提交方法，待意见
	doAuditOpinion:function(btn)
	{
		var me=this;
		var opinionPanel=me.getPl_AuditOpinion();
		var opinionForm=opinionPanel.down('#auditOpinionForm');
		if(btn.itemId=='btn_save')
		{
			//获取界面数据
			var opinionRec=opinionForm.getRecord();
			opinionForm.updateRecord(opinionRec);
			var company_id=opinionRec.get('company_id');
			var auth_opinion=opinionRec.get('auth_opinion');
			/*if(Ext.isEmpty(auth_opinion))
			{
				Ext.Msg.alert('提示', '请输入审核意见!');
				return;
			}*/
			if(opinionForm.getForm().isValid()&&opinionForm.getForm().isDirty())
			{
				opinionRec.set('create_dt',new Date());
				var opinionStore=Ext.create('srm.supplierAudit.store.AuthcationInfo');
				opinionStore.add(opinionRec);
				opinionStore.sync({
					success:function(e,batch)
					{
						var mainRec=me.grdStore.findRecord('company_id',company_id,0,false,true,true);
						mainRec.set('apply_sts',20);
						mainRec.set('auditor',srm.UInfo.currentUser.name);
						mainRec.set('audit_dt',new Date());
						me.grdStore.sync({
					 		success:function(){
					 			opinionPanel.close();
					 			me.grdStore.reload();
					 			//console.log("不合格审核成功");
					 			},
					 		failure : function(batch, options) {
									Ext.Msg.alert('提示', '操作失败!');
								}
				 		});
					},
					failure : function(batch, options) {
												Ext.Msg.alert('提示', '提交失败!');
												return;
											}
				});
			}
		}
	},
	//变更审核不通过意见窗口确定按钮提交事件
	doUpdateAuditOpinion:function(btn)
	{
		var me=this;
		var opinionPanel=me.getPl_UpdateAuditOpinion();
		var updateOpinionForm=opinionPanel.down('#updateAuditOpinionForm');
		if(btn.itemId=='btn_save')
		{
			var updateRec=updateOpinionForm.getRecord();
			updateOpinionForm.updateRecord(updateRec);
			if(updateOpinionForm.getForm().isValid()&&updateOpinionForm.getForm().isDirty())
			{
				updateRec.set('state',3);
				opinionPanel.updateStore.sync({
					success:function(){
						opinionPanel.close();
						me.updategrdStore.reload();
						Ext.Msg.alert('提示', '操作成功!');
						//console.log("变更审核不通过回调成功");
						},
					failure:function(){
						Ext.Msg.alert('提示', '提交失败!');
						return;}
				});
			}
		}
		
	},
	//打开查看页面
	doSupplierInfoView:function()
	{
		var me=this;
		var grid=me.getMng_SupplierAuditgrid();
		var rec=grid.getSelectionModel().getSelection()[0];
		var win=Ext.widget('SupplierMainInfo',{
			itemId:'SupplierMainInfo',
			title:'查看供应商信息',
			glyph:0xf15c,
			supplierRec:rec,
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
		});
		win.show();
	}
	,
	//打开更新信息页面
	doUpdateSupplierInfoView:function()
	{
		var me=this;
		var grid=me.getMng_UpdateAuditgrid();
		var rec=grid.getSelectionModel().getSelection()[0];
		var win=Ext.widget('update_AuditMainInfo',{
			itemId:'update_AuditMainInfo',
			title:'查看供应商变更信息',
			glyph:0xf15c,
			updateSupplierRec:rec,
			modFuncsDisabled:me.modFuncsDisabled,
			closable:true
		});
		win.show();
	}
	//刷新
	,doReflash:function(){
		var me=this;
		var panel=me.getPl_mngSupplierAudit();
		panel.down('#search').setValue('');
		delete me.grdStore.proxy.extraParams.condition;
		me.grdStore.loadPage(1);
	}
	/*查询列表页面功能*/
	,doQuery:function(){
		var me=this;
		var panel=me.getPl_mngSupplierAudit();
		var condition=panel.down('#search').getValue();
		var apply_stsSearch=panel.down('#applysts_search').getValue();
		me.grdStore.proxy.extraParams.condition=condition;
		me.grdStore.proxy.extraParams.apply_sts=apply_stsSearch;
		me.grdStore.loadPage(1);
		
	}
	,doUpdateReflash:function(){
		var me=this;
		var panel=me.getPl_mngUpdateAudit();
		panel.down('#search').setValue('');
		delete me.updategrdStore.proxy.extraParams.condition;
		me.updategrdStore.loadPage(1);
	}
	/*查询列表页面功能*/
	,doUpdateQuery:function(){
		var me=this;
		var panel=me.getPl_mngUpdateAudit();
		var condition=panel.down('#search').getValue();
		var stateSearch=panel.down('#state_search').getValue();
		me.updategrdStore.proxy.extraParams.condition=condition;
		me.updategrdStore.proxy.extraParams.state=stateSearch;
		me.updategrdStore.loadPage(1);
		
	},
	//入驻审核管理页面按钮可不可见
	setBtnStatus:function(sts)
	{
		var me=this;
		var panel=me.mainpanel;
		panel.down('#btn_view').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	},
	//变更审核管理页面按钮可不可见
	setBtnStatus2:function(sts)
	{
		var me=this;
		var panel=me.updateMainpanel;
		panel.down('#btn_view').setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	}
});
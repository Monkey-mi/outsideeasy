Ext.define('srm.sysmodule.controller.FunctionClassCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'
				,'srm.sysmodule.store.SysFunctionClassTree'
				,'srm.sysmodule.store.SysFunctionClass'
				],
	views:[
			'srm.sysmodule.view.FunctionClassManager',
			'srm.sysmodule.view.EditFunctionClass',
			'srm.sysmodule.view.EditPageAuthority'
		],
	refs:[
		{ref:'mng_FunctionClass',selector:'mng_FunctionClass'},
		{ref:'grid_page',selector:'mng_FunctionClass #sysPageAuthority-grid'},
		{ref:'treepanel',selector:'mng_FunctionClass #sysFunctionClassTree'},
		{ref:'editFunctionClass',selector:'editFunctionClass'},
		{ref:'editPageAuthority',selector:'editPageAuthority'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_FunctionClass':{
				afterrender:function(cmp){
					me.pagestore=cmp.pagestore;
					me.treestore=cmp.treestore;
					me.grdstore=cmp.grdstore;
					me.pagestore.load();
					me.treestore.load();
					me.grdstore.loadPage(1,{
						params:{
							nodeIdForGrid:0
						}
					});
				},
				beforedestroy:function(){
					delete me.grdstore.proxy.extraParams.nodeIdForGrid;
					delete me.pagestore.proxy.extraParams.nodeIdForGrid;
				}
			},
			'mng_FunctionClass  #sysFunctionClassTree':{
			 	select :me.onSelectModule
			},
			'mng_FunctionClass  #sysFunctionClassTree button':{
			 	click : me.dotreebtn
			},
			'mng_FunctionClass #sysPageAuthority-grid button':{
				click : me.dogridbtn
			},
			'editFunctionClass button':{
				click:me.doeditFunctionClass
			},
			'editPageAuthority button':{
				click:me.doeditPageAuthority
			}
		});
		me.isInited=true;
	},
	dotreebtn:function(btn){
		var me=this;
		var treepanel=me.getTreepanel();
		switch(btn.itemId){
			case "BTN_ADD_TREE":
				var sel_treerecs=treepanel.getSelectionModel().getSelection();
				if(sel_treerecs.length==0){
					Ext.Msg.alert('提示','请选中树节点');
					return;
				}
				if(sel_treerecs[0].get('leaf')){
					Ext.Msg.alert('提示','叶子节点不能有下级');
					return;
				}
				var rec=Ext.create('srm.sysmodule.model.SysFunctionClass',{
					parentId:sel_treerecs[0].get('id')
				});
				var win =Ext.widget('editFunctionClass',{
					itemId:'editFunctionClass',
					title : '业务分类',
					isAdd : true,
					isEdit : false
				});
				win.loadData(rec);
				win.show();
				break;
			case "BTN_EDT_TREE":
				var sel_treerecs=treepanel.getSelectionModel().getSelection();
				if(sel_treerecs.length==0){
					Ext.Msg.alert('提示','请选中树节点');
					return;
				}
				var rec=me.grdstore.findRecord('class_id',sel_treerecs[0].get('id'),0,false,false,true);
				if(Ext.isEmpty(rec)){
					Ext.Msg.alert('提示','未加载完成，请稍后重新点击');
					return;
				}
				var win =Ext.widget('editFunctionClass',{
					itemId:'editFunctionClass',
					title : '业务分类',
					isAdd : false,
					isEdit : true
				});
				win.loadData(rec);
				win.show();
				break;
			case "BTN_DEL_TREE":
				var sel_treerecs=treepanel.getSelectionModel().getSelection();
				if(sel_treerecs.length==0){
					Ext.Msg.alert('提示','请选中树节点');
					return;
				}
				if(me.grdstore.getCount()>1){//因为store包含本身，所以不是>0，而是>1
					Ext.Msg.alert('提示',"有子节点");
					return;
				}
				if(me.pagestore.getCount()>0){
					Ext.Msg.alert('提示',"该节点下有页面");
					return;
				}
				Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
					if (btn == "yes") {		
						me.grdstore.remove(sel_treerecs[0]);
						me.grdstore.sync({
							success : function(e, batch) {
								
								me.treestore.load();
								Ext.Msg.alert('提示','删除成功');
							}
						});				
					}
				});
				
				break;
			case "BTN_REFRESH_TREE":
				me.treestore.load();
				break;
		}
	},
	dogridbtn:function(btn){
		var me=this;
		var treepanel=me.getTreepanel();
		var	grid_page=me.getGrid_page();
		switch(btn.itemId){
			case "BTN_ADD":
				var sel_treerecs=treepanel.getSelectionModel().getSelection();
				if(sel_treerecs.length==0){
					Ext.Msg.alert('提示','请选中树节点');
					return;
				}
				/*if(!sel_treerecs[0].get('leaf')){
					Ext.Msg.alert('提示','叶子节点 才能新增页面');
					return;
				}*/
				var rec=Ext.create('srm.sysmodule.model.SysPageAuthority',{
					class_id:sel_treerecs[0].get('id')
				});
				var win =Ext.widget('editPageAuthority',{
					itemId:'editPageAuthority',
					title : '页面信息创建',
					glyph:0xf1c9,
					isAdd : true,
					isEdit : false
				});
				win.loadData(rec);
				win.show();
				break;
			case "BTN_EDT":
				var sel_recs=grid_page.getSelectionModel().getSelection();
				if(sel_recs.length==0){
					Ext.Msg.alert('提示','请选中页面记录');
					return;
				}
				var rec=sel_recs[0];
				var win =Ext.widget('editPageAuthority',{
					itemId:'editPageAuthority',
					title : '页面信息维护',
					glyph:0xf1c9,
					isAdd : false,
					isEdit : true
				});
				win.loadData(rec);
				win.show();
				break;
			case "BTN_DEL":
				var sel_recs=grid_page.getSelectionModel().getSelection();
				if(sel_recs.length==0){
					Ext.Msg.alert('提示','请选中页面记录');
					return;
				}
				Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
					if (btn == "yes") {		
						me.pagestore.remove(sel_recs[0]);
						me.pagestore.sync({
							success : function(e, batch) {
								me.pagestore.reload();
								
								//删除该页面关联的功能表中的数据
								srm.Const.callServiceMethodSync('sysmodule/sysFunctionClass.do?method=deleteSysPageFuncByauthId',{
											authority_id:sel_recs[0].get('authority_id')
									});
								Ext.Msg.alert('提示','删除成功');
							}
						});				
					}
				});
				break;
			case "BTN_REFRESH":
				me.pagestore.reload();
				break;
		}
	},
	onSelectModule:function(){
		var me=this;
		var treepanel=me.getTreepanel();
		var rec=treepanel.getSelectionModel().getSelection()[0];
		var nodeIdForGrid=rec.get('id');
		Ext.apply(me.grdstore.proxy.extraParams, {'nodeIdForGrid':nodeIdForGrid});
		Ext.apply(me.pagestore.proxy.extraParams, {'nodeIdForGrid':nodeIdForGrid});
		me.grdstore.loadPage(1);
		me.pagestore.loadPage(1);
	},
	doeditFunctionClass:function(btn){
		var me=this;
		var editView=me.getEditFunctionClass();
		var form=editView.down('form');
		switch(btn.itemId){
			case "btn_confirm":
				//验证数据
				var class_name=form.getForm().findField('class_name').getValue();
				var class_id=form.getForm().findField('class_id').getValue();
				var parentId=form.getForm().findField('parentId').getValue();
				var isParent=form.getForm().findField('isParent').getValue();
				if(Ext.isEmpty(class_name)){
					Ext.Msg.alert('提示',"名称不允许为空");
					return;
				}
				if(!Ext.isEmpty(class_name) && srm.Util.gettextlength(class_name)>100){
					Ext.Msg.alert('提示',"最大长度100字符");
					return;
				}			
				var result=srm.Const.callServiceMethodSync('sysmodule/sysFunctionClass.do?method=checkForUpdate',{
						parentId:parentId,
						class_name:class_name,
						class_id:class_id
				});
				result=Ext.decode(result);  
				if(result.status==false){					
					Ext.Msg.alert('提示',"该名称已存在");
					return false;
				}
				//保存数据
				var rec=form.getRecord();
				form.updateRecord(rec);
				
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(me.grdstore.indexOf(rec) >= 0&&rec.get('class_id')>0){
						me.grdstore.sync({
								success : function(e, batch) {
									
									me.treestore.load();
									editView.close();
								}
							});
						
						Ext.Msg.alert('提示','保存成功');
					}else{
						rec.phantom =true;//表示新增
						me.grdstore.add(rec);
		    			me.grdstore.sync(
							{
								success : function(e, batch) {
//									 var newRec=batch.operations.create[0];
//									 form.loadRecord(newRec);
									
									 me.treestore.load();
									 editView.close();
								}
							}
						);
						Ext.Msg.alert('提示','保存成功');
					}	
				}
				break;
		}
	},
	doeditPageAuthority:function(btn){
		var me=this;
		var editView=me.getEditPageAuthority();
		var form=editView.down('form');
		switch(btn.itemId){
			case "btn_confirm":
				//验证
				var page_name=form.getForm().findField('page_name').getValue();
				if(Ext.isEmpty(page_name)){
					Ext.Msg.alert('提示',"名称不允许为空");
					return;
				}
				if(!Ext.isEmpty(page_name) && srm.Util.gettextlength(page_name)>250){
					Ext.Msg.alert('提示',"最大长度250字符");
					return;
				}
				//保存
				var rec=form.getRecord();
				form.updateRecord(rec);
				
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(me.pagestore.indexOf(rec) >= 0&&rec.get('authority_id')>0){
						me.pagestore.sync({
								success : function(e, batch) {
									
								}
							});
						//编辑页面时页面功能列表信息更新保存
						editView.pageFuncStore.sync({
			 				success:function(){
			 					console.log("页面功能信息回调成功");
			 				},
			 				failure : function(batch, options) {
								console.log("页面功能信息回调失败");
							}
			 			});
						editView.close();
						Ext.Msg.alert('提示','保存成功');
					}else{
						rec.phantom =true;//表示新增
						me.pagestore.add(rec);
		    			me.pagestore.sync(
							{
								success : function(e, batch) {
//									 var newRec=batch.operations.create[0];
//									 form.loadRecord(newRec);
									
									 editView.close();
								}
							}
						);
						Ext.Msg.alert('提示','保存成功');
					}	
				}
				break;
		}
	}
});
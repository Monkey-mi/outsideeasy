Ext.define('srm.module.controller.Module', {
	extend : 'Ext.app.Controller',
	requires : [ 'Ext.tree.Panel',
					 'srm.def.Const',
					 'srm.util.Util' ],
	models : [ 'srm.module.model.Module', 'srm.module.model.ModuleTree' ],
	views : [ 'srm.module.view.MngModule', 
				 'srm.module.view.EditModule' 
				 ],
	refs : [
	// 创建模块信息列表的一个引用，根据规则调用函数为this.getModuleGrid()
	{
		ref : 'moduleGrid',
		selector : 'mng_Module gridpanel'
	}, {
		ref : 'moduleTree',
		selector : 'mng_Module treepanel'
	} ],
	// =============界面操作权限相关======================================
	// 这两个属性将由框架自动设置
	modId : 0, // 分配的模块ID
	modFuncsDisabled : {}, // 功能按钮的权限
	// =============界面操作权限相关======================================
	init : function() {
		// controller只初始化一次
		if (this.isInited)
			return;

		this.control({
			'mng_Module' : {
				beforerender : function(cmp) {
					// =============界面操作权限相关======================================
					// 在操作界面呈现前设置操作权限
					cmp.modFuncsDisabled = this.modFuncsDisabled;
					// =============界面操作权限相关======================================
				},
				afterrender : function() {
					this.changeStore = Ext.create('srm.module.store.Modules');
					this.treeStore = this.getModuleTree().getStore();
					this.gridStore = this.getModuleGrid().getStore();
				}
			},
			'mng_Module treepanel' : {
				// 功能模块菜单树节点被选取时,右面模块信息列表中显示该节点及其直接下属节点的信息
				select :this.onSelectModule,
				itemcontextmenu:this.onModuleTreeItemContextMenu
			},
			'mng_Module gridpanel' : {
				// 双击模块信息列表时，打开模块信息维护窗口
				itemdblclick : this.onGridItemdbclik,
				itemcontextmenu:this.onGridModuleContextMenu
			},
			'mng_Module button' : {
				// 响应模块信息窗口增、删、改按钮事件
				click : this.onMngWinBtnClick
			},
			'edt_Module button' : {
				// 响应模块信息维护窗口按钮事件
				click : this.onEdtWinBtnClick
			},
			'mng_Module tool' : {
				click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						this.treeStore.load();
					}
				}
			}
		});

		// controller初始化完成
		this.isInited = true;
	},
	//点击树节点显示树节点及其子节点
	onSelectModule: function(rowModel, rec, idx, eOpts) {
		this.gridStore.load({
			params : {
				node : rec.get('id'),
				leaf : srm.Const.YESNO_TYPE_YES
			}
		});
	},
	// 双击模块信息列表时，打开模块信息维护窗口
	onGridItemdbclik : function(view, rec) {
		// =============界面操作权限相关======================================
		// 因为鼠标双击所在行代表修改操作，需要先检查操作权限
		if (!this.modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_EDT])
			this.doEditModule(rec);
	},
	// 响应模块信息窗口增、删、改按钮事件
	onMngWinBtnClick : function(btn, event) {
		// =============界面操作权限相关======================================
		// 需要先检查操作权限
		if (!this.modFuncsDisabled[btn.itemId])
			switch (btn.itemId) {
			case srm.Const.FUNC_ITEMID_BTN_ADD:
				this.doAddModule();
				break;
			case srm.Const.FUNC_ITEMID_BTN_EDT:
				this.doEditModule();
				break;
			case srm.Const.FUNC_ITEMID_BTN_DEL:
				this.doDelModule();
				break;
			case srm.Const.FUNC_ITEMID_BTN_REFRESH:
				this.gridStore.reload();
				break;
			case 'BTN_BF':
				this.dotest();
				break;
			}
	},
	dotest:function(){
		for(var i=0;i<10;i++){
			srm.Const.callServiceMethodSync('common/Modules.do?method=testTransactional',{
				version:i
			});
		}
		
	},
	// 响应模块信息维护窗口按钮事件
	onEdtWinBtnClick : function(btn, event) {
		var edtWin = btn.up('edt_Module');
		switch (btn.action) {
		case 'ACT_SAVE':
			var me=this;
			var leafChange=false;
			var edtForm = edtWin.down('form');
			if (edtForm.getForm().isValid() && edtForm.getForm().isDirty()) {
				var funcStore = edtWin.down('#edit_func').getStore();
				// 保存模块信息
				var rec = edtForm.getRecord();
				edtForm.updateRecord(rec);
				if (edtWin.isAddNew) {
					this.gridStore.add(rec);
					var node=this.getModuleTree().getSelectionModel().getSelection()[0];
					var pid=node.get('id');
					if(node.childNodes.length==0){
						var model=me.gridStore.findRecord('id',pid,0,false,false,true);
						model.set('leaf',srm.Const.YESNO_TYPE_NO);
					    leafChange=true;
					}
				}
				this.gridStore.sync({success:function(){
				    me.doReloadNode(rec.get('parentId'),leafChange);
				    me.gridStore.reload();
				}});
				funcStore.sync();
				
				edtWin.close();
				// 模块菜单树还需要重新加载所在节点
			}
			break;
		case 'ACT_CLOSE':
			edtWin.close();
			break;
		case 'ACT_ADD':
			var model = this.getModuleGrid().getSelectionModel();
			var rec = model.getSelection()[0];
             if(btn.itemId=='funadd'){
            	 var formGrid=edtWin.down('#edit_func');
            	 var r = Ext.create('srm.module.model.Function', {
     				mod_id : rec.get('id'),
     				name : '',
     				code : '',
     				order_seq : 0
     			});
     			//formGrid.getStore().insert(0, r);
            	var r2=formGrid.getStore().add(r);
            	var idx = formGrid.getStore().getCount()-1;
     			formGrid.getPlugin().startEditByPosition({
     				row : idx,
     				column : 0
     			});
             }
			break;
		case 'ACT_DEL':
			if(btn.itemId=='fundel'){
				var formGrid=edtWin.down('#edit_func');
				var model=formGrid.getSelectionModel();
				if(!model.hasSelection()){
					Ext.Msg.alert('提示','请选择一条数据');
					return;
				}
				var rec=formGrid.getSelectionModel().getSelection()[0];
					Ext.Msg.confirm('提示', '确定要删除' + rec.get('name') + '这一行吗？',
							function fn(id) {
								if (id == Ext.Msg.buttonIds[1]) {
									formGrid.getStore().remove(rec);
								}
							});
			}
			break;
		}
	},
	doAddModule : function() {
		var me=this;
		var selModel = this.getModuleTree().getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert('提示', '请先在功能模块树中选择一个节点作为新增模块的父节点!');
			return;
		}
		var parentId = selModel.getSelection()[0].get('id');
		var rec = Ext.create('srm.module.model.Module');
		
		rec.set('parentId', parentId);
		var edtWin = Ext.widget('edt_Module', {
			isAddNew : true
		});
	
		edtWin.doInit(rec);
		edtWin.show();
	},
	doEditModule : function() {
		var selModel = this.getModuleGrid().getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert('提示', '请先在模块信息中选择一条数据!');
			return;
		}
		var edtWin = Ext.widget('edt_Module', {
			isAddNew : false
		});
		var rec = selModel.getSelection()[0];
		if (rec.get('leaf') == 'false') {
			edtWin.down('#tab_mfunc').setDisabled(true);
		}
		edtWin.doInit(rec);
		edtWin.show();

	},
	doDelModule : function() {
		// 删除前需要做一些逻辑检查
		// 1.有子节点时不能删除
		var me = this;
		var leafChange=false;
		var selModel = this.getModuleGrid().getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert('提示', '请先在模块信息中选择一条数据!');
			return;
		}
		var rec = selModel.getSelection()[0];
		Ext.Ajax.request({
			url : 'common/Modules.do?method=getCountByPId',
			params : {
				node : rec.get('id')
			},
			success : function(resp) {
				var ret = Ext.decode(resp.responseText);
				if (ret.total > 0) {
					Ext.Msg.alert('提示', '[' + rec.get('text')
							+ ']模块尚有下级节点,不能删除!');
				} else {
					Ext.Msg.confirm('提示',
							'你确信要删除[' + rec.get('text') + ']模块吗?', function fn(
									id) {
								if (id == Ext.Msg.buttonIds[1]) {
									if(rec.get('parentId')!=0){
									var pid=rec.get('parentId');
									var node=me.treeStore.getNodeById(pid);
									var ppid=node.get('parentId');
									Ext.Ajax.request({
										url : 'common/Modules.do?method=getCountByPId',
										params : {
											node :node.get('id')
										},
										success:function(resp){
											var count= Ext.decode(resp.responseText);
											if(count<0){
												var leafChange=true;
											
												me.changeStore.load({
													params:{
														node:ppid
													},
													callback:function(mgRecs,opra,success){
														        me.gridStore.remove(rec);
														       
														        me.changeStore.findRecord('id',pid).set('leaf',srm.Const.YESNO_TYPE_YES);
																me.changeStore.sync();
																me.gridStore.sync({success:function(){
																    me.doReloadNode(rec.get('parentId'),leafChange);
																}});				
																
														}
												});
											}
										}
									});
								}
								me.gridStore.remove(rec);
								me.gridStore.sync({success:function(){
								me.doReloadNode(rec.get('parentId'),leafChange);
								}});				
							}
						});
				}
			}
		});
		
	},
	doReloadNode : function(pid,changeLeaf) {
		var tarNode;
		if (pid) {
			// 先获得被选择节点id
			var selId = null;
			var selModel = this.getModuleTree().getSelectionModel();
			if (selModel.hasSelection()) {
				selId = selModel.getSelection()[0].get('id');
			}
			 tarNode = pid == 0 ? this.treeStore.getRootNode()
					: this.treeStore.getNodeById(pid);
			// 重新加载模块树的节点
			if(changeLeaf){
				tarNode=tarNode.parentNode;
			}
			this.treeStore.load({
				node : tarNode,
				scope : this,
				callback : function() {
					// 重新设定选择节点
					if (!(Ext.isEmpty(selId) || selId == 0)) {
						var selNode = selId == 0 ? this.treeStore.getRootNode()
								: this.treeStore.getNodeById(selId);
						if (selNode)
							this.getModuleTree().selectPath(selNode.getPath());
					}
					
				}
			});
			
		}
	},
	//树的右键菜单事件
	onModuleTreeItemContextMenu:function(view,node,item,idx,e,eOpts){
		var me=this;
		var contextMenu=Ext.create('Ext.menu.Menu',{
			itemId:'ModuleTreeItemContextMenu',
			floating: true,
			plain: true,
			items:[
			       {
			    	text:'复制',
			    	disabled:true,
			    	itemId:'module_men',
			    	handler:function(){
			    		var cc=function(n){
			    			var model=Ext.create('srm.module.model.Module');
			    			srm.Util.applyForDest(model.data,node.data);
			    			model.set('id',0);
			    			model.set('text',model.get('text')+'_拷贝');
			    			model.set('create_dt',null);
			    			model.set('modify_dt',null);
			    			me.gridStore.copyModule =model;
			    		};
			    		cc(node);
			    	}
			       },
			       {
			    	text:'粘贴' ,
			    	disabled:true,
			    	itemId:'module_paste',
			    	handler:function(){
			    		if(me.gridStore.copyModule){
			    			var changeLeaf=false;
				    		if(node.isLeaf()){
				    			var model=me.gridStore.findRecord('id',node.get('id'),0,false,false,true);
				    	        model.set('leaf',srm.Const.YESNO_TYPE_NO);
				    	        changeLeaf=true;
				    		}
				    		if(me.gridStore.copyModule){
				    			me.gridStore.copyModule.set('parentId',node.get('id'));
				    			me.gridStore.copyModule.set('mod_code','');
				    			me.gridStore.add(me.gridStore.copyModule);
				    			me.gridStore.sync();
				    			Ext.create('Ext.util.DelayedTask',function(){
				    				me.doReloadNode(me.gridStore.copyModule,changeLeaf);
				    			}).delay(200);
				    			
				    		}
			    		}
			    					    		
			    	}
			       }
			       ]
		});
		if (!this.modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_ADD]){
			contextMenu.down('#module_men').setDisabled(false);
			if(me.gridStore.copyModule){
				contextMenu.down('#module_paste').setDisabled(false);
			}
		}
		
		e.preventDefault();
		contextMenu.showAt(e.getXY());	
	},
	//模块信息菜单右键菜单事件
	onGridModuleContextMenu:function(view,record,item,idx,e,eOpts){
		var me=this;
		var contextMenu=Ext.create('Ext.menu.Menu',{
			itemId:'ModuleTreeItemContextMenu',
			floating: true,
			plain: true,
			items:[
			       {
				text:'复制',
				itemId:'module_men',
				disabled:true,
				handler:function(){
					var model=Ext.create('srm.module.model.Module');
					srm.Util.applyForDest(model.data,record.data);
					model.set('id',0);
					
					model.set('text',model.get('text')+'_拷贝');
					model.set('create_dt',null);
	    			model.set('modify_dt',null);
	    			me.gridStore.copyModule=model;
	    			
				}
			},{
				text:'粘贴',
				itemId:'module_paste',
				disabled:true,
				handler:function(){
					if(me.gridStore.copyModule){
						var changeLeaf=false;
						if(record.get('leaf')==srm.Const.YESNO_TYPE_YES){
					    	changeLeaf=true;
					    	record.set('leaf',srm.Const.YESNO_TYPE_NO);
					    	
					    }
						//此处将getModuleTree改为getModuleGrid
						me.gridStore.copyModule.set('parentId',me.getModuleGrid().getSelectionModel().getSelection()[0].get('id'));
					    me.gridStore.copyModule.set('mod_code','');
						me.gridStore.add(me.gridStore.copyModule);
					    me.gridStore.sync();
					    Ext.create('Ext.util.DelayedTask',function(){
					    	me.doReloadNode(me.gridStore.copyModule,changeLeaf);
					    }).delay(200);
					   
					}
					
				}
					
				
			}
			       ]
		});
		if (!this.modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_ADD]){
			contextMenu.down('#module_men').setDisabled(false);
			if(me.gridStore.copyModule){
				contextMenu.down('#module_paste').setDisabled(false);
			}
			
		}
		e.preventDefault();
		contextMenu.showAt(e.getXY());	
	}
});
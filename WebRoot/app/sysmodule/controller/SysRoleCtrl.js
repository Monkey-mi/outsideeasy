Ext.define('srm.sysmodule.controller.SysRoleCtrl', {
	extend : 'Ext.app.Controller',
	requires : [ 
		'srm.sysmodule.store.SysFunctionClassTreeAll',
		'srm.sysmodule.store.SysRole',
		'srm.sysmodule.store.SysRoleAuthority',
		'srm.ux.PagingBar',
		'srm.util.Util',
	    'srm.def.ui.plugins.FormKeyMapper'
	],
	views : [ 'srm.sysmodule.view.MngSysRole',
			  'srm.sysmodule.view.EditSysRole'
			],
	refs : [
			{ref : 'mainView',selector : 'mngSysRole'},
			{ref : 'roleGrid',selector : 'mngSysRole #role_grid'},
			{ref : 'moduleTree',selector : 'mngSysRole #module_tree'},
			{ref : 'editSysRole',selector : 'editSysRole'}
		],
	init: function(){
		var me=this;
		if(me.isInited) return ;
		
		me.control({
			'mngSysRole':{
				beforerender:function(){
					//加载模块缺省树
					me.getModuleTree().getStore().getRootNode().expand();
				},
				afterrender:function(cmp){
					var me = this;
					me.mainview=cmp;
					me.sysroleStore =cmp.sysroleStore;
					me.treestore=cmp.treestore;
					//角色与业务分类关联表
			    	me.sysRoleAuthorityStore=cmp.sysRoleAuthorityStore;
			    	//角色与页面关联表
			    	me.sysRolePageStore=cmp.sysRolePageStore;
			    	//角色与功能关联表
			    	me.sysRolePageFuncStore=cmp.sysRolePageFuncStore;
					
					//加载角色
					me.sysroleStore.load();
				}
			},
			'mngSysRole #module_tree':{
				checkchange:me.dotreeSelect
			},
			'mngSysRole #role_grid':{
				//选中角色列表时
				select:me.onRoleSelect
			},
			'mngSysRole #role_grid button':{
				//响应角色信息窗口增、删、改按钮事件
				click: me.onMngWinBtnClick
			},
			'editSysRole button':{
				click:me.onEditSysRole
			}
		});
		//controller初始化完成
		this.isInited = true;
	},
	onRoleSelect:function(roleSelModel,roleRec,idx,eOpts){
		var me = this;
//		me.modelId=0;
		var moduleTree=me.getModuleTree();
		moduleTree.enable();
		Ext.suspendLayouts();
		me.treestore.getRootNode().cascadeBy(function(n){
			n.set('checked',false);
			n.commit();
		});
		Ext.resumeLayouts(true); 
		
		//处理业务分类授权
		//这个查找并勾选
		me.sysRoleAuthorityStore.load(
			{
				params:{ role_id : roleRec.get('role_id')},
				callback:function(rmRecs,opra,success){
					Ext.suspendLayouts();
					if(rmRecs.length>0){
						var root=moduleTree.getRootNode();
						root.set('checked',true);
					}
					Ext.each(rmRecs,function(rmRec){
						var node = me.treestore.getNodeById(rmRec.get('class_id'));
						if(node){
							node.set('checked',true);
							node.commit();
						}
					});
					Ext.resumeLayouts(true); 
				}
			}
		);
		//处理页面授权
		me.sysRolePageStore.load({
			params:{role_id:roleRec.get('role_id')},
			callback:function(rpRecs,opra,success){
				Ext.suspendLayouts();
				Ext.each(rpRecs,function(rpRec){
					var node=me.treestore.getNodeById(rpRec.get('authority_id')*1000+rpRec.get('authority_id'));
					if(node)
					{
						node.set('checked',true);
							node.commit();
					}
				});
				Ext.resumeLayouts(true); 
			}
		});
		//处理页面功能授权
		me.sysRolePageFuncStore.load({
			params:{role_id:roleRec.get('role_id')},
			callback:function(rfRecs,opra,success){
				Ext.suspendLayouts();
				Ext.each(rfRecs,function(rfRec){
					var node=me.treestore.getNodeById(rfRec.get('f_id')*1000000+rfRec.get('f_id'));
					if(node)
					{
						node.set('checked',true);
							node.commit();
					}
				});
				Ext.resumeLayouts(true); 
			}
		});
    },
	//响应角色信息窗口增、删、改按钮事件
	onMngWinBtnClick: function(btn){
		var me=this;
		switch(btn.action){
			case 'ACT_ADD':
			case 'ACT_EDIT':
				me.doEditRole(btn.action);
				break;
			case 'ACT_DELETE':
				me.doDelRole();
				break;
			case 'btn_AuditPass':
				me.doAuditPass();
				break;
			case 'btn_AuditUnPass':
				me.doAuditUnPass();
				break;
			case 'ACT_REFRESH':
				me.sysroleStore.reload();
				break;
			case 'ACT_SAVE':
				me.doSaveRoleAuth();
				break;
		}
	},
	doEditRole: function(type){
		var me=this;
		var rec;
		var isAdd=false,isEdit=false;
		if(type=="ACT_ADD"){
			rec=Ext.create('srm.sysmodule.model.SysRole');
			isAdd=true;
		}else if(type=="ACT_EDIT"){
			var selModel = me.getRoleGrid().getSelectionModel();
			if(!selModel.hasSelection()){
				Ext.Msg.alert('提示','请选择一条数据!');
				return;
			}
			rec =selModel.getSelection()[0];
			isEdit=true;
		}else{
			Ext.Msg.alert('提示','按钮代码异常');
			return;
		}
		var edtWin = Ext.widget('editSysRole',{
			itemId:'editSysRole',
			isAdd:isAdd,
			isEdit:isEdit
			});
		edtWin.loadData(rec);
		edtWin.show();
	},
	doDelRole: function(){
		var me = this;
		var selModel = me.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		if(rec.get('role_type')==0){
			Ext.Msg.alert('提示','不能删除超级用户角色['+rec.get('role_name')+']!');
		    return;
		}
		if(rec.get('role_type')==1||rec.get('role_type')==2||rec.get('role_type')==3){
			Ext.Msg.alert('提示','不能删除基础角色['+rec.get('role_name')+']!');
		    return;
		}
		if(me.sysRoleAuthorityStore.getCount()>0){
			Ext.Msg.alert('提示','已关联业务类别');
			return;
		}
		Ext.Msg.confirm('提示','你确信要删除角色['+rec.get('role_name')+']吗?',function fn(btn){
			if (btn == "yes") {	
				me.sysroleStore.remove(rec);
				me.sysroleStore.sync();
			}
			me.getModuleTree().setDisabled(true);
		});
	},
	doAuditPass: function(){
		var me = this;
		var selModel = me.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		if(rec.get('is_enable')==0){
			Ext.Msg.alert('提示','角色['+rec.get('role_name')+']已经启用!');
		    return;
		}
		Ext.Msg.confirm('提示','你确信要启用角色['+rec.get('role_name')+']吗?',function fn(btn){
			if (btn == "yes") {	
				srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateRoleStatus',{
					is_enable:0,
					role_id:rec.get('role_id')
				});
				me.sysroleStore.reload();
			}
		});
	},
	doAuditUnPass: function(){
		var me = this;
		var selModel = me.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		if(rec.get('role_type')==0||rec.get('role_type')==1||rec.get('role_type')==2||rec.get('role_type')==3){
			Ext.Msg.alert('提示','不能禁用基础角色['+rec.get('role_name')+']!');
		    return;
		}
		if(rec.get('is_enable')==1){
			Ext.Msg.alert('提示','角色['+rec.get('role_name')+']已被禁用!');
		    return;
		}
		Ext.Msg.confirm('提示','你确信要禁用角色['+rec.get('role_name')+']吗?',function fn(btn){
			if (btn == "yes") {	
				srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateRoleStatus',{
					is_enable:1,
					role_id:rec.get('role_id')
				});
				me.sysroleStore.reload();
			}
		});
	},
	onEditSysRole: function(btn){
		var me = this;
		var editView=me.getEditSysRole();
		var form=editView.down('form');
		switch(btn.itemId){
			case "SAVE":
				var rec=form.getRecord();	
				//验证数据
				var values=form.getValues();
				var result=srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=checkrole_name',{
						role_id:rec.get('role_id'),
						role_name:values.role_name
				});
				result=Ext.decode(result);  
				if(result.status==false){					
					Ext.Msg.alert('提示',"该名称已存在");
					return false;
				}
				//保存数据
				
				form.updateRecord(rec);
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(me.sysroleStore.indexOf(rec) >= 0&&rec.get('role_id')>0){
						me.sysroleStore.sync({
								success : function(e, batch) {
									
									editView.close();
									me.sysroleStore.load();
								}
							});
						
						Ext.Msg.alert('提示','保存成功');
					}else{
						rec.phantom =true;//表示新增
						me.sysroleStore.add(rec);
		    			me.sysroleStore.sync(
							{
								success : function(e, batch) {
									 editView.close();
									 me.sysroleStore.load();
								}
							}
						);
						Ext.Msg.alert('提示','保存成功');
					}	
				}
				break;
			case "CLOSE":
				editView.close();
				break;
		}
	},
	//勾选一个节点的复选框，触发的操作
	dotreeSelect:function(model,checked,eopt){
		var me=this;
		var roleSelModel =me.getRoleGrid().getSelectionModel();
		var select=function(model,checked){
				var roleRec = roleSelModel.getSelection()[0];
				//如果选中某个节点，则它上面的节点 都选中
				if (checked == true) {
					model.checked = checked;
				    //获得父节点
				    var pNode = model.parentNode;
					   //当checked == true通过循环将所有父节点选中
				    while(pNode != null ){
					    if(!pNode.get('checked')){
					    	 if(!pNode.isRoot()){
					    	 	//当前父级节点是页面授权节点
					    		if(pNode.get('id')>1000)
					    	 	{
						    		me.sysRolePageStore.add(Ext.create('srm.sysmodule.model.SysRolePage',{
							    		role_id:roleRec.get('role_id'),
							    		authority_id:pNode.get('id')%1000
						    		   }
						    		));
					    	 	}
					    	 	//当前父级节点是业务分类节点
					    	 	else
					    	 	{
					    	 		me.sysRoleAuthorityStore.add(Ext.create('srm.sysmodule.model.SysRoleAuthority',{
							    		role_id:roleRec.get('role_id'),
							    		class_id:pNode.get('id')
						    		   }
						    		));
					    	 	}
					    	 }
					    	pNode.set("checked",true);
					    	
					    }
				    	pNode = pNode.parentNode;
				    }
				}
				
				if (!model.isLeaf()){//不是叶子
			    	model.cascadeBy(function(n){
				   		  n.set('checked', checked);
				    	  if(checked){
				    	  	if(!n.isRoot()){
				    	  		//子级是业务分类
				    	  		if(n.get('id')<1000)
				    	  		{
						    		  me.sysRoleAuthorityStore.add(Ext.create('srm.sysmodule.model.SysRoleAuthority',{
						    			  role_id:roleRec.get('role_id'),
								    	  class_id:n.get('id') 
						    		  }));
				    	  		}
				    	  		//子级是页面
				    	  		else if(n.get('id')>1000&&n.get('id')<1000000)
				    	  		{
				    	  			me.sysRolePageStore.add(Ext.create('srm.sysmodule.model.SysRolePage',{
						    			  role_id:roleRec.get('role_id'),
								    	  authority_id:n.get('id')%1000
						    		  }));
				    	  		}
				    	  		//子级是页面功能
				    	  		else
				    	  		{
				    	  			me.sysRolePageFuncStore.add(Ext.create('srm.sysmodule.model.SysRolePageFunc',{
						    			  role_id:roleRec.get('role_id'),
								    	  f_id:n.get('id')%1000000
						    		  }));
				    	  		}
				    		  }
				    	  }else{  
				    	  	  if(!n.isRoot()){
					    	  	  	//子级是业务分类
					    	  		if(n.get('id')<1000)
					    	  		{
					    		  	 var rec=me.sysRoleAuthorityStore.findRecord('class_id',n.get('id'),0,false,false,true);
					    		 	 me.sysRoleAuthorityStore.remove(rec);
					    	  		}
					    	  		//子级是页面
					    	  		else if(n.get('id')>1000&&n.get('id')<1000000)
					    	  		{
					    	  			var rec=me.sysRolePageStore.findRecord('authority_id',n.get('id')%1000,0,false,false,true);
					    		 	 	me.sysRolePageStore.remove(rec);
					    	  		}
					    	  		//子级是页面功能
					    	  		else{
					    	  			var rec=me.sysRolePageFuncStore.findRecord('f_id',n.get('id')%1000000,0,false,false,true);
					    		 	 	me.sysRolePageFuncStore.remove(rec);
					    	  		}
				    		  }  
				    	  }
			    	});
			    }else{//当前节点本身为叶子节点，没有子节点
			    	if(checked){
			    	   if(!model.isRoot()){
			    	   		//子级是业务分类
					    	if(model.get('id')<1000)
					    	{
				    		  me.sysRoleAuthorityStore.add(Ext.create('srm.sysmodule.model.SysRoleAuthority',{
				    			  role_id:roleRec.get('role_id'),
						    	  class_id:model.get('id') 
				    		  }));
					    	}
					    	//子级是页面
					    	else if(model.get('id')>1000&&model.get('id')<1000000){
					    		me.sysRolePageStore.add(Ext.create('srm.sysmodule.model.SysRolePage',{
						    			  role_id:roleRec.get('role_id'),
								    	  authority_id:model.get('id')%1000
						    		  }));
					    	}
					    	//子级是页面功能
					    	else{
					    		me.sysRolePageFuncStore.add(Ext.create('srm.sysmodule.model.SysRolePageFunc',{
						    			  role_id:roleRec.get('role_id'),
								    	  f_id:model.get('id')%1000000
						    		  }));
					    	} 		
				    	}
			    	 }else{
			    	 	if( !model.isRoot()){
			    	 		//子级是业务分类
					    	if(model.get('id')<1000)
					    	{
				    		  var rec=me.sysRoleAuthorityStore.findRecord('class_id',model.get('id'),0,false,false,true);
				    		  me.sysRoleAuthorityStore.remove(rec);
					    	}
					    	//子级是页面
					    	else if(model.get('id')>1000&&model.get('id')<1000000){
					    		var rec=me.sysRolePageStore.findRecord('authority_id',model.get('id')%1000,0,false,false,true);
					    		me.sysRolePageStore.remove(rec);
					    	}
					    	//子级是页面功能
					    	else{
					    		var rec=me.sysRolePageFuncStore.findRecord('f_id',model.get('id')%1000000,0,false,false,true);
					    		me.sysRolePageFuncStore.remove(rec);
					    	}
				    	} 
			    	 }
			    }
				 
		 };
		 select(model,checked);  
	},
	doSaveRoleAuth: function(){
		var me=this;
		var roleSelModel =me.getRoleGrid().getSelectionModel();
		if(!roleSelModel.hasSelection()){
			Ext.Msg.alert("提示","请先选中一个角色");
			return;
		}
		var roleRec = roleSelModel.getSelection()[0];
		me.sysRoleAuthorityStore.sync();
		me.sysRolePageStore.sync();
		me.sysRolePageFuncStore.sync();
		if(roleRec.get("role_id")==4){
			var result=srm.Const.callServiceMethodSync('sysmodule/sysRole.do?method=updateSysFilter',{
			});
		}
		Ext.Msg.alert("提示","授权成功");
	}
});
Ext.define('srm.role.controller.Role',{
	extend: 'Ext.app.Controller',
	requires: ['srm.def.Const',
	           'srm.util.Util',
	           'srm.role.store.RoleModules',
	           'srm.role.store.RoleFuncs',
	           'srm.user.store.UserRoles',
	           'srm.module.store.Functions'
	           ],
	views: [
			'srm.role.view.MngRole'
	        ,'srm.role.view.EditRole'
	        ,'srm.role.view.UserWin'
	        ],
    refs: [
	       {ref:'mainview',selector:'mng_Role'},
	       {ref:'RoleGrid',selector:'mng_Role #role_grid'},
	       {ref:'edtRole',selector:'edt_Role'},
	       {ref:'ModuleTree',selector:'mng_Role #module_tree'},
	       {ref:'userWin',selector:'sel_user_for_role_win'}
	      ],
	//moduleId:0,
	init: function(){
		//controller只初始化一次
		if(this.isInited) return ;
		this.control({
			'mng_Role':{
				beforerender:function(){
					//加载模块缺省树
					this.getModuleTree().getStore().getRootNode().expand();
				},
				afterrender:function(){
					var me = this;
					me.mainview=me.getMainview();
					//加载角色
					this.rolegridStore = this.getRoleGrid().getStore();
					this.gridLoad();
					this.moduleStore = this.getModuleTree().getStore();
					//角色模块
					this.roleModuleStore = Ext.create('srm.role.store.RoleModules');
					//角色功能
					this.roleFuncStore = Ext.create('srm.role.store.RoleFuncs');
					//角色服务相关
					me.userRoleStore=me.mainview.userRoleStore;
					
				}
			},
			'mng_Role #module_tree':{
				checkchange:this.doModuleSelect
			},
			'mng_Role #role_grid':{
				//双击角色列表时，打开角色信息维护窗口
				itemdblclick: this.onGridItemdbclik,
				//选中角色列表时
				select:this.onRoleSelect
			},
			'mng_Role button':{
				//响应角色信息窗口增、删、改按钮事件
				click: this.onMngWinBtnClick
			},
			'edt_Role button':{
				//响应角色信息维护窗口按钮事件
				click: this.onEdtWinBtnClick
			},
			//响应服务选择事件
			'mng_Role #private_service_grid':{
				selectionchange:this.selectPrivateService
			},
			'sel_user_for_role_win button':{
				click:this.doAddUserRoleRef
			}
		});
		//controller初始化完成
		this.isInited = true;
	},
	onRoleSelect:function(roleSelModel,roleRec,idx,eOpts){
		var me = this;
		this.modelId=0;
		me.getModuleTree().enable();
		Ext.suspendLayouts();
		me.moduleStore.getRootNode().cascadeBy(function(n){
			n.set('checked',false);
			n.commit();
		});
		Ext.resumeLayouts(true); 
		
		//处理模块授权
		//这个查找并勾选
		this.roleModuleStore.load(
			{
				params:{ role_id : roleRec.get('role_id')},
				callback:function(rmRecs,opra,success){
					Ext.suspendLayouts();
					if(rmRecs.length>0){
						var root=me.getModuleTree().getRootNode();
						root.set('checked',true);
					}
					Ext.each(rmRecs,function(rmRec){
						var node = me.moduleStore.getNodeById(rmRec.get('mod_id'));
						if(node){
							node.set('checked',true);
							node.commit();
						}
					});
					Ext.resumeLayouts(true); 
				}
			}
		);
		//处理功能授权
		this.roleFuncStore.load(
			{
				params:{role_id:roleRec.get('role_id')},
				callback:function(rfRecs,opra,success){
					Ext.suspendLayouts();
					Ext.each(rfRecs,function(rfRec){
						var node = me.moduleStore.getNodeById(rfRec.get('f_id')*1000000+rfRec.get('f_id'));
						if(node){
							node.set('checked',true);
							node.commit();
						}
					});
					Ext.resumeLayouts(true); 
				}
			}
		);
    },
	//双击角色信息列表时，打开角色信息维护窗口
	onGridItemdbclik: function(view, rec){
		this.doEditRole(false);
		
	},
	//响应角色信息窗口增、删、改按钮事件
	onMngWinBtnClick: function(btn,event){
		var me=this;
		switch(btn.action){
			case 'ACT_ADD':
				this.doAddRole();
				break;
			case 'ACT_EDIT':
				this.doEditRole(true);
				break;
			case 'ACT_DELETE':
				this.doDelRole();
				break;
			case 'ACT_SAVE':
				this.doSaveRoleAuth();
				break;
			case 'ACT_REFRESH':
				this.gridLoad();
				break;
			case 'ACT_AddUser':
				this.doAddUser();
				break;
			case 'ACT_DELUser':
				me.doDelUser();
				break;
		}
	},
	//响应角色信息维护窗口按钮事件
	onEdtWinBtnClick: function(btn,event){
		var me=this;
		var rec=me.getRoleGrid().getSelectionModel().getSelection()[0];
		var edtWin = btn.up('edt_Role');
		switch(btn.action){
			case 'ACT_SAVE':
				this.doSaveRoleUser(edtWin);
				break;
			case 'ACT_CLOSE':
				edtWin.close();
				break;
			case srm.Const.FUNC_ITEMID_BTN_ADD:
				this.addRoleCon(edtWin);
				break;
			case srm.Const.FUNC_ITEMID_BTN_DEL:
				this.delRoleCon(edtWin);
				break;
			case srm.Const.FUNC_ITEMID_BTN_REFRESH:
				edtWin.down('mng_rolecon').store.load({
					params:{
						role_id:rec.get('role_id')
					}
				});
				break;
		}
		
	},
	doAddRole: function(){
		var rec=Ext.create('srm.role.model.Role',{
			ou_code:srm.Util.currentUser.defaultOrg[0].ou_code,
			creator:srm.Util.currentUser.loginId});
		var edtWin = Ext.widget('edt_Role',{isAddNew:true,isEdit:true});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
	},
	doEditRole: function(isEdit){
		var me=this;
		var selModel = this.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('edt_Role',{
			isAddNew:false,
			isEdit:isEdit,
			role:rec
			});
		edtWin.down('form').loadRecord(rec);
		edtWin.doInit();
		edtWin.show();
	},
	doDelRole: function(){
		//删除前需要做一些逻辑检查
		var me = this;
		var selModel = me.getRoleGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		if(rec.get('role_name')==srm.Const.SUPER_ROLE){
			Ext.Msg.alert('提示','不能删除超级用户角色['+rec.get('role_name')+']!');
		    return;
		}
		Ext.Msg.confirm('提示','你确信要删除角色['+rec.get('role_name')+']吗?',
		     	function fn(id){
					if(id==Ext.Msg.buttonIds[1]){
						// TODO 删除前需要检查一下该角色是否已经被授权使用(user_role)
						// 目前还没有实现 2013-11-28 by mmc
						me.rolegridStore.remove(rec);
						me.rolegridStore.sync();
					}
					me.getModuleTree().setDisabled(true);
		});
	},
	doSaveRole: function(rec){
		var me = this;
		if(me.getEdtRole().isAddNew)
			me.rolegridStore.add(rec);
		this.rolegridStore.sync({
            success:function(batch,options){
            	me.rolegridStore.reload();
                me.rolegridStore.sort();
                Ext.Msg.alert('提示','保存成功!');
            },
            failure:function(batch,options){
                Ext.Msg.alert('保存失败!');
            }
        });
	},
	doSaveRoleAuth: function(){
		var me=this;
		var roleSelModel =this.getRoleGrid().getSelectionModel();
		var roleRec = roleSelModel.getSelection()[0];
		if(roleSelModel.hasSelection()){
			try{
				this.roleModuleStore.sync();
				this.roleFuncStore.sync();
				Ext.Msg.alert("提示","保存成功");
			}catch(err){
				Ext.Msg.alert(err);
			}
		}	
		
	},
	doModuleSelect:function(model,checked,eopt){
		var me=this;
		

		var roleSelModel =this.getRoleGrid().getSelectionModel();
		
		var select=function(model,checked){
				var roleRec = roleSelModel.getSelection()[0];
				if (checked == true) {

					model.checked = checked;
				    //获得父节点
				    pNode = model.parentNode;
					   //当checked == true通过循环将所有父节点选中
				    while(pNode != null ){
					    if(!pNode.get('checked')){
					    	 if(!pNode.isRoot()){
					    		me.roleModuleStore.add(Ext.create('srm.role.model.RoleModule',{
						    		role_id:roleRec.get('role_id'),
						    		mod_id:pNode.get('id')
					    		   }
					    		));
					    		
					    	 }
					    	pNode.set("checked",true);
					    	
					    }
				    	pNode = pNode.parentNode;
				    }
				    
				}
				
				if (!model.isLeaf()){
			    
			    	model.cascadeBy(function(n){
				    n.set('checked', checked);
				    
				    	  if(checked){
				    	  	
				    		 if(n.get('id') <1000000 && !n.isRoot()){
				    		  me.roleModuleStore.add(Ext.create('srm.role.model.RoleModule',{
				    			  role_id:roleRec.get('role_id'),
						    	  mod_id:n.get('id') 
				    		  }));}
				    		 else if(n.get('id')>1000000){
				    		 	
				    			 me.roleFuncStore.add(Ext.create('srm.role.model.RoleFunc',{
				    				 role_id:roleRec.get('role_id'),
				    				 f_id:n.get('id')%1000000
				    			 }));
				    			
				    		 }
				    	  }else{  
				    	  	
				    		  if(n.get('id')<1000000 && !n.isRoot()){
				    		  var rec=me.roleModuleStore.findRecord('mod_id',n.get('id'),0,false,false,true);
				    		  me.roleModuleStore.remove(rec);
				    		  
				    		  }
				    		  else if(n.get('id')>1000000){
				    			  var rec=me.roleFuncStore.find('f_id',n.get('id')%1000000,0,false,false,true);
				    			  me.roleFuncStore.removeAt(rec);
				    		  }  
				    	  }
			    });
			    }
			    //当前节点本身为叶子节点，没有子节点
			    else{
			    	
			    	 if(checked){
			    	 
			    		 if(model.get('id') <1000000 && !n.isRoot()){
				    		  me.roleModuleStore.add(Ext.create('srm.role.model.RoleModule',{
				    			  role_id:roleRec.get('role_id'),
						    	  mod_id:model.get('id') 
				    		  }));}
				    		 else if(model.get('id')>1000000){
				    		 	
				    			 me.roleFuncStore.add(Ext.create('srm.role.model.RoleFunc',{
				    				 role_id:roleRec.get('role_id'),
				    				 f_id:model.get('id')%1000000
				    			 }));
				    			 
				    		 }
			    	 }else{
			    	 
			    		 if(model.get('id')<1000000 && !n.isRoot()){
				    		  var rec=me.roleModuleStore.findRecord('mod_id',model.get('id'),0,false,false,true);
				    		  me.roleModuleStore.remove(rec);
				    		  }
				    		  else if(model.get('id')>1000000){
				    			  var rec=me.roleFuncStore.find('f_id',model.get('id')%1000000,0,false,false,true);
				    			  me.roleFuncStore.removeAt(rec);
				    		  }  
			    	 }
			    }
				 
		 };
		 select(model,checked);  
	},
	doSaveRoleUser:function(edtWin){
		var me=this;
		var edtForm = edtWin.down('form');
		if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
			var rec = edtForm.getRecord();
			edtForm.updateRecord(rec);
			if(edtWin.isAddNew){
				
			}else{
			    edtWin.doSave();
			}
			this.doSaveRole(rec);
			edtWin.close();
		}
	},
	gridLoad:function(){
		var me=this;
		me.rolegridStore.load();
		/*var recs=[];
		var params={creator:srm.Util.currentUser.loginId};
		Ext.each(srm.Util.currentUser.roleList,function(role){
			if(role.role_name=="admin"){
				for(var item in params){
					delete params[item.toString()];
				}
			}else{
				var rec=Ext.create('srm.user.model.Role',role);
				recs.push(rec);
			}
		});
		me.rolegridStore.load({
			params:params,
			callback:function(){
				if(recs.length>0){
					if(srm.Util.currentUser.roleList[0]!="admin"){
						Ext.each(recs,function(rec){
							if(!me.rolegridStore.findRecord('role_id',rec.get('role_id'),0,false,false,true)){
								me.rolegridStore.loadData(rec,true);
							}
						});
						
					}
					
					me.rolegridStore.sync();
				}
			}
		});
		me.rolegridStore.proxy.extraParams=params;*/
	},
	addRoleCon:function(editWin){
		var me=this;
		var edtWin=editWin;
		edtWin.down('mng_rolecon').addModel();
	},
	delRoleCon:function(editWin){
	   var me=this;
	   var roleCon=editWin.down('mng_rolecon');
	   roleCon.delModel();
	},
	/*,
	traverseTree:function(node){
		node.set('checked',false);
		node.commit();
		if(node.isLeaf()){
			//如果是叶节点，那么加载功能
			var fStore = Ext.create('srm.setup.store.Functions');
			fStore.load({params:{mod_id:node.get('id')},callback:function(funcRecs){
				Ext.each(funcRecs,function(funcRec){
					var child = node.appendChild({
						id:+funcRec.get('f_id')+'_'+funcRec.get('f_id'),
						parentId:node.get('id'),
						text:funcRec.get('name'),
						checked:false,
						leaf:true,
						f_id:funcRec.get('f_id')
					});
					child.commit();
				});
				if(funcRecs.length>0){
					node.set('leaf',false);
					node.expand(true);
				}
			}});
		}
	}*/
	//只添加第一层关联
	doAddUser:function(){
		var me=this;
		var win=Ext.widget('sel_user_for_role_win',{
			itemId:'sel_user_for_role_win'
		});
		win.show();
	},
	doAddUserRoleRef:function(btn){
		var me=this;
		switch(btn.itemId){
			case 'ACT_SAVE':
				var win=me.getUserWin();
				var rolegrid=me.getRoleGrid();
				var rolerecs=rolegrid.getSelectionModel().getSelection();
				if(rolerecs.length!=1){
					Ext.Msg.alert('提示','请选择一个角色');
                    return ;
				}
				var grid=win.down('#userinfo_grid');
				var recs=grid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择用户');
                    return ;
				}
				var role_id=rolerecs[0].get('role_id');
				var extst_recs=me.userRoleStore.getRange();
				
				for(var i=0;i<recs.length;i++){
					var flag=false;//默认不存在
					for(var j=0;j<extst_recs.length;j++){
						
						if(extst_recs[j].get('u_id')==recs[i].get('u_id')){
							flag=true;
							break;
						}
					}
					if(!flag){//不存在，则添加
						var newrec=Ext.create('srm.user.model.UserRole',{
							role_id:role_id,
							u_id:recs[i].get('u_id')
						});
						me.userRoleStore.add(newrec);
					}else{
						Ext.Msg.alert('提示',recs[i].get('name')+'已经添加');
                    	return ;
					}
				}
				me.userRoleStore.sync({
					success: function(batch,options) {	
						me.userRoleStore.reload();
					}
				});
				break;
		}
	},
	//只删除第一层关联
	doDelUser:function(){
		var me=this;
		
		var ref_recs=me.mainview.down('#user_grid').getSelectionModel().getSelection();
		if(ref_recs.length==0){
			Ext.Msg.alert('提示','请选择要删除的关联项');
            return ;
		}
		me.userRoleStore.remove(ref_recs);
		me.userRoleStore.sync({
			success: function(batch,options) {	
				me.userRoleStore.reload();
			}
		});
	}
});
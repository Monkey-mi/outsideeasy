/**
 * 用户角色关系界面
 */
Ext.define('srm.user.userctr.MngUserRole',{
    extend:'srm.ux.Panel',
    alias:'widget.user_role',
    layout:{
     type: 'hbox',
     pack: 'start',
     align: 'stretch'
    },
    ou_id:null,
    height: 300,
    userOrg:null,
    padding:2,
    title:'角色授权',
    currentUser:null,
    userinfoPromise:null,
    doInit:function(){
	    var me=this;
	    if(!me.disabled){
		    if(me.SelectedStore.getRange()==0&&me.unSelectStore.getRange().length==0){
		       me.SelectedStore.load({
		          params:{
		          u_id:me.currentUser.get('u_id')
		          },
		          callback:function(recs){
		          	me.roleReset();
		          }
		       });
		    }else{
		    	me.roleReset();
		    }
	    }
    },
    roleReset:function(){
        var me=this;
        //提取可供授权的角色
        me.roleStore = srm.DataUtil.getStoreByStoreManager(srm.DataConst.ROLE);
        Ext.Ajax.request({
           url:'user/Users.do?method=getCanChooseRoleList',
           async:false,
           params:{
              u_id : me.currentUser.get('u_id'),
              ou_id : me.ou_id
           },
           method:'post',
           success:function(resp){
             var textObj=Ext.decode(resp.responseText);
             me.roleStore.loadData(textObj.data);
           }
        });
        
        me.unSelectStore.remove(me.unSelectStore.getRange());
//        me.SelectedStore.clearFilter();
//        me.SelectedStore.filter({
//          property:'ou_id',value:me.ou_id
//        });
        Ext.each(me.roleStore.getRange(),function(rec){
         if(me.SelectedStore.find('role_id',rec.get('role_id'),0,false,false,true)<0){
         	me.unSelectStore.add(Ext.create('srm.user.model.UserRole',{
              u_id:me.currentUser.get('u_id'),
           	  role_id:rec.get('role_id'),
           	  ou_id:me.ou_id
           }));
         }
        });
    },
    initComponent:function(){
    	var me=this;
    	me.unSelectStore=Ext.create('srm.user.store.UserRoles');
    	me.SelectedStore=Ext.create('srm.user.store.UserRoles');
    	//提取所有角色，用来显示名称
        me.allRoles = srm.DataUtil.getStoreByStoreManager(srm.DataConst.ROLE);//srm.role.store.Roles
        me.allRoles.load();
    	Ext.apply(me,{
    	items:[
    	{
    		xtype:'grid',
    		itemId:'Selected',
    		store:me.SelectedStore,
    		flex:1,
    		columns:[
    		{
    			text:'已授权角色',
    			dataIndex:'role_id',
    			flex:1,
    			renderer:function(v){
    				if(me.allRoles){
        				var rec=me.allRoles.findRecord("role_id",v,0,false,false,true);
        				return rec?rec.get('role_desc'):v;
    				}else
    				    return v;
    			}
    		}]
    	},
    	{
    		width:40,
    	    layout: {
              type:'vbox',
              pack:'center',
              align:'center'
            },
            hidden:!me.isEdit,
            defaults:{
              width:25,
              scope:me,
	          handler:me.selBtnClick,
	          style:'margin:2px',
	          padding:2
            },
    		border:0,
    		items:[
    		{xtype:'button',text:'<',action:'act_left'},
	        {xtype:'button',text:'>',action:'act_right'},
            {xtype:'button',text:'<<',action:'act_left_all'},
    		{xtype:'button',text:'>>',action:'act_right_all'}
            ]
    	},
    	{
    		xtype:'grid',
    		itemId:'unSelect',
    		store:me.unSelectStore,
    		hidden:!me.isEdit,
    		flex:1,
    		columns:[
    		{
    			text:'可授权角色',
    			dataIndex:'role_id',
    			flex:1,
    			renderer:function(v){
    				if(me.allRoles){
        				var rec=me.allRoles.findRecord("role_id",v,0,false,false,true);
        				return rec?rec.get('role_desc'):v;
    				}
    			}
    		}]
    	}
    	]
    	});
    	me.callParent(arguments); 
    },
    selBtnClick:function(btn){
    	var me=this;
    	switch(btn.action){
    		case 'act_right':
    		me.doDelOne();
    		break;
    		case 'act_left':
    		me.doAddOne();
    		break;
    		case 'act_right_all':
    		me.doDelAll();
    		break;
    		case 'act_left_all':
    		me.doAddAll();
    		break;
    	}
    },
    /**
     *单个向右移
     */
    doAddOne:function(){
    	var me=this;
    	var selModel=me.down('#unSelect').getSelectionModel().getSelection();
    	me.SelectedStore.loadData(selModel,true);
    	me.unSelectStore.remove(selModel);
    },
    /**
     * 全部右移
     */
    doAddAll:function(){
    	var me=this;
    	var selModel=me.unSelectStore.getRange();
    	me.SelectedStore.loadData(selModel,true);
    	me.unSelectStore.remove(selModel);
    },
    /**
     * 单个左移
     */
    doDelOne:function(){
    	var me=this;
    	var selModel = me.down('#Selected').getSelectionModel();
    	if(selModel.hasSelection()){
        	var selRec=selModel.getSelection()[0];
        	if(me.roleStore.findRecord("role_id",selRec.get('role_id'),0,false,false,true)){
        		//只有在可配置范围内的才能去掉授权
            	me.unSelectStore.add(selRec);
            	me.SelectedStore.remove(selRec);
        	}
    	}
    },
    /**
     * 全部左移
     */
    doDelAll:function(){
    	var me=this;
    	var selRecs=me.SelectedStore.getRange();
    	Ext.each(selRecs,function(selRec){
        	if(me.roleStore.findRecord("role_id",selRec.get('role_id'),0,false,false,true)){
                //只有在可配置范围内的才能去掉授权
                me.unSelectStore.add(selRec);
                me.SelectedStore.remove(selRec);
            }
    	});
    },
    /**
     * 保存权限
     */
    SaveCtr:function(u_id){
    	var me=this;
    	me.SelectedStore.clearFilter(true);
    	if(u_id){
    	   me.currentUser.set('u_id',u_id);
    	   Ext.each(me.SelectedStore.getRange(),function(rec){
    	   rec.set('u_id',u_id);
    	});
    	}else{
    	   Ext.each(me.SelectedStore.getRange(),function(rec){
    	   rec.set('u_id',me.currentUser.get('u_id'));
    	 });
    	} 
    	me.SelectedStore.sync();
    	me.SelectedStore.sort();
    	me.SelectedStore.filter({
    	 property:'ou_id',value:me.ou_id
    	});
    },
    changeOrg:function(ou_id,userOrg){
	     var me=this;
	     me.ou_id=ou_id;
	     me.userOrg=userOrg;
	     me.setDisabled(!userOrg.get('has_curd'));
	     me.doInit();
    }
});
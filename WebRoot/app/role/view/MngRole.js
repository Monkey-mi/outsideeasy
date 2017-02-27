Ext.define('srm.role.view.MngRole',{
	extend:'srm.ux.Panel',
	alias : 'widget.mng_Role',
	requires:['srm.role.store.Roles',
	          'srm.role.store.RoleModules',
	          'srm.module.store.ModuleTreeAlls',
	          'srm.ux.PagingBar'],
	title:'角色管理',
	layout:'fit',
	defaults: {
        autoScroll:true,
        containerScroll:true
    },
    initComponent:function(){
    	var me=this;
    	var roleStore=srm.DataUtil.getStoreByStoreManager(srm.DataConst.ROLE);
    	var hasAD=false;
	 	if(srm.UInfo.currentUser.isAdmin){
	 		hasAD=true;
	 	}
    	Ext.apply(roleStore.proxy.extraParams,{hasAD:hasAD});
    	me.on('beforedestroy',function(th){
			delete roleStore.proxy.extraParams.hasAD;
		});
    	var store= srm.DataUtil.getStoreByStoreManager(srm.DataConst.ORG_UNIT).load();
    	me.userRoleStore=Ext.create('srm.user.store.UserRoles');
    	Ext.apply(this,{
    		items:[
		         {
		    	   tbar: [     
  	  		            {text: '新增',action:'ACT_ADD',glyph : 0xf016,itemId:'addBtn'},
  	  		            {text: '修改',action:'ACT_EDIT',glyph : 0xf044,itemId:'edtBtn',disabled:true},
  	  		            {text: '删除',action:'ACT_DELETE',glyph : 0xf014,itemId:'delBtn',disabled:true},
  	  				    {text: '刷新',action:'ACT_REFRESH',glyph : 0xf021},
  	  				    '-',
  	  				    {text: '保存授权',action:'ACT_SAVE',glyph:0xf0d0,itemId:'saveBtn',disabled:true},
  	  				    '-',
  	  				    {text: '添加用户',action:'ACT_AddUser',glyph : 0xf044,itemId:'addUserBtn',disabled:true},
  	  				    {text: '删除用户',action:'ACT_DELUser',glyph : 0xf014,itemId:'delUserBtn',disabled:true}
  	  				    
  	  				], 
	  				layout: {type:'hbox',align:'stretch'},
	  				
	  				items:[
	  				    {
	  				    	title: '角色',
	  				    	xtype:'gridpanel',
	  				    	itemId:'role_grid',
	  				    	flex:1,
	  		  				store: roleStore,
	  						columnLines:true,
	  				        columns:[
	  							{text:'id',dataIndex: 'role_id',width:40},
	  							{text: '角色名称',dataIndex: 'role_name',flex:1},
	  							{text: '角色描述',dataIndex: 'role_desc',flex:2},
	  							{text: '所属组织',dataIndex: 'ou_code',flex:2,
	  							renderer:function(v){
	  								if (v)
	  								{
	  									var rec=store.findRecord('ou_code',v,false,false,true);
	  									return rec?rec.get('ou_name'):'';
	  								}
	  								else 
	  								return '';
	  							}
	  							},
	  							{text: '排序',dataIndex: 'order_seq',width:46}
	  		           		],
	  		           		listeners:{
	  						   selectionchange:function(selModel, selections){
	  							   	var n = selections.length||0;
	  								this.down('#delBtn').setDisabled(n==0);					
	  								this.down('#edtBtn').setDisabled(n!=1);
	  								this.down('#saveBtn').setDisabled(n==0);
	  								me.down('#addUserBtn').setDisabled(n!=1);
	  								me.down('#delUserBtn').setDisabled(n!=1);
	  								if(selections.length>0){
		  								me.userRoleStore.load({
			  								params:{
			  									role_id:selections[0].get('role_id')
			  								}
		  								});
	  								}
	  						   },
	  						   scope:this
	  					   },
	  					 dockedItems:[
									    {
										    xtype : 'pagingbar',
                                            stateId : 'd5c2e307-ae16-4015-a164-17f82626511f',
											store : roleStore,
											dock : 'bottom',
											displayInfo : true
									    }
					             ]
	  				    },{xtype:'splitter'},
	  				    {
	  				    //右边列表
	  				    	title: '功能授权',
	  				    	iconCls : 'menu', 
	  				    	xtype:'treepanel',
	  				    	store : Ext.create('srm.module.store.ModuleTreeAlls'),
	  				    	itemId : 'module_tree',
	  				    	disabled: true,
	  				    	width:280,
	  				    	border:true,
	  						useArrows:false,//是否显示小箭头  
	  					    lines:true, //节点之间虚线  
	  					    rootVisible : true
	  				    },
	  				    {xtype:'splitter'},
	  				    {
	  				    	title: '关联的用户',
							region: 'center',
							itemId:'user_grid',
							xtype:'gridpanel',
							height:300,
							width:280,
							store:me.userRoleStore,
							columnLines:true,
							defaults: {
						        autoScroll:true,
						        containerScroll:true,
						        layout: 'fit'
						    },
							columns:[
							         {header:'行号',xtype:'rownumberer',width:40,sortable:false,align:'center'},
							         {header: 'id',dataIndex: 'u_id',flex:1,hidden:true},
							         {header: '用户名',dataIndex: 'name',flex:1},
							         {header: '登陆号',dataIndex: 'login_id',flex:1}
							 ]
	  				    }
	  				    ]
		        }]
    	});
    	this.callParent(arguments); 
    }
});
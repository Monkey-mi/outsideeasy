Ext.define('srm.sysmodule.view.MngSysRole',{
	extend:'srm.ux.Panel',
	alias : 'widget.mngSysRole',

	title:'平台角色管理',
	
    initComponent:function(){
    	var me=this;
    	
    	me.sysroleStore=Ext.create('srm.sysmodule.store.SysRole');
    	Ext.apply(me.sysroleStore.proxy.extraParams,{usePaging:true});
    	me.on('beforedestroy',function(th){
//			delete me.sysroleStore.proxy.extraParams.hasAD;
		});
		me.treestore=Ext.create('srm.sysmodule.store.SysFunctionClassTreeAll');
		
    	//角色与业务分类关联表
    	me.sysRoleAuthorityStore=Ext.create('srm.sysmodule.store.SysRoleAuthority');
    	//角色与页面关联表
    	me.sysRolePageStore=Ext.create('srm.sysmodule.store.SysRolePage');
    	//角色与功能关联表
    	me.sysRolePageFuncStore=Ext.create('srm.sysmodule.store.SysRolePageFunc');
    	Ext.apply(this,{
    		layout:'fit',
			defaults: {
		        autoScroll:true,
		        containerScroll:true
		    },
    		items:[
		         {
		    	    layout: {type:'hbox',align:'stretch'},
	  				items:[
	  				    {
	  				    	title: '角色',
	  				    	xtype:'gridpanel',
	  				    	itemId:'role_grid',
	  				    	flex:1,
	  		  				store: me.sysroleStore,
	  						columnLines:true,
	  						tbar: [  
		  	  		            {text: '新增',action:'ACT_ADD',glyph : 0xf016,itemId:'addBtn'},
		  	  		            {text: '修改',action:'ACT_EDIT',glyph : 0xf044,itemId:'edtBtn',disabled:true},
		  	  		            {text: '删除',action:'ACT_DELETE',glyph : 0xf014,itemId:'delBtn',disabled:true},
		  	  		            {text:'启用',glyph:0xf0e3,action:'btn_AuditPass',itemId:'abledBtn',disabled:true},
		  	  		            {text:'禁用',glyph:0xf0e3,action:'btn_AuditUnPass',itemId:'disabledBtn',disabled:true}	,
		  	  				    {text: '刷新',action:'ACT_REFRESH',glyph : 0xf021},
		  	  				    '-',
		  	  				    {text: '保存授权',action:'ACT_SAVE',glyph:0xf0d0,itemId:'saveBtn',disabled:true}
		  	  				    
		  	  				],
	  				        columns:[
	  							{text:'id',dataIndex: 'role_id',width:40},
	  							{text: '角色名称',dataIndex: 'role_name',flex:1},
	  							{text: '角色描述',dataIndex: 'role_desc',flex:2},
	  							{text:'角色类型',dataIndex:'role_type',width:100,
	  								renderer:function(value){
	  									if(value==0) 
	  										return '管理员';
	  									else if(value==1)
	  										return '注册账号';
	  									else if(value==2) 
	  										return '公共子账号'; 
	  									else if(value==3) 
	  										return '游客'; 
	  									else if(value==10) 
	  										return '普通子账号'; 
	  									else if(value==11) 
	  										return 'TPS子账号'; 
	  									else return '其他';
	  								}
	  							},
	  							{text: '状态',dataIndex: 'is_enable',width:60,
	  								renderer:function(value){
	  									if(value==0) 
	  										return '启用';
	  									else if(value==1)
	  										return '禁用';
	  								}
	  								},
	  							{text: '排序',dataIndex: 'order_seq',width:46}
	  		           		],
	  		           		listeners:{
	  						   selectionchange:function(selModel, selections){
	  							   	var n = selections.length||0;
	  								me.down('#delBtn').setDisabled(n==0);					
	  								me.down('#edtBtn').setDisabled(n!=1);
	  								me.down('#saveBtn').setDisabled(n==0);
	  								me.down('#abledBtn').setDisabled(n==0);	
	  								me.down('#disabledBtn').setDisabled(n==0);	
	  						   }
	  					   },
	  					 dockedItems:[{
						    xtype : 'pagingbar',
                            stateId : 'd5c2e307-ae16-4015-a164-17f82626511f',
							store : me.sysroleStore,
							dock : 'bottom',
							displayInfo : true
					    }]
	  				    },
	  				    {xtype:'splitter'},
	  				    {
	  				    //右边列表
	  				    	title: '功能授权',
	  				    	iconCls : 'menu', 
	  				    	xtype:'treepanel',
	  				    	store : me.treestore,
	  				    	itemId : 'module_tree',
	  				    	disabled: true,
	  				    	//width:380,
	  				    	flex:1,
	  				    	border:true,
	  						useArrows:false,//是否显示小箭头  
	  					    lines:true, //节点之间虚线  
	  					    rootVisible : true
	  				    }
	  				    ]
		        }]
    	});
    	this.callParent(arguments); 
    }
});
Ext.define('srm.user.view.MngUserInfo' , {
 extend:'srm.ux.Panel',
 alias : 'widget.mng_UserInfo',
 title: '用户清单',
 requires: ['srm.user.store.UserInfos'
            ,'srm.role.store.Roles'
            ,'srm.ux.PagingBar'],
 layout:'border',
 initComponent:function(){
 	var me=this;
 	var store=Ext.create('srm.user.store.UserInfos');
 	var hasAD=false;
 	if(srm.UInfo.currentUser.isAdmin){
 		hasAD=true;
 	}
 	srm.Util.applyNull(store.proxy.extraParams,{usePaging:true,hasAD:hasAD});
    this.on('beforedestroy',function(){
		delete store.proxy.extraParams.hasAD;
	});
	Ext.apply(this,{
		  items:[   {
		        	    tbar:[     
   	  		            {text: '新增',	glyph : 0xf016,		itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
   	  		            {text: '修改',	glyph : 0xf044,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
   	  		            {text: '删除',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
   	  				    {text: '刷新',	glyph : 0xf021,	itemId:srm.Const.FUNC_ITEMID_BTN_REFRESH},
   	  				    '-',
   	  				    {text: '重置密码',glyph:0xf09c,itemId:srm.Const.FUNC_ITEMID_BTN_RESET,disabled:true},
   	  				    '-',
   	  				    {xtype:'textfield',itemId:'search',emptyText:'输入用户ID或姓名搜索'},
   	  				    {xtype:'textfield',itemId:'search_orgnization',emptyText:'所属部门'},
   	  				    {text:'查询',glyph:0xf002,
       	  				    handler:function(btn){
       	  				    	store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#search').getValue(),
           	  				    		searchOrg:me.down('#search_orgnization').getValue()
           	  				    	}
       	  				    	});
       	  				    }
   	  				    },
   	  				    {
   	  				    text:'重置',
   	  				    glyph:0xf01e,
   	  				    handler:function(){
   	  				    	me.down('#search').setValue("");
   	  				    	store.loadPage(1);
   	  				    }
   	  				    }
		        	  ],
		        	  region: 'center',
				      xtype:'gridpanel',
				      itemId:'userinfo_grid',
				      multiSelect:true,
				      store:store ,
					  columnLines:true,
					  dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					  columns:[
					           //Ext.create(m 'Ext.grid.RowNumberer',{header:'',width:35}),
					           {header:'',xtype:'rownumberer',width:35},
					           {header: '用户ID',dataIndex: 'login_id',fixed: true},
					           {header: '姓名',dataIndex: 'name',flex: 1},
					           {header:'所属部门',dataIndex:'orgnization',width:100},
					           {header: '性别',dataIndex: 'sex',width:50,renderer:function(v){
									return srm.Util.getFormatText(srm.Const.SEX_TYPE,v);
								}},
								
							   
					           {header: '电子邮件(Email)',dataIndex: 'email',width:100},
					           {header:'公司',dataIndex:'cpyname_cn',flex:1,
					           	  renderer:function(v,metaData){
					                 metaData.tdAttr = 'data-qtip="' + (v) + '"';  
					            	 return v;
					              }
					           },
				               {header: '创建日期',dataIndex: 'create_dt',width:100,
				                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
			                   {header: '最近登录',dataIndex: 'last_login',flex: 1,
				                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
				               {header:'昵称',dataIndex:'nickname',flex:1},
				               {header:'有效状态',dataIndex:'is_valid',flex:1,renderer:function(v){
                                    return srm.Util.getFormatText(srm.Const.YESNO_TYPE,v);
                                }},
				               {header:'头像号',dataIndex:'nick_portrait',flex:1,hidden:true}
					  ]
		        }
		         ]
	 });
	 this.callParent(arguments);
  }
});
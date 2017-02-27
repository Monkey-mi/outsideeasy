Ext.define('srm.role.view.UserWin',{
	extend:'srm.ux.Window',
    alias:'widget.sel_user_for_role_win',
    
    glyph:0xf007,
    title:'关联用户',
    width:580,
    height:600,
    
    layout:'fit',
    initComponent:function(){
    	var me=this;
    	me.store=Ext.create('srm.user.store.UserInfos');
    	var hasAD=false;
	 	if(srm.UInfo.currentUser.isAdmin){
	 		hasAD=true;
	 	}
    	Ext.apply(me.store.proxy.extraParams,{usePaging:true,is_valid:true,hasAD:hasAD});
    	me.on('beforedestroy',function(th){
			delete me.store.proxy.extraParams.hasAD;
		});
    	me.store.loadPage(1);
    	Ext.apply(me,{
    	 items:[
    	 {
    	 	
        	  region: 'center',
		      xtype:'gridpanel',
		      itemId:'userinfo_grid',
		      multiSelect:true,
	   	  	  selModel:Ext.create('Ext.selection.CheckboxModel'),
		      store:me.store ,
			  columnLines:true,
			  tbar:[   
			    {xtype:'textfield',itemId:'search',emptyText:'输入用户ID或姓名搜索'},
			    {xtype:'textfield',itemId:'search_orgnization',emptyText:'所属部门'},
			    {text:'查询',glyph:0xf002,
  				    handler:function(btn){
  				    	me.store.loadPage(1,
  				    		{
   	  				    	params:{
   	  				    		search:me.down('#search').getValue(),
   	  				    		searchOrg:me.down('#search_orgnization').getValue()
   	  				    	}
  				    	});
  				    }
			    }
        	  ],
			  dockedItems:[{
	    		xtype : 'pagingbar',
                stateId : 'sel_user_win-1',
	    		store:me.store,
	    		dock:'bottom',
	    		displayInfo:true
	    	  }],
			  columns:[
			           {header: '用户ID',dataIndex: 'login_id',fixed: true},
			           {header: '姓名',dataIndex: 'name',width:100},
			           {header: '性别',dataIndex: 'sex',width:50,renderer:function(v){
							return srm.Util.getFormatText(srm.Const.SEX_TYPE,v);
						}},
						{header:'所属部门',dataIndex:'orgnization',width:160},
					   {header:'公司',dataIndex:'cpyname_cn',flex:1,
			           	  renderer:function(v,metaData){
			                 metaData.tdAttr = 'data-qtip="' + (v) + '"';  
			            	 return v;
			              }
			           }
			  ]
    	 }
    	 ],
    	 buttons:[
    	{
	    	 text:'保存',
	    	 glyph:0xf0c7,
	    	 itemId:'ACT_SAVE'
    	},
    	{
            text: '退出',
            glyph:0xf057,
            handler:function(btn){
                me.close();
            }
        }
    	]
    	});
    	this.on('beforedestroy',function(){
	 		delete me.store.proxy.extraParams.is_valid;
	 	});
    	me.callParent(arguments);
    }
});

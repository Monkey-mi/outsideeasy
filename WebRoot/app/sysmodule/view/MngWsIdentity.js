Ext.define('srm.sysmodule.view.MngWsIdentity',{
	extend:'srm.ux.Panel',
	alias:'widget.mngWsIdentity',
	
	initComponent:function(){
		var me=this;
		me.store=Ext.create('srm.sysmodule.store.WsIdentity');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		
		Ext.apply(me,{
			layout:{
				type:'border',
				padding:2
			},
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId:'function_btn',
			    items:[
					{text: '新增',   glyph : 0xf016,itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
					{text: '编辑',   glyph : 0xf016,itemId:srm.Const.FUNC_ITEMID_BTN_EDT},
					{text: '删除',   glyph : 0xf014,itemId:'BTN_DEL',disabled:true},
					'-',
					{text: '筛选', glyph:0xf002,itemId:'btn_query'}
				]
			}],
			items:[
			{
				flex:1,
				region:'center',
				xtype:'grid',
				itemId:'grd_WsIdentity',
				
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				columns:[
					{header:'编号',dataIndex:'ws_id',width:40},
		   	  	  	{header:'身份',dataIndex:'identify',width:120},
		   	  	  	{header:'密码',dataIndex:'psw',width:120},
		   	  	  	{header:'所属公司',dataIndex:'company_name',width:120},
		   	  	  	
	   	  	  		{header:'状态',dataIndex:'enabled',width:120,
	   	  	  			renderer:function(v){
				            return v==srm.Const.ONEZERO_TYPE_ONE?"是":"否";
				        }
	   	  	  		},
	   	  	  		{header:'备注',dataIndex:'remark',width:180}
					],
					dockedItems:[{
			    		xtype : 'pagingbar',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store
			}
			]
		});
		me.callParent(arguments);
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        		        
		    }
		});
	}
});
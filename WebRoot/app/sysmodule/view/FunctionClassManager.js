Ext.define('srm.sysmodule.view.FunctionClassManager',{
	extend:'srm.ux.Panel',
	alias : 'widget.mng_FunctionClass',
	
	initComponent:function(){
		var me=this;
		me.treestore=Ext.create('srm.sysmodule.store.SysFunctionClassTree');
		me.pagestore=Ext.create('srm.sysmodule.store.SysPageAuthority');
		Ext.apply(me.pagestore.proxy.extraParams, {usePaging:true});
		me.grdstore=Ext.create('srm.sysmodule.store.SysFunctionClass');
		Ext.apply(me.grdstore.proxy.extraParams, {usePaging:false});
		Ext.apply(this,{
			layout: 'border',
			items: [{
		    	title: '业务分类树',
		    	itemId:'sysFunctionClassTree',
				split: true,
				autoScroll:true,
		        region:'west',
		        width: 400,
		        tbar:[     
	  		            {text: '新增',	glyph : 0xf016,	itemId:"BTN_ADD_TREE"},
	  		            {text: '修改',	glyph : 0xf044,	itemId:"BTN_EDT_TREE",	disabled:true},
	  		            {text: '删除',	glyph : 0xf014,		itemId:"BTN_DEL_TREE",	disabled:true},
	  		            '-',
	  		            {text: '刷新',	glyph : 0xf021,		itemId:"BTN_REFRESH_TREE"}
	        	  ],
			    collapsible:true,
			    glyph:0xf115,
			    xtype:'treepanel',
				border:true,
				useArrows:true,//是否显示小箭头  
			    store :me.treestore,
			    rootVisible : true,
			    listeners: {
					selectionchange: function(grid, recs) {
						if (recs.length > 0) {
							me.down('#BTN_EDT_TREE').setDisabled(false);
							me.down('#BTN_DEL_TREE').setDisabled(false);
						} else {
							me.down('#BTN_EDT_TREE').setDisabled(true);
							me.down('#BTN_DEL_TREE').setDisabled(true);
						}
					}
				}
		    },
		    {
		    	title: '页面列表',
		    	itemId:'sysPageAuthority-grid',
		    	split: true,
				autoScroll:true,
				flex:1,
		    	region: 'center',
		    	tbar:[     
	  		            {text: '新增',	glyph : 0xf016,	itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
	  		            {text: '修改',	glyph : 0xf044,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
	  		            {text: '删除',	glyph : 0xf014,		itemId:srm.Const.FUNC_ITEMID_BTN_DEL,	disabled:true},
	  		            '-',
	  		             {text: '刷新',	glyph : 0xf021,		itemId:srm.Const.FUNC_ITEMID_BTN_REFRESH}
	        	  ],
				glyph : 0xf0c9,
				xtype:'grid',
				store: me.pagestore,
		        columnLines:true,
		        dockedItems:[
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.pagestore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		        columns:[
					{header:'',xtype:'rownumberer',width:40},
					{header:'名称',dataIndex:'page_name',width:240},
					{header: '路径',dataIndex: 'page_path',flex:1},
					{header: '是否可用',dataIndex: 'enable',width:100,renderer:function(v){
						return v==srm.Const.YESNO_TYPE_YES?"是":"否";
					}},
					{header: '是否菜单页面',dataIndex: 'is_menu_page',width:100,renderer:function(v){
						return v=='1'?"是":"否";
					}},
					{header: '备注',dataIndex: 'remark',flex:1}
		        ],
	   	  	  	listeners: {
					selectionchange: function(grid, recs) {
						if (recs.length > 0) {
							me.down('#BTN_EDT').setDisabled(false);
							me.down('#BTN_DEL').setDisabled(false);
							//me.loadcurrOtherData(recs[0]);
						} else {
							me.down('#BTN_EDT').setDisabled(true);
							me.down('#BTN_DEL').setDisabled(true);
						}
					}
				}
		    }]
		});
		this.callParent(arguments); 
	},
	//加载当前记录相关附属信息，如页面功能表信息，用于删除当前页面表时，删除其包含的功能表信息
	loadcurrOtherData:function(rec){
		var me=this;
		if(!Ext.isEmpty(rec))
		{
			me.currPageFuncStore.load({params:{authority_id:rec.get('authority_id')}});
		}
	}
});


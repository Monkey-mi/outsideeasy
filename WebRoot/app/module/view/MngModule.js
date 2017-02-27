
Ext.define('srm.module.view.MngModule',{
	extend:'srm.ux.Panel',
	requires:['srm.module.store.ModuleTrees',
	          'srm.module.store.Modules'
	         ],
	alias : 'widget.mng_Module',
	title:'菜单管理设置',
	layout: 'border',
	defaults: {
        split: true,
        autoScroll:true,
        useSplitTips: true,
        containerScroll:true,
        layout: 'fit'
    },
	initComponent:function(){
		Ext.apply(this,{
			items: [{
		    	//左边菜单菜单树
				title: '功能菜单树',
		        region:'west',
		        width: 200,
		        tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    collapsible:true,
			    glyph:0xf115,
			    xtype:'treepanel',
				border:true,
				useArrows:true,//是否显示小箭头  
			    store :Ext.create('srm.module.store.ModuleTrees'),
			    rootVisible : true
		    },{
		    	//右边菜单菜单信息列表
		    	title: '菜单列表',
		    	region: 'center',
		    	tbar:[     
	  		            {text: '新增',	glyph : 0xf016,	itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
	  		            {text: '修改',	glyph : 0xf044,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
	  		            {text: '删除',	glyph : 0xf014,		itemId:srm.Const.FUNC_ITEMID_BTN_DEL,	disabled:true},
	  		            //{text: '多人测并发',	glyph : 0xf021,		itemId:'BTN_BF',hidden:!srm.Util.currentUser.isAdmin},
	  		            '-',
	  		             {text: '刷新',	glyph : 0xf021,		itemId:srm.Const.FUNC_ITEMID_BTN_REFRESH}
	        	  ],
				glyph : 0xf0c9,
				xtype:'gridpanel',
				store: Ext.create('srm.module.store.Modules'),
		        columnLines:true,
		        columns:[
					{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
					{text: '节点',dataIndex: 'id',flex:2},
					{text: '父节点',dataIndex: 'parentId',flex:2},
					{text: '菜单名称',dataIndex: 'text',flex:6},
					/*{text: '名称样式',dataIndex: 'textCls',flex:1},*/
					{text: '菜单代码',dataIndex: 'mod_code',flex:2},
					{text: '菜单类别',dataIndex: 'mod_type',flex:2,renderer:function(v){
						return srm.Util.getFormatText(srm.Const.MODULE_TYPE,v);
					}},
					{text: '展开',dataIndex: 'expanded',flex:2,renderer:function(v){
						return srm.Util.getFormatText(srm.Const.YESNO_TYPE,v);
					}},
					{text: '叶节点',dataIndex: 'leaf',flex:2,renderer:function(v){
						return srm.Util.getFormatText(srm.Const.YESNO_TYPE,v);
					}},
					{text: '有效',dataIndex: 'isvalid',flex:2,renderer:function(v){
						return srm.Util.getFormatText(srm.Const.YESNO_TYPE,v);
					}},
					{text: '请求类型',dataIndex: 'urltype',flex:2,renderer:function(v){
						return srm.Util.getFormatText(srm.Const.URL_TYPE,v);
					}},
					/*{text: '请求路径',hidden:true,dataIndex: 'url',flex:2},*/
					/*{text: '请求目标',dataIndex: 'urltarget',width:40},
					{text: '节点图标',hidden:true,dataIndex: 'icon',flex:2},
					{text: '图标样式',hidden:true,dataIndex: 'iconCls',flex:2},*/
					/*{text: 'QuickTip',dataIndex: 'qtip',flex: 1},
					{text: 'QuickTitle',dataIndex: 'qtitle',flex: 1},*/
					{text: '排序',dataIndex: 'order_seq',width:80},
					{text: '备     注',hidden:true,dataIndex: 'remark',flex:2},
					{text: '创建日期',dataIndex: 'create_date',flex:4,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
					{text: '修改日期',dataIndex: 'modify_date',flex:4,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
		        ]
		    }]
		});
		this.callParent(arguments); 
	}
});


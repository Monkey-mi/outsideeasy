Ext.define('srm.codegen.view.MngCodeGen',{
	extend:'srm.ux.Panel',
	alias:'widget.MngCodeGen',
	requires:['srm.codegen.store.CodegenRule'
	          ,'Ext.ux.CheckColumn'
	          ,'srm.ux.PagingBar'],
	initComponent:function(){
		var me=this;
		var store=Ext.create('srm.codegen.store.CodegenRule');
		Ext.apply(me,{
			items:[{
				xtype:'grid',
				itemId:'grdCodeRule',
				tbar:[{text: '新增',	glyph : 0xf016,	itemId:srm.Const.FUNC_ITEMID_BTN_ADD},
	  		      {text: '修改',	glyph : 0xf044,	itemId:srm.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
	  		      {text: '删除',	glyph : 0xf014,	itemId:srm.Const.FUNC_ITEMID_BTN_DEL,	disabled:true},
	  		      '-',
	  		      {text: '启用',	glyph : 0xf01d,	itemId:'BTN_ENABLED',	disabled:true},
	  		      {text: '停用',	glyph : 0xf04d,	itemId:'BTN_DISABLED',	disabled:true},
	  		      '-',
	  		      {text: '刷新',	glyph : 0xf021,	itemId:srm.Const.FUNC_ITEMID_BTN_REFRESH},
	  		      {text: '获取ID',	glyph : 0xf021,handler:function(){
	  		      	var rec=me.down('grid').getSelectionModel().getSelection()[0];
	  		      	
	  		      }},
		   	  		    '->',
		   	  		    {text:'',glyph:0xf00d,
		    				handler:function(){
		    					me.close();	
		    				}
		    			}
	  		      ],
				
				store:store,
				border:true,
				columnLines:true,
			    dockedItems:[{
                        xtype : 'pagingbar',
                        stateId : '6a9299f2-c855-435f-96b4-862fe30010fc',
                        store:store,
                        dock:'bottom',
                        displayInfo:true
                    }],
			        columns:[
						{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
						{text: '代码',dataIndex: 'code',flex:1},
						{text: '名称',dataIndex: 'name',flex:3},
						{text: '总长度',dataIndex: 'len',flex:1,align:'center'},
						{text: '有效',dataIndex: 'is_valid',flex:1,align:'center',renderer:function(v){
							return srm.Util.getFormatText(srm.Const.YESNO_TYPE,v);
						}},
                        {text: '创建人',dataIndex: 'creator',flex:1},
                        {text: '创建日期',dataIndex: 'create_dt',flex:1,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
	           		]
			}]
		});
		me.callParent(arguments);
	}
});
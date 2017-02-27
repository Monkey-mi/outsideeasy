Ext.define('srm.sysmodule.view.EditPageAuthority',{
	extend:'srm.ux.Window',
	alias:'widget.editPageAuthority',
	
	width:480,
	height:400,
	frame:true,
	modal:true,
	
	initComponent : function() {
		var me=this;
		me.pageFuncStore=Ext.create('srm.sysmodule.store.SysPageFunc');
		Ext.apply(me,{
			items:[{
				xtype:'tabpanel',
				activeTab:0,
				items:[{
					title:'页面',
					itemId:'page_info',
					xtype:'form',
					frame:true,
					layout:'column',
					defaults:{padding:5,xtype:'textfield',labelWidth:80,selectOnFocus:true},
					items:[
						{
							fieldLabel:'编号',
							name:'authority_id',
							columnWidth:0.5,
							fieldStyle:'background:#E6E6E6',
							readOnly:true
						},
						{
							fieldLabel:'节点编号',
							name:'class_id',
							columnWidth:0.5,
							fieldStyle:'background:#E6E6E6',
							readOnly:true
						},
						{
							name:'page_name',
							fieldLabel : '页面名称',
							columnWidth:1,
							allowBlank:false,
							maxLength:250
						},
						{
							name:'page_path',
							fieldLabel : '页面路径',
							columnWidth:1,
							allowBlank:false,
							maxLength:250
						},
						{
							fieldLabel : '是否有效',
							columnWidth:1,
							name : 'enable',
							xtype:'combobox',
					    	store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
					    	queryMode: 'local',
						    displayField: 'name',
						    valueField: 'value',
						    forceSelection: true
						},
						{
							fieldLabel : '是否菜单页面',
							columnWidth:1,
							name : 'is_menu_page',
							xtype:'combobox',
							store:[['0','否'],['1','是']],
						},
						{
							xtype: 'numberfield',
							columnWidth:1,
					    	fieldLabel : '排序号',
							name : 'order_seq'
						},
					    {
					    	fieldLabel : '备     注',
					    	columnWidth:1,
					    	maxLength:50,
							name : 'remark'
						}
					]
				},
				//功能tab页
				{
					title:'功能',
					itemId:'tab_pfunc',
					disabled:this.isAdd,
					items:[{
						xtype:'gridpanel',
						itemId:'grid_pfunc',
						height:350,
						layout:'fit',
						store:me.pageFuncStore,
						plugins : Ext.create('Ext.grid.plugin.CellEditing', {
					    	    clicksToEdit : 1
					    	  }),
					   columnLine:true,
					   frame : false,
					   multiSelect:true,
					   selModel:Ext.create('Ext.selection.CheckboxModel'),
					   tbar:[
					    	{text:'增加',action:'ACT_ADD',itemId:'funadd',glyph:0xf055,handler:function(){
					    		var grid=me.down('#grid_pfunc');
					    		var store=grid.getStore();
					    		var r=Ext.create('srm.sysmodule.model.SysPageFunc',{"authority_id":me.authority_id});
					    		store.insert(store.getCount(),r);
					    	}},
					    	{text:'删除',action:'ACT_DEL',itemId:'fundel',glyph:0xf056,handler:function(){
					    		var grid=me.down('#grid_pfunc');
					    		var store=grid.getStore();
					    		var recs=grid.getSelectionModel().getSelection();
					    		store.remove(recs);
					    	}}
					    	],
					  columns : [ {
					    		header:'序号',
					    		xtype : 'rownumberer',
					    		width : 40,
					    		sortable : false,
					    		align : 'center'
					    	}, {
					    		header : '功能名称',
					    		dataIndex : 'name',
					    		flex : 1,
					    		editor : {
					    			allowBlank : false
					    		}
					    	}, {
					    		header : '功能id',
					    		dataIndex : 'code',
					    		flex : 1,
					    		editor : {
					    			allowBlank : false
					    			
					    			}
					    	},{
					    		header : '排序号',
					    		dataIndex : 'order_seq',
					    		width : 80,
					    		editor:{
					    			
					    			allowBlank : false
					    		}	
					    	} ]
					}]
				}]
			}],
			buttons:[
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm'
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			
		});
		this.callParent(arguments);
	},
	loadData:function(rec){
		var me=this;
		me.down("form").loadRecord(rec);
		me.authority_id=-1;
		if(me.isEdit)
		{
			me.authority_id=rec.get('authority_id');
			
			me.pageFuncStore.load({params:{authority_id:rec.get('authority_id')}});
		}
	}
});
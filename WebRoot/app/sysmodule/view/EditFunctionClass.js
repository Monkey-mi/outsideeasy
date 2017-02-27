Ext.define('srm.sysmodule.view.EditFunctionClass',{
	extend:'srm.ux.Window',
	alias:'widget.editFunctionClass',
	
	width:480,
	height:400,
	frame:true,
	modal:true,

	initComponent : function() {
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'form',
				frame:true,
				layout:'column',
				defaults:{padding:5,xtype:'textfield',labelWidth:80,selectOnFocus:true},
				items:[
					{
						fieldLabel:'编号',
						name:'class_id',
						columnWidth:0.5,
						fieldStyle:'background:#E6E6E6',
						readOnly:true
					},
					{
						fieldLabel:'父ID',
						name:'parentId',
						columnWidth:0.5,
						fieldStyle:'background:#E6E6E6',
						readOnly:true
					},
					{
						name:'class_name',
						fieldLabel : '名称',
						columnWidth:1,
						allowBlank:false,
						maxLength:50
					},
					{
						fieldLabel : '是否有效',
						columnWidth:0.5,
						name : 'isvalid',
						xtype:'combobox',
				    	store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection: true
					},
					{
						fieldLabel : '是否父节点',
						columnWidth:0.5,
						name : 'isParent',
						xtype:'combobox',
				    	store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection: true
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
					
				],
			
			buttons:[
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm'
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			}]
		});
		this.callParent(arguments);
	},
	loadData:function(rec){
		var me=this;
		me.down("form").loadRecord(rec);
	}
});
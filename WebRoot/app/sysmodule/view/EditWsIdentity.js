Ext.define('srm.sysmodule.view.EditWsIdentity',{
	extend:'srm.ux.Window',
	alias:'widget.editWsIdentity',
	
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
						name:'ws_id',
						columnWidth:0.5,
						fieldStyle:'background:#E6E6E6',
						readOnly:true
					},
					{
						name:'identify',
						fieldLabel : '身份',
						columnWidth:1,
						allowBlank:false,
						maxLength:40,
						fieldStyle:me.isEdit?'background:#E6E6E6':'',
						readOnly:me.isEdit
					},
					{
						name:'psw',
						fieldLabel : '密码',
						columnWidth:1,
						allowBlank:false,
						maxLength:40
					},
					{
						fieldLabel : '是否有效',
						columnWidth:1,
						name : 'enabled',
						xtype:'combobox',
				    	store:srm.Util.getCombxStore(srm.Const.ONEZERO_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection: true
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
Ext.define('srm.sysmodule.view.EditSysRole',{
	extend: 'srm.ux.Window',
	alias: 'widget.editSysRole',

	title: '角色信息维护',
	height: 280,
	width : 500,
	resizable : true,
	modal : true,

	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			buttons:[
                {
                    text: '保存',
                    itemId:'SAVE',
                    glyph:0xf0c7,
                    action: 'ACT_SAVE'
                },
                {
                    text: '退出',
                    itemId:'CLOSE',
                    glyph:0xf057,
                    action:'ACT_CLOSE'
                }
            ],
			items:[{
				 
			    	 xtype:'form',
			    	 bodyPadding: 10,
			    	 frame:false,
			    	 height:300,
			    	 plugins:{
				          ptype: 'FormKeyMapper'
			    	 },
			    	 defaults: {
		    	    	xtype: 'textfield',
				    	labelAlign : 'right',
				    	anchor:'95%',
		    			labelWidth : 80,
		    			labelStyle : 'font-weight:bold',
		    			msgTarget: 'side',
			            autoFitErrors: true
			    	 },
			    	 items:[
			    	        
							{
						    	fieldLabel : '角色名称',
								name : 'role_name',
								itemId : 'firstFocusOn',
								allowBlank : false,
								blankText : '角色名称不允许为空!',
								disabled:!me.isAdd
							},
							{
						    	fieldLabel : '描述',
								name : 'role_desc',
								xtype: 'textareafield'
							},
							{
								fieldLabel : '角色分类',
								columnWidth:1,
								name : 'role_type',
								xtype:'combobox',
								store:[[0,'管理员'],[1,'注册账号'],[2,'公共子账号'],[3,'游客'],[10,'普通子账号'],[11,'TPS子账号'],[12,'其他']],
							},
                            {
                                fieldLabel : '排序',
                                name : 'order_seq',
                                xtype: 'numberfield'
                            }
					  ]
				}]
		});
		this.callParent(arguments);
	},
	loadData:function(rec){
		var me=this;
		me.down('form').loadRecord(rec);
	}
});
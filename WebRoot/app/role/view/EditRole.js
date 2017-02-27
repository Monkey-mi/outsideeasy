Ext.define('srm.role.view.EditRole',{
	extend: 'srm.ux.Window',
	alias: 'widget.edt_Role',
	requires:['srm.util.Util',
	          'srm.def.ui.plugins.FormKeyMapper',
	          'srm.ux.RemoteValidator',
	          'srm.user.store.UserInfos',
	          'srm.role.view.MngRoleCon'
	          ],
	title: '角色信息维护',
	height: 400,
	width : 500,
	resizable : true,
	modal : true,
	doInit:function(){
		var roleRec = this.down('form').getRecord();
		//载入角色配置情况
		var roleCon=this.down('mng_rolecon');
		roleCon.doInit(roleRec);
	},
	doSave:function(){
		this.down('mng_rolecon').save();
	},
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			buttons:[
                {
                    text: '保存',
                    itemId:'SAVE',
                    glyph:0xf0c7,
                    action: 'ACT_SAVE',
                    hidden: !me.isEdit
                },
                {
                    text: '退出',
                    itemId:'CLOSE',
                    glyph:0xf057,
                    action:'ACT_CLOSE'
                }
            ],
			items:[  {
				xtype : 'tabpanel',
				activeTab : 0,	
				items:[
				       {  
					    	 xtype:'form',
					    	 title: '角色信息',
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
										disabled:!me.isAddNew
									},
									{
								    	fieldLabel : '描述',
										name : 'role_desc',
										xtype: 'textareafield'
									},
                                    {
                                        fieldLabel : '排序',
                                        name : 'order_seq',
                                        xtype: 'numberfield'
                                    }
						  ]
						},{
							xtype:'mng_rolecon',
							height:300,
							title:'角色归属',
							role:me.role,
							disabled:me.isAddNew
						}
				       ]
			}
				]
		});
		this.callParent(arguments);
	},
	/**
	 * 初始化
	 */
	initEdit:function(){
		this.callParent(arguments);
	}
		
});
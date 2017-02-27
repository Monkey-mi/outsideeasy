/**
 * 用户基础信息
 */
Ext.define('srm.user.view.UserInfoForm',{
    extend:'Ext.form.Panel',
    alias:'widget.userinfo_form',
    frame:false,
	plugins:{
	      ptype: 'FormKeyMapper'
	},
	bodyPadding: 10,
	title:'用户基本信息',
	defaults: {
	    	xtype: 'textfield',
	    	labelAlign : 'right',
	    	anchor:'95%',
			labelWidth : 60,
			columnWidth:1,
			padding:3,
			labelStyle : 'font-weight:bold',
			msgTarget: 'side',
	        autoFitErrors: true
	 },
    initComponent:function(){
    	var me=this;
    	me.orgnizationStore=Ext.create('srm.user.store.UserOrgnization');
    	
    	Ext.apply(me,{
    	    layout:'column',
    	    items:[{
    	    	 name : 'login_id',
				 fieldLabel: '用户ID',
				itemId:'login_id',
				allowBlank:false,
				flex:1,
											        	 blankText:'用户ID不能为空',
											        	 plugins:{
									        		          ptype: 'RemoteValidator',
									        		          rvOptions:{
									        		        	  url:'user/UserCheck.do?method=isExistsUser',
									        		        	  passIsValid:false, //已存在反而是校验不通过
									        		        	  vTexts:["用户已存在!","用户不存在!"]
									        		          }
											        	 },
											        	 disabled:!this.isAddNew
    	    	
    	    },{
							        	 name : 'name',
							        	 itemId:'name',
							        	 fieldLabel: '姓名',
							        	 allowBlank:false
							         },{	 
									        	 name : 'pwd',
									        	 itemId:'pwd',
									        	 inputType:'password',
									        	 fieldLabel: '密码',
									        	 flex:1,
									        	 disabled:!this.isAddNew,
									        	 hidden:!this.isAddNew
									         },
									         {
									        	 name : 'pwd2',
									        	 itemId: 'pwd2',
									        	 inputType : 'password',
									        	 fieldLabel: '确认密码',
									        	 flex:1,
									        	 vtype: 'password',
									        	 initialPassField: 'pwd',
									        	 disabled:!this.isAddNew,
									        	 hidden:!this.isAddNew
									         },{
							    	    	name:'nickname',
											fieldLabel:'昵称',
											itemId:'nickname',
											blankText:'请输入昵称'
							    	    },
							         {
							        	 name : 'sex',
							        	 fieldLabel: '性别',
							        	 itemId: 'sex',
							        	 xtype:'combobox',
							        	 store:srm.Util.getCombxStore(srm.Const.SEX_TYPE),
							        	 queryMode: 'local',
							        	 displayField: 'name',
							        	 valueField: 'value',
							        	 forceSelection:true
							         },{
							        	 name : 'birthday',
							        	 fieldLabel: '出生日期',
							        	 itemId: 'birthday',
							        	 xtype:'datefield'
							         },
							         {
							        	 name : 'email',
							        	 fieldLabel: '电子邮箱',
							        	 itemId: 'email',
							        	 vtype:'email'
							         },{
                                        xtype:'combo',
                                        name:'orgnization',
                                        itemId:'default_org',
                                        fieldLabel:'所属部门',
                                        store:me.orgnizationStore,
                                        displayField:'orgnization',
                                        valueField:'orgnization',
                                        enableKeyEvents:true,
                                        listeners:{
 											keyup:function(text,e){
 											var input_text=text.lastMutatedValue;//text.getValue()
 											
 											me.down('#default_org').expand();
 											me.orgnizationStore.load({params:{condition:input_text}});
 											//me.down('#default_org').store.load({params:{condition:input_text}});
 											
 							}
 							}
                                       },
                                       	{
								           xtype:'checkbox',
								           name:'is_valid',
								           fieldLabel:'有效状态'
								         },
                                       	{
								        	 xtype:'datefield',
								        	 name : 'create_dt',
								        	 disabled:true,
								        	 fieldLabel: '创建日期',
								        	 format:'Y-m-d H:i:s'
								         },
								         {
								        	 xtype:'datefield', 
								        	 name : 'last_login',
								        	 disabled:true,
								        	 fieldLabel: '最近登录',
								        	 format:'Y-m-d H:i:s'
								         }]
    	});
    	me.callParent(arguments);
    },
    modeChange:function(){
    var me=this;
    var pwd=me.down('#pwd');
    var pwd2=me.down('#pwd2');
    pwd.setDisabled(true);
    pwd.setVisible(false);
    pwd2.setDisabled(true);
    pwd2.setVisible(false);
    }
});
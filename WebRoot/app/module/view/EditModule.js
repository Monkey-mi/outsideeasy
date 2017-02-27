Ext.define('srm.module.view.EditModule',{
	extend: 'srm.ux.Window',
	alias: 'widget.edt_Module',
	requires:['srm.util.Util'
	          ,'srm.module.store.Functions'
	          ,'srm.def.ui.plugins.FormKeyMapper'
	          ,'srm.ux.RemoteValidator'
	          ],
    title: '菜单信息维护',
	width: 550,
	//height: 580,
	glyph:0xf1b2,
	resizable : false,
	modal : true,
	buttons:[
	  		{
	  		    text: '保存',
	  		    glyph:0xf0c7,
	  		    action: 'ACT_SAVE'
	  		},
	  		{
	  		    text: '退出',
	  		    glyph:0xf057,
	 		    action:'ACT_CLOSE'
	  		}
	],
	listeners:{
		beforerender:function(){
			var form= this.down('form').getForm();
			form.findField('mod_code').setDisabled(!this.isAddNew);
		},
		show:function(){
			//为了兼容IE浏览器,此处只能延后10ms以后执行才有效
			var me = this;
			Ext.create('Ext.util.DelayedTask',function(){
				var form= me.down('form').getForm();
				form.findField('text').focus(false);
			}).delay(20);
		}
	},
	 doInit:function(module){ 
		 var fromGrid = this.down('#edit_func'); 
		 var toStore=fromGrid.getStore();
		 this.down('form').loadRecord(module);
		 toStore.load({params:{mod_id:module.get('id')}});
    },
	initComponent:function(){
		Ext.apply(this,{
			items:[
				    {
				     xtype:'tabpanel',
				     activeTab: 0,
				     items:[
					     {  
					    	 title:'常规',
					    	 itemId:'tab_minfo',
					    	 xtype:'form',
					    	 bodyPadding: 10,
					    	 frame:false,
					    	 layout:'column',
					    	 plugins:{
						          ptype: 'FormKeyMapper'
					    	 },
					    	 defaults: {
				    	    	xtype: 'textfield',
						    	labelAlign : 'right',
						    	anchor:'95%',
				    			labelWidth : 80,
				    			columnWidth:.5,
				    			labelStyle : 'font-weight:bold',
				    			msgTarget: 'side',
					            autoFitErrors: true,
					            padding:5
					    	 },
					    	 items:[
					    	        {   
					    	        	fieldLabel : '节点',
										name : 'id',
										disabled:true
					    	        },
								    {
					    	        	fieldLabel : '父节点',
										name : 'parentId',
										disabled:true
									},
									{
								    	fieldLabel : '展开状态',
										name : 'expanded',
										xtype:'combobox',
										store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
								    	queryMode: 'local',
									    displayField: 'name',
									    valueField: 'value',
									    forceSelection: true
									},
								    {
								    	fieldLabel : '是否叶节点',
										name : 'leaf',
										xtype:'combobox',
								    	store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
								    	queryMode: 'local',
									    displayField: 'name',
									    valueField: 'value',
									    forceSelection: true
//									    ,listeners:{
//									    	change:function(fld,nv,ov){
//									    		//只有请求类型是菜单(URL_TYPE_MODULE)时,才显示菜单相关的三个字段
//									    		//否则仅有url
//									    		var form = fld.up('form').getForm();
//									    		var isLeaf = (nv==srm.Const.YESNO_TYPE_YES);
//									    		var bText = isLeaf?'菜单代码不允许为空!':'';
//									    		form.findField('mod_code').allowBlank=!isLeaf;
//									    		form.findField('mod_code').setVisible(isLeaf);
//									    	}
//									    }
									    
									},
								    {
								    	fieldLabel : '菜单名称',
										name : 'text',
										allowBlank : false,
										blankText : '菜单名称不允许为空!'
									},
								    /*{
								    	fieldLabel : '名称样式',
										name : 'textCls'
									},*/
								    {
								    	fieldLabel : '菜单代码',
										name : 'mod_code',
										itemId : 'mod_code',
										allowBlank : false,
										blankText : '菜单代码不允许为空!',
										minLength : 2,
										minLengthText :'除系统登记的菜单外,代码不能少于5位',
										plugins : {
											ptype : 'RemoteValidator',
											rvOptions : {
												url : 'common/ModuleCodeCheck.do?method=isExistsModuleCode',
												passIsValid : false, // 已存在反而是校验不通过
												vTexts : ["该代码定义已存在!", "该代码定义不存在!"]
											}
										}
									},
								    {
								    	fieldLabel : '菜单类别',
										name : 'mod_type',
										allowBlank : false,
										blankText : '菜单类别不允许为空!',
										xtype:'combo',
								    	store:srm.Util.getCombxStore(srm.Const.MODULE_TYPE),
								    	queryMode: 'local',
									    displayField: 'name',
									    valueField: 'value',
									    forceSelection: true
									},
								   {
								    	fieldLabel : '是否有效',
										name : 'isvalid',
										xtype:'combobox',
								    	store:srm.Util.getCombxStore(srm.Const.YESNO_TYPE),
								    	queryMode: 'local',
									    displayField: 'name',
									    valueField: 'value',
									    forceSelection: true
									},
									{
										fieldLabel : '请求类型',
										name : 'urltype',
										xtype:'combobox',
								    	store:srm.Util.getCombxStore(srm.Const.URL_TYPE),
								    	queryMode: 'local',
									    displayField: 'name',
									    valueField: 'value',
									    forceSelection: true,
									    allowBlank : false,
									    blankText : '请求类型不允许为空!',
									    listeners:{
									    	change:function(fld,nv,ov){
									    		//只有请求类型是菜单(URL_TYPE_MODULE)时,才显示菜单相关的三个字段
									    		//否则仅有url
									    		var form = fld.up('form').getForm();
									    		var isURL_TYPE_MODULE = (nv==srm.Const.URL_TYPE_MODULE);
									    		form.findField('url').setVisible(!isURL_TYPE_MODULE);
									    		form.findField('ctrller').setVisible(isURL_TYPE_MODULE);
									    		form.findField('jsview').setVisible(isURL_TYPE_MODULE);
									    		form.findField('extraCfg').setVisible(isURL_TYPE_MODULE);
									    	}
									    }
									},
								    {
										fieldLabel : '请求路径',
										name : 'url',
										maxLength:128,
										hidden:true
									},
									{
										fieldLabel : '菜单控制器',
										name : 'ctrller',
										maxLength:128
									},
									{
										fieldLabel : '菜单视图',
										name : 'jsview',
										maxLength:128
									},
									{
										fieldLabel : '菜单参数',
										name : 'extraCfg',
										maxLength:128
									},
								    {
								    	fieldLabel : '菜单图标',
										name : 'icon'
									},
								    {
								    	fieldLabel : '图标样式',
										name : 'iconCls'
									},
									{
								    	fieldLabel : '套件名称',
										name : 'softSet'
									},
									{
								    	fieldLabel : '模块名称',
										name : 'module'
									},
								    /*{
								    	fieldLabel : 'QuickTip',
										name : 'qtip'
									},
								    {
								    	fieldLabel : 'QuckTitle',
										name : 'qtitle'
									},*/
								    {
										xtype: 'numberfield',
								    	fieldLabel : '排序号',
										name : 'order_seq'
									},
								    {
								    	fieldLabel : '备     注',
										name : 'remark'
									},
								    {
										xtype : 'datefield',
										format:'Y-m-d H:i:s',
								    	fieldLabel : '创建日期',
										name : 'create_date',
										readOnly : true
									},
								    {
										//xtype : 'datefield',
										xtype : 'datefield',
										format:'Y-m-d H:i:s',
								    	fieldLabel : '修改日期',
										name : 'modify_date',
										readOnly : true
									}
						  ]
					     },
					     {
					    	 title:'功能',
					    	 itemId:'tab_mfunc',
					    	 disabled:this.isAddNew,
					    	 items:[
					    	        {
					    	        	xtype:'gridpanel',
					    	        	itemId:'edit_func',
					    	        	height:350,
					    	        		layout : 'fit',
					    	        		store : Ext.create('srm.module.store.Functions'),
					    	    			plugins : Ext.create('Ext.grid.plugin.CellEditing', {
					    	    				clicksToEdit : 1
					    	    			}),
					    	    			columnLine:true,
					    	    			columns : [ {
					    	    				text : '',
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
					    	    			}, {
					    	    				header : '功能类型',
					    	    				dataIndex : 'type',
					    	    				flex : 1,
					    	    				value:2,
					    	    				editor : {
					    	    					
					    	    					}
					    	    			},{
					    	    				header : '排序号',
					    	    				dataIndex : 'order_seq',
					    	    				
					    	    				editor:{
					    	    					
					    	    					allowBlank : false
					    	    				}	
					    	    			} ],

					    	    			title : '功能',
					    	    			frame : false,
					    	    			tbar:[
					    	    			      {text:'增加',action:'ACT_ADD',itemId:'funadd',glyph:0xf055},
					    	    			      {text:'删除',action:'ACT_DEL',itemId:'fundel',glyph:0xf056}
					    	    			      ]
					    	        }]
					     }]
				    }
				]
		});
		this.callParent(arguments); 
	}
});
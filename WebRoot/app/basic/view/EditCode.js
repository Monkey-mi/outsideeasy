/*
 * zhandewang
 */
Ext.define('srm.basic.view.EditCode',{
	extend: 'srm.ux.Window',
	alias: 'widget.edt_Code',

	title: '代码信息维护',
	closeAction : 'hide',
	resizable : false,
	modal : true,
	items:[
		     {  
		    	 xtype:'form',
		    	 bodyPadding: 10,
		    	 frame:false,
		    	 plugins:{
			          ptype: 'FormKeyMapper'
		    	 },
		    	 defaults: {
	    	    	xtype: 'textfield',
			    	labelAlign : 'right',
			    	anchor:'95%',
	    			labelWidth : 80,
	    			labelStyle : 'font-weight:bold',
	    			autoFitErrors: true
		    	 },
		    	 items:[
						{
							xtype:'combobox',
							store: Ext.create('srm.basic.store.CodeTypes'),
							displayField: 'name',
						    valueField: 'type_code',
							fieldLabel : '类型',
							forceSelection : true,
							name : 'type_code',
							itemId : 'type_code',
							allowBlank : false,
							editable:false,
							blankText : '类型不允许为空!'
						},
						{
							fieldLabel : '编码',
							name : 'code',
							itemId : 'code',
							plugins : {
								ptype : 'RemoteValidator',
								rvOptions : {
									url : 'base/CodeCheck.do?method=isExistsCode',
									vFields : ['type_code'],
									passIsValid : false, // 已存在反而是校验不通过
									vTexts : ["该代码定义已存在!", "该代码定义不存在!"]
								}
							}
						},
						{
					    	fieldLabel : '代码名称',
							name : 'name',
							itemId : 'name',
							allowBlank : false,
							blankText : '代码名称不允许为空!'
						},
						{
					    	fieldLabel : '代码值',
							name : 'value',
							allowBlank : false,
							blankText : '代码值不允许为空!'
						},
						{
							fieldLabel : '代码属性',
							name : 'attrib',
							itemId :'attrib'
						},
						
						{
							xtype: 'numberfield',
					    	fieldLabel : '排序号',
							name : 'order_seq',
							minValue : 0
						},
						
						{
					    	fieldLabel : '定&nbsp;义&nbsp;一',
							name : 'def_1'
						},
						{
					    	fieldLabel : '定&nbsp;义&nbsp;二',
							name : 'def_2'
						},
						{
					    	fieldLabel : '定&nbsp;义&nbsp;三',
							name : 'def_3'
						},
						{
							fieldLabel:'父&nbsp;节&nbsp;点',
							name:'parentId',
							hidden:true
						}
			  ]
		     }
		    
	],
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
			var form= this.down('form');
			/*form.getComponent('type_code').setValue();
			form.getC.comboboxstore.load({
				params : {
					type_code : type_code
				}
			});*/
			if(!this.isAddNew){
				form.getComponent('type_code').disable();
				form.getComponent('code').disable();
			}else{
				form.getComponent('type_code').disable();
			}
		},
		show:function(){
			var me =this;
			//为了兼容IE浏览器,此处只能延后10ms以后执行才有效
			Ext.create('Ext.util.DelayedTask',function(){
				var form= me.down('form');
				if(me.isAddNew)
					form.getComponent('type_code').focus(false);
				else
					form.getComponent('name').focus(false);
			}).delay(20);
		},
		close:function(){
			var form= this.down('form').getForm();
			form.reset();
		}
	},
	initComponent:function(){
		/*var me = this;
		me.comboboxstore=Ext.create('srm.basic.store.CodeTypes',{
			proxy : {
				type : 'ajax',
				actionMethods : 'post',
				api : {
					read : 'base/Codes.do?method=getCodeTypeList'
				},
				reader : {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'total',
					messageProperty: 'message'
				}
			}
		});*/
		this.callParent(arguments); 
	}
});
/*
 * 代码类型维护view 作者：毛必炬 创建日期: 2011.12.20
 */
Ext.define('srm.basic.view.EditCodeType', {
	extend : 'srm.ux.Window',
	alias : 'widget.edt_CodeType',

	title : '代码类型信息维护',
	resizable : false,
	modal : true,
	/**
	 * 下拉窗口显示值对象
	 */
	displayField:null,
	valueField:null,
	buttons : [
	{
		text : '保存',
		glyph:0xf0c7,
		action : 'ACT_SAVE'
	}, {
		text : '退出',
		glyph:0xf057,
		action : 'ACT_CLOSE'
	}],
	listeners : {
		show : function() {
			var me = this;
			// 为了兼容IE浏览器,此处只能延后10ms以后执行才有效
			Ext.create('Ext.util.DelayedTask', function() {
				var form= me.down('form');
				if(me.isAddNew)
					form.getComponent('type_code').focus(false);
				else
					form.getComponent('name').focus(false);
			}).delay(20);
		}
	},
	initComponent : function() {
		var me=this;
		Ext.apply(me, {
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
		    	 items : [
					        {
								fieldLabel : '类型代码',
								name : 'type_code',
								itemId : 'type_code',
								width : 165,
								allowBlank : false,
								blankText : '类型代码不允许为空!',
								plugins : {
									ptype : 'RemoteValidator',
									rvOptions : {
										url : 'base/CodeCheck.do?method=isExistsCodeType',
										passIsValid : false, // 已存在反而是校验不通过
										vTexts : ["该类型定义已存在!", "该类型定义不存在!"]
									}
								},
								disabled : !this.isAddNew
							}, {
								fieldLabel : '类型名称',
								width : 165,
								name : 'name',
								itemId : 'name',
								allowBlank : false,
								blankText : '类型名称不允许为空!'
							}, 
							{
								fieldLabel : '类型属性',
								name : 'attrib',
								xtype : 'combobox',
								width : 165,
								store : Ext.create('Ext.data.Store', {
											fields : ['name', 'value'],
											data : [{
														name : '系统',
														value : srm.Const.TYPE_ATTRIB_SYS
													}, {
														name : '下拉',
														value : srm.Const.TYPE_ATTRIB_CBX
													}, {
														name : '应用',
														value : srm.Const.TYPE_ATTRIB_APP
													}]
										}),
								queryMode : 'local',
								displayField : 'name',
								valueField : 'value',
								forceSelection : true
							}, {
								fieldLabel : '定&nbsp;义&nbsp;一',
								width : 165,
								itemId : 'def_1',
								name : 'def_1'
							},
							{
								fieldLabel : '定&nbsp;义&nbsp;二',
								itemId : 'def_2',
								width : 165,
								name : 'def_2'
							}, {
								fieldLabel : '备&nbsp;&nbsp;&nbsp;&nbsp;注',
								width : 165,
								name : 'remark'
							}
					]
			}]
			
		});
		this.callParent(arguments);
	}
});
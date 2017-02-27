Ext.define('srm.def.ui.plugins.FormKeyMapper',{
	extend:'Ext.AbstractPlugin',
	alternateClassName: 'srm.plugin.FormKeyMapper',
	alias: 'plugin.FormKeyMapper',
	init:function(form){
		//init将在被插入Component.initComponent()被调用后执行
		var me = this;	
		me.callParent(arguments);

		form.on(
			'afterrender',
			function(){
				//控制Form中所有字段的enter、up、down键盘操作
				var formFields = form.query('textfield');
				Ext.each(formFields,function(field){
					field.getEl().addKeyMap({
						key: [Ext.event.Event.ENTER,
						      Ext.event.Event.UP,
						      Ext.event.Event.DOWN,
						      Ext.event.Event.TAB
						      ],
						fn:function(k,e){
							if(field.isValid()){
								switch(k){
									case Ext.event.Event.ENTER:
									case Ext.event.Event.DOWN:
										//如果该字段指定了nextTargetId那么焦点就直接跳过去
										if(field.nextTargetId){
											var nextTarget = Ext.getCmp(field.nextTargetId);
	     	   					    		if(nextTarget){
	     	   					    			nextTarget.focus(false);	
	     	   					    			break;
	     	   					    		}
										}
										if(!(field instanceof Ext.form.field.TextArea)){
											if(field.nextTargetId){
												var nextTarget = form.down('[itemId='+field.nextTargetId+']');
		     	   					    		if(nextTarget){
		     	   					    			nextTarget.focus(false);	
		     	   					    			break;
		     	   					    		}
											}
											var nextField =field.nextSibling();
											if(nextField&& !(nextField instanceof Ext.form.field.Display))
												nextField.focus(true,true);
										}
										break;
									case Ext.event.Event.UP:
										if(!(field instanceof Ext.form.field.TextArea)){
											var prevField =field.previousSibling();
											if(prevField && !(prevField instanceof Ext.form.field.Display))
												prevField.focus(true,true);
										}
										break;
								}
							}else{
								field.focus(true,true);
							}
						}
					});
				});
		});
		/*form.on('afterrender',function(){
			//为了兼容IE浏览器,此处只能延后10ms以后执行才有效
			Ext.create('Ext.util.DelayedTask',function(){
				form.down('#firstFocusOn').focus(false);
			}).delay(30);
		});*/
	}
});
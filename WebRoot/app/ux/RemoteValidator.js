Ext.define('srm.ux.RemoteValidator',{
	extend:'Ext.AbstractPlugin',
	alternateClassName: 'srm.RemoteValidator',
	alias: 'plugin.RemoteValidator',
	config:{
		rvOptions:{
			passIsValid:true   //存在的即是校验通过的(这对密码来说是的)，对于代码检查来说已存在的反而是不能通过校验
       	}
	},
	//是否新增
	isAddNew:false,
	constructor: function(cfg) {
        var me = this;
        me.callParent(arguments);
        me.initConfig(cfg);
	},
	
	init:function(field){
		//init将在被插入Component.initComponent()被调用后执行
		var me = this;
		me.callParent(arguments);
        Ext.apply(field,{
        	//这两条必须指定为false,因为远程异步验证只有在onBlur时效率才比较高
        	//远程调用后由手工发起验证
        	validateOnBlur:false,
       	 	validateOnChange:false,
       	 	
        	rvSuccess:function(resp,options){
					var ret = Ext.decode(resp.responseText);
					if (!me.rvOptions.passIsValid&&ret.data||(me.rvOptions.passIsValid&&!ret.data)){
						//存在的即是校验通过的(这对密码来说是的)，对于代码检查来说已存在的反而是不能通过校验
						var vText = ret.message;
						Ext.apply(field,{
							validator:function(){return vText;}
						});
						Ext.create('Ext.util.DelayedTask',function(){
							 	field.focus();
					    }).delay(20);
					}else{
						Ext.apply(field,{validator:Ext.emptyFn()});
					}
					field.validate();
					
			},
			rvFailure:function(resp,options){
				
			}
           
        });
        field.on(
			'afterrender',
			function(){
				me.orginValue=field.getValue();
				if(me.orginValue==null&&me.orginValue==""){
				me.isAddNew=true;
				}
				this.on('blur',function(ff){
					//var v = ff.getValue();
					if(me.isAddNew){
						me.rvOptions = me.rvOptions||{};
					Ext.applyIf(me.rvOptions,{
			        	url:'',
			        	method:'post'}
					);
					//默认只校验本字段
					me.rvOptions.params =me.rvOptions.params||{};
					var vv =ff.getValue();
					if(Ext.isFunction(ff.encodeFunc)){
						vv = ff.encodeFunc(vv);
					}
					var vFieldsBody =[{
						field:ff.name,
						value:vv
					}];
					//如果设置了需要同时校验的其他字段
					if(me.rvOptions.vFields){
						var form=ff.up('form');
						Ext.each(me.rvOptions.vFields,function(vf){
							var vfCmp = form.getComponent(vf);
							if(vfCmp){
								var vv =vfCmp.getValue();
								if(Ext.isFunction(vfCmp.encodeFunc)){
									vv = vfCmp.encodeFunc(vv);
								}
								vFieldsBody.push({
									field:vf,
									value:vv
								});
							}
						});
					}
					if(me.rvOptions.vTexts){
						me.rvOptions.params.vText0 = me.rvOptions.vTexts[0];
						me.rvOptions.params.vText1 = me.rvOptions.vTexts[1];
					}
					me.rvOptions.params.valid_fields=Ext.encode(vFieldsBody);
					Ext.apply(me.rvOptions,{
			        	scope:ff,
			        	success: this.rvSuccess,
			        	failure: this.rvFailure
			        });
	       			 Ext.Ajax.request(me.rvOptions);me.rvOptions = me.rvOptions||{};
					Ext.applyIf(me.rvOptions,{
			        	url:'',
			        	method:'post'}
					);
					//默认只校验本字段
					me.rvOptions.params =me.rvOptions.params||{};
					var vv =ff.getValue();
					if(Ext.isFunction(ff.encodeFunc)){
						vv = ff.encodeFunc(vv);
					}
					var vFieldsBody =[{
						field:ff.name,
						value:vv
					}];
					//如果设置了需要同时校验的其他字段
					if(me.rvOptions.vFields){
						var form=ff.up('form');
						Ext.each(me.rvOptions.vFields,function(vf){
							var vfCmp = form.getComponent(vf);
							if(vfCmp){
								var vv =vfCmp.getValue();
								if(Ext.isFunction(vfCmp.encodeFunc)){
									vv = vfCmp.encodeFunc(vv);
								}
								vFieldsBody.push({
									field:vf,
									value:vv
								});
							}
						});
					}
					if(me.rvOptions.vTexts){
						me.rvOptions.params.vText0 = me.rvOptions.vTexts[0];
						me.rvOptions.params.vText1 = me.rvOptions.vTexts[1];
					}
					me.rvOptions.params.valid_fields=Ext.encode(vFieldsBody);
					Ext.apply(me.rvOptions,{
			        	scope:ff,
			        	success: this.rvSuccess,
			        	failure: this.rvFailure
			        });
	       			 Ext.Ajax.request(me.rvOptions);
					}else{
						if(field.validator){
		   				 	Ext.apply(field,{validator:Ext.emptyFn()});
		       			 }
					}
	       		});
				this.on('change',function(field){
					if(me.orginValue!=field.getValue()){
					  me.rvOptions = me.rvOptions||{};
					Ext.applyIf(me.rvOptions,{
			        	url:'',
			        	method:'post'}
					);
					//默认只校验本字段
					me.rvOptions.params =me.rvOptions.params||{};
					var vv =field.getValue();
					if(Ext.isFunction(field.encodeFunc)){
						vv = field.encodeFunc(vv);
					}
					var vFieldsBody =[{
						field:field.name,
						value:vv
					}];
					//如果设置了需要同时校验的其他字段
					if(me.rvOptions.vFields){
						var form=field.up('form');
						Ext.each(me.rvOptions.vFields,function(vf){
							var vfCmp = form.getComponent(vf);
							if(vfCmp){
								var vv =vfCmp.getValue();
								if(Ext.isFunction(vfCmp.encodeFunc)){
									vv = vfCmp.encodeFunc(vv);
								}
								vFieldsBody.push({
									field:vf,
									value:vv
								});
							}
						});
					}
					if(me.rvOptions.vTexts){
						me.rvOptions.params.vText0 = me.rvOptions.vTexts[0];
						me.rvOptions.params.vText1 = me.rvOptions.vTexts[1];
					}
					me.rvOptions.params.valid_fields=Ext.encode(vFieldsBody);
					Ext.apply(me.rvOptions,{
			        	scope:field,
			        	success: this.rvSuccess,
			        	failure: this.rvFailure
			        });
	       			 Ext.Ajax.request(me.rvOptions);
					}else{
					if(field.validator){
		   				 	Ext.apply(field,{validator:Ext.emptyFn()});
		       			 }
		       			 field.validate();
					}
		       		 });
			},field);
	}
});
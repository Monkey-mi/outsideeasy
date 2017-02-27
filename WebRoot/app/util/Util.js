Ext.define('srm.util.Util',{
requires: ['srm.def.Const'
	           ,'srm.basic.store.CodeTypes'
	           ,'srm.basic.store.CodeConfigs'
	           ,'srm.util.data.DataUtil'
	           ,'srm.org.store.OrgUnit'
	           ,'Ext.ux.TabReorderer'
	           ,'Ext.ux.TabCloseMenu'
	           ,'srm.module.model.Module'
	           ,'srm.module.store.Functions'
	           ,'srm.basic.store.Codes'
	           ],
init:function(callbackFn){
	var me=this;
	//0.同步判断是否登录
	if(!srm.Const.checkLogin()){
		return;
	}
	//1、初始化菜单
	Ext.Ajax.request({
		method:'post',
		async:false,		//同步
		url:'common/Modules.do?method=getSystemModule',
		success:function(response, opts){
			var result=Ext.decode(response.responseText);
			if(!Ext.isEmpty(result.data)){
				me.data=Ext.decode(result.data);
			}
		}
	});
	//2、初始化用户
	srm.UInfo.init(function(){
			srm.DataUtil.DataLoad();
            me.CodeTypeStore = Ext.create('srm.basic.store.CodeTypes');
            me.CodeTypeStore.load({
                params: {
                    basic: false
                }
            });
          });
	Ext.apply(me.data,{"sayHolle":me.sayHello()+me.currentUser.name});
	
	//回调函数
	if(!Ext.isEmpty(callbackFn)&&Ext.isFunction(callbackFn)){
			Ext.callback(callbackFn,me);
	}
},
sayHello: function () {
			    var hour = new Date().getHours(),
			     hello = '';
			    if (hour < 6) {
			        hello = '凌晨好';
			    } else if (hour < 9) {
			        hello = '早上好';
			    } else if (hour < 12) {
			        hello = '上午好';
			    } else if (hour < 14) {
			        hello = '中午好';
			    } else if (hour < 17) {
			        hello = '下午好';
			    } else if (hour < 19) {
			        hello = '傍晚好';
			    } else if (hour < 22) {
			        hello = '晚上好';
			    } else {
			        hello = '夜里好';
			    }
			    return hello + ' ! ';
		},	
	getFormatText: function(typeCode, value) {
		// 根据类型过滤后再查找,查不到的返回原值
		// 用于给列表的代码提供名称
		return srm.DataUtil.getCBXValueByDis(typeCode, value);
	},
	/**mod_code  一级模块代码
	 * extraCfg.second_mod_code 二级模块代码  extraCfg形式为{second_mod_code:010001}
	 * loadModule(01,{second_mod_code:010001})   具体的二级模块，快捷入口
	 * loadModule(01)  加载一级模块，默认该级别额度第一个二级模块
	 * **/
	loadModule: function(mod_code,extraCfg,cbFunc){
		var me = this;
		Ext.Ajax.request({
	       	  url: 'common/Modules.do?method=getModuleByModIdCode',
	       	  method:'post',
	       	  params:{
	       		mod_code : mod_code
	       	  },
	       	   success:function(resp){
	       		   var text=resp.responseText;
	       		   var dataRecs=Ext.decode(text).data;
	       		   if(dataRecs.length>0){
	       			   if(extraCfg && Ext.isObject(extraCfg)){
	       				  me.applyNull(dataRecs[0].extraCfg,dataRecs[0].extraCfg);
	       			   }
	       			   var modRec = Ext.create('srm.module.model.Module',dataRecs[0]);
	       			   me.loadModuleMC(modRec,cbFunc);
	       		   }
	       	   }
		});
	},
	/**rec:模块对象记录
	 * middleview：表示将要被代替的中间组件*/
	loadModuleMC:function(rec,cbFunc){
		var modId = rec.get('mod_id');
		if(Ext.isEmpty(modId)){
		    modId = rec.get('id');
		}
		var tabId = srm.Util.getModuleTabId(modId);
		var tabObj=srm.Const.mainView.down('maincenter').getComponent(tabId);
		
		if(tabObj){
			//已经打开过的，无需再次开启
			this.showContentTab(tabObj);
			return;
		}
		var urlType,urlStr,modCtrller,modView,modExtraCfg;
		urlType = rec.get('urltype');
		urlStr =  rec.get('url');
		modCtrller = rec.get('ctrller');
		modView = rec.get('jsview');
		modExtraCfg = rec.get('extraCfg');
		
		if(Ext.isEmpty(urlType)||urlType==srm.Const.URL_TYPE_PAGE){
			//是普通页面模块
			var tabObj = null;
			var isUrl = true;
			if(Ext.isEmpty(urlStr)){
				isUrl = false;
				urlStr ='模块定义存在问题,未设定请求路径!';
			}
			tabObj=this.loadPageModule(urlStr, rec,isUrl,tabId);
			if(Ext.isFunction(cbFunc)){
				cbFunc.call(this,tabObj);
			}
			return;
	    }else if(urlType==srm.Const.URL_TYPE_MODULE){
	    	//需要动态加载的模块
	    	//2013.06.20 开始支持两种配置方式
	    	var modObj ={};
	    	if(!Ext.isEmpty(modCtrller)){
	    		//通过ctrller,view,extraCfg三个字段加载
	    		modObj["controller"] = modCtrller;
	    		if(!Ext.isEmpty(modView)){
		    		if(modView.charAt(0)!='{')
		    			modView = '{'+modView+'}';
		    		modObj["view"]= Ext.decode(modView);
	    		}
	    		if(!Ext.isEmpty(modExtraCfg)){
	    			if(modExtraCfg.charAt(0)!='{')
	    				modExtraCfg = '{'+modExtraCfg+'}';
		    		modObj["extraCfg"]= Ext.decode(modExtraCfg);
	    		}
	    	}else{
	    		//兼容原来的模式，仍然从url中解释json加载
	    		if(Ext.isEmpty(urlStr)){
					urlStr ='模块定义存在问题,未设定请求路径!';
					var tabObj=this.loadPageModule(urlStr,rec,false,tabId);
					if(Ext.isFunction(cbFunc)){
						cbFunc.call(this,tabObj);
					}
					return;
				}
	    		modObj= Ext.decode(urlStr);
		    }
	    	if(!(modObj.controller&&modObj.view)||!(modObj.view.xtype||modObj.view.classType)){
	    		var tabObj = this.loadPageModule('请求定义有误:'+urlStr
	    				+'<br/>正确的格式为：模块控制器:ctrl_name,模块视图:{xtype:"xtype_name"||classType:"class_type"}，模块参数:{xxx:yyy}',
	    				rec,false,tabId);
	    		if(Ext.isFunction(cbFunc)){
					cbFunc.call(this,tabObj);
				}		
	    		return;
	    	}
	    	
	    	Ext.getBody().mask('正在加载,请稍候...');
	    	
	    	//异步加载模块相关组件
			//FF18 修正，改为同步加载模式。否则控制器的调用会引起require方法前后异常。
	    	Ext.syncRequire(srm.Const.application.getModuleClassName(modObj.controller));
	    	Ext.onReady(function(){
				var tabObj = this.loadCtrlModule(modObj,rec,tabId);
				if(Ext.isFunction(cbFunc)){
					cbFunc.call(this,tabObj);
				}
			    Ext.getBody().unmask();
	    	},this);
	    }else{
	    	Ext.Msg.alert('提示','模块菜单的[请求类型]有误,无法加载,请检查定义!');
	    }
	},
	
	loadPageModule: function(urlStr,rec,isUrl,tabId){
		//动态加载页面类型的模块
		Ext.getBody().mask('正在加载,请稍候...');
		var htmlStr ='';
		if(!Ext.isEmpty(isUrl)&&!isUrl)
			htmlStr='<strong>'+urlStr+'</strong>';
		else{
			//如果是html链接,
			htmlStr='<iframe src= "'+urlStr+'" width="100%" height="100%" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" ></iframe>';	
		}
		var	tabObj = this.addContentTab({
				itemId : tabId,
				title : rec.get('text'),
				iconCls:rec.get('iconCls'),
				html:htmlStr,
				closable:true
			});
		Ext.getBody().unmask();
		return tabObj;
	},
	loadCtrlModule: function(modObj,rec,tabId){
		var me = this;
		//动态加载controller及模块相关
		var module = null,
		ctrller =srm.Const.application.getController(modObj.controller);
		var modId = rec.get('mod_id');
        if(Ext.isEmpty(modId)){
            modId = rec.get('id');	
        }
		if(ctrller){
			srm.Util.getModuleFuncs(modId,function(modFunsBack){
				modObj.extraCfg = modObj.extraCfg||{};
				modObj.extraCfg.modName=rec.get('text');
				modObj.runMode = modObj.extraCfg.runMode?modObj.extraCfg.runMode:srm.Const.MODULE_RUN_MODE_TAB;
				//先初始化controller
				ctrller.init();
				if(!Ext.isEmpty(modObj.view.xtype)){
					//根据xtype加载
					if(modObj.runMode == srm.Const.MODULE_RUN_MODE_TAB){
						//根据运行模式不同处理,加入tab页
						var cfg = {
								itemId:tabId,
								header:false,
								xtype:modObj.view.xtype,
								title:rec.get('text'),
								closable:true,
								reorderable : true,
								modId : modId,
								mod_code:rec.get('mod_code'),
								modName : rec.get('text'),
								modFuncsDisabled:modFunsBack, 	//直接把功能权限控制赋给主控界面
								extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
							};
						if (Ext.util.Format.substr(rec.get('iconCls'),0,2)=='0x')
							cfg.glyph=parseInt(Ext.util.Format.substr(rec.get('iconCls'),2),16);
						else
							cfg.iconCls=rec.get('iconCls');
                        Ext.applyIf(cfg, modObj.extraCfg);
                        me.addContentTab(cfg);
					}else if(modObj.runMode == srm.Const.MODULE_RUN_MODE_WINDOW){
						//根据运行模式不同处理,打开窗口
						var cfg = {
                            modId : modId,
                            title:rec.get('text'),
                            closable:true,
                            modName : rec.get('text'),
                            mod_code:rec.get('mod_code'),
                            modFuncsDisabled:modFunsBack, //直接把功能权限控制赋给主控界面
                            extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
                        };
                        Ext.applyIf(cfg, modObj.extraCfg);
                        
						module=Ext.widget(modObj.view.xtype,cfg);
						module.show();
					}
				}
			});
		}
		return module;
	},
	getModuleFuncs: function(modId, callbackFun) {
		// 先填充modFuncsBack
		var allFuncStore = Ext.create('srm.module.store.Functions');
		var modFunsBack = {};
		allFuncStore.load({
			params: {
				mod_id: modId
			},
			callback: function(recs) {
				Ext.each(recs, function(rec) {
					if(!Ext.isEmpty(rec.get('type')) && rec.get('type')==1){
						modFunsBack[rec.get('code')]=1;//禁用
					}else{
						modFunsBack[rec.get('code')]= 3;
					}
					
				});
				// 再根据功能权限查询结果设置状态
				// 设置store
				var funcStore = Ext.create('srm.module.store.Functions', {
					proxy: {
						type: 'ajax',
						actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
						extraParams: {
							model: 'Function'
						},
						url: 'user/Users.do?method=getFuncListByUserModule',
						reader: {
							type: 'json',
							rootProperty: 'data',
							messageProperty: 'message'
						}
					}
				});
				// 设置状态
				funcStore.load({
					params: {
						u_id: srm.Util.currentUser.u_id,
						mod_id: modId
					},
					callback: function(recs2) {
						Ext.each(recs2, function(rec) {	
							if(!Ext.isEmpty(rec.get('type')) && rec.get('type')==1){
								modFunsBack[rec.get('code')]=2;//可用
							}else{
								modFunsBack[rec.get('code')]= 0;
							}
						});
						if(Ext.isFunction(callbackFun)){
							callbackFun.call(this || modFunsBack, modFunsBack);
						}
					}
				});
			}
		});

	},
	
	/*中间窗口更换组件
	 * 让主窗口开启一个tab页 参数：panelObj 格式如下： { itemId:'xxx', xtype:'xx_xtype',
	 * closable:true //以上三个参数必须，其他自便 } 返回值：返回创建的panel对象
	 */
	addContentTab:function(panelObj){
		var me = this;
		panelObj.itemId = this.getModuleTabId(panelObj.itemId);	
		if(srm.Const.mainView){
			var tabObj = me.getContentTab().getComponent(panelObj.itemId);
            if(!tabObj){
                tabObj=me.getContentTab().add(panelObj);
                me.getContentTab().doLayout();
            }
            Ext.create('Ext.util.DelayedTask',function(){
                me.showContentTab(tabObj);
            }).delay(10);
            return tabObj;
		}else{
            // 如果不是在主框架中，那么就创建一个弹出窗口代替
            panelObj.closable = true;
            var winObj = {
                width: 1024,
                height: 700,
                maximizable: panelObj.maximizable,
                modal: panelObj.modal,
                items: [panelObj]
            };
            var edtWin = Ext.widget('srmWindow', winObj);
            edtWin.setTitle(edtWin.down('#' + panelObj.itemId).title);
            edtWin.down('#' + panelObj.itemId).title = '';
            edtWin.show();
            return edtWin;
        }
        
	},
	getModuleTabId: function(id) {
		var tabId = id+"";
		if(!(tabId.indexOf(srm.Const.MODULE_TABID_PREFIX)>0))
		    tabId =  srm.Const.MODULE_TABID_PREFIX + tabId;
		return tabId;
	},    
	showContentTab:function(tabObj){
		if(tabObj){
			this.getContentTab().setActiveTab(tabObj);
    		tabObj.show();
    		tabObj.tab.show();
		}
	},
	getContentTab: function(){
        return srm.Const.mainView.down('maincenter');
    },
    getCombxStore: function(typeCode) {
		// 根据类型过滤后产生一个内存store
		// 一般用于下拉Comobox
		return srm.DataUtil.getComboStore(typeCode);
	},
		/**
	 * 将config里的属性拷贝到p中 如果config的属性值为假（null undefined 空字符串 0不包含在内）则将p中的同名属性删除
	 * 
	 * @param p
	 * @param config
	 */
	applyNull: function(p, config) {
		for(c in config){
			if(typeof (config[c]) == 'string'){
				config[c] = config[c].trim();
			}
			if((typeof (config[c]) == 'number') || !Ext.isEmpty(config[c])){
				p[c] = config[c]; 
			}else{
				delete p[c];
			}
		}
	},
	//获取字符串的长度
	gettextlength:function(str) { 
	  var len = 0; 
	  if(Ext.isEmpty(str)){
	  	return 0;
	  }
	  for (var i=0; i<str.length; i++) { 
	    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) { 
	       len += 2; 
	     } else { 
	       len ++; 
	     } 
	   } 
	  return len; 
	},
	//获取项目路径
 	getwebroot:function(){
		var location = (window.location+'').split('/');
		var basePath = location[0]+'//'+location[2]+'/';
		return basePath;
	},
	isInited: false	
},
function(){
	srm.Util = srm.util.Util= new this();
});
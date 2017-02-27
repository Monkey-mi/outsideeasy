//数据处理工具包
Ext.define('srm.util.data.DataUtil',{
	requires:['srm.util.data.DataManager',
	          'srm.util.data.Const'
    ],
	//将store置入storeManager
	init:function(){
		var me=this;
		/**
		 * 数据配置store
		 */
		var Config;
		var CBXStore;
		var codeConfig;
		var DataManager=new srm.util.data.DataManager();
		me.initProMises();
		me.initAutoStore();
		/**
		 * 向dataManager注册store
		 */
		me.setStoreToStoreManager=function(store){    
			var look=null;
			if(store.storeId){
				look=DataManager.lookup(store.storeId);
			}
			if(!look){
				DataManager.register(store);
			}
		};
		me.initAutoStore();
		me.addRec=function(storeId,record){
		   if(DataManager.lookup(storeId)){
		   DataManager.lookup(storeId).loadData(record,true);
		   }
		};
		/**
		 * 表单数据源注册
		 */
		me.setFormStoreToStoreManager=function(store){
			var look=null;
			if(store.storeId){
				look=DataManager.lookup(store.storeId);
			}
			if(!look){
				DataManager.register(store);
				if(store.getRange().length==0){
					store.load();
				}
			}
		};
		/**
		 * 查找store方法
		 * 参数为，storeId与storeName
		 * 先从DataManger里面找
		 * 如果没有则根据storeName创建一个并注册到DataManager中
		 */
		me.findStore=function(storeId,storeName){
			var look=me.getStoreByStoreManager(storeId);
			var returnstore;
			var storeTest=Ext.create('srm.basic.store.CodeConfigs');
			if(!look&&storeName){
				look=me.createStoreFactory(storeName);
				returnstore=me.createStoreFactory(storeName);
				look.storeId=storeId;
				look.getProxy().setExtraParam('usePaging',false);
				if(look){
					me.setStoreToStoreManager(look);
					/*look.load({
						callback:function(recs){
							
							if(recs){
								returnstore.loadData(recs,true);
							}
						}
					});*/
				}
			}else if(look){
				returnstore=me.clone(look);
			}
			return returnstore;
		};
		/*
		 * 从manager中取出所对应的的store
		 * storeId用以识别store
		 */
		me.getStoreByStoreManager=function(storeId){
			var store=null;
			if(DataManager.lookup(storeId)){
				store=me.clone(DataManager.lookup(storeId));
			}
			return store;
		};
		
		
		//构造现有的store方法
		//stringName store的类名 
		me.createStoreFactory=function(StringName, usePaging, config){
			var store;
			var storeClass;
			var proxy;
//			storeClass=Ext.ClassManager.get(StringName);
			store=Ext.create(StringName,config);
			if(storeClass){
				proxy=storeClass.prototype.proxy;
				var proxys=ObjectApply({},proxy);
				store.setProxy(proxys);
			}
			Ext.apply(store.proxy.extraParams, {
				usePaging: !!usePaging
			});
			return store;
		};
		ObjectApply=function(target,src){
		    for(var p in src){
		    	var value=src[p];
    		    if(Ext.isEmpty(value)){
    		      delete target[p];
    		    }else if(Ext.isObject(value)){
    		      target[p]=ObjectApply({},value);
    		    }else{
    		      target[p]=value;
    		    }
		    }
		    return target;
		};
		me.ObjClone=function(src,tar){
			var me=this;
			
		};
		//设置store默认参数
		//store数据源，参数对象
		me.setParams=function(store,params){
			var proxy=store.getProxy();
			for(var key in params){
				proxy.setExtraParam(key,params[key]);
			}
		};
		
		
		
		
		//设置store的后台服务请求
		//@params store, cpi
		me.setCpi=function(store,Cpi){
			var proxy=store.getProxy();
			var cpi=proxy.api;
			for(var key in Cpi){
				cpi[key]=Cpi[key];
			}
		};
		
		
		
		/**
		 * 根据代码寻找基础数据配置
		 * code 基础数据代码
		 * 从codeConfig中寻找
		 */
		me.findConfig=function(type){
			var rec=this.getStoreByStoreManager(srm.DataConst.CODE_CONFIG).findRecord('code',type,0,false,false,true);
			return rec;
		};
		
		/**
		 * 
		 */
		me.getStoreByType=function(type){
			var me=this;
			var rec=this.findConfig(type);
			if(rec.get('type')==srm.DataConst.DICTIONARY){
				return me.getComboStore(type);
			}else{
				return me.getStoreByStoreManager(type);
			}
		};
		
		
		
		/*
		 * 取名称值对
		 * storeid,显示值，显示字段，值字段
		 */
		me.findNameValue=function(storeId,value,displayfield,valuefield){
			var regtext;
			if(DataManager.lookup(storeId)){
				if(DataManager.lookup(storeId).findRecord(valuefield,value,0,false,false,true)){
					var regtext=DataManager.lookup(storeId).findRecord(valuefield,value,0,false,false,true).get(displayfield);
				}
			}
			return regtext;
		};
		// 取数据
		//storeId数据源id,字段名，字段值  
		me.findRecByStore=function(storeId,type_code,value){
			var model=null;
			if(DataManager.lookup(storeId)){
				var rec=DataManager.lookup(storeId).findRecord(type_code,value,0,false,false,true);
				if(rec){
					return rec;
				}
				return model;
			}
			return model;
		};
		/**
		 * 基础数据同步方法
		 * @param store,rec
		 */
		me.sync=function(store,rec){
			//先给store赋值
			var syncStore=Ext.isString(store)?DataManager.lookup(store):store;
				if(!syncStore){
					return;
				}
				if(rec){
					if(!syncStore.findRecord(rec.idProperty,rec.get(rec.idProperty))){
						syncStore.add(rec);  
					}
					else{
						var model=syncStore.findRecord(rec.idProperty,rec.get(rec.idProperty));
						Ext.each(model.fields.items,function(field){
							var fieldName=field.name;
							model.set(fieldName,rec.get(fieldName));
						});
					}
				}
				syncStore.sync();
		};
		/**
		 * 数据源克隆方法
		 * @params srcstore 需要克隆的数据源或是数据源id
		 */
		me.clone=function(srcstore){
			var srcstore=Ext.isString(srcstore)?DataManager.lookup(store):srcstore;
			var storeName=srcstore.$className;
			var storeId=srcstore.storeId;
			var recs=srcstore.getRange();
			var store=me.createStoreFactory(storeName,false);
			if(store){
				store.loadData(srcstore.getRange(),true);
				if(storeId){
					store.storeId=storeId;
				}
			}
			return store;
		};
		/**
		 * storeManager的填充
		 */
		me.createStoreManager=function(CodeTypeStore,StoreManager){
			CodeTypeStore.filter({
				property:'attrib',value:'CBX' 
			});
			var recs=CodeTypeStore.getRange();
			
			Ext.each(recs,function(rec){
				if(rec.get('window_type')!='FregHelp'&&rec.get('window_type')!=null&&rec.get('window_type')!=""&&rec.get('window_type')!="code_help"&&rec.get('window_type')!="basic_codehelp"){
					if(!DataManager.lookup(rec.get('type_code'))){
						var store=me.createStoreFactory(rec.get('store'), false);
						store.storeId=rec.get('type_code');
						DataManager.register(store);
						store.load({
							callback:function(){
								Ext.data.StoreManager.register(me.clone(store));
							}
						});
					}
				}
			});
			CodeTypeStore.clearFilter(true);
		};
		me.getCodeStoreFilterType=function(type,typeCode){
			srm.Util.combxStore.filter();
		};
		/**
		 * 基础数据加载方法
		 */
		me.DataLoad=function(){
			var me=this;
			/**
			 * 下拉数据仓库初始化
			 */
			var codeStore=srm.DataUtil.createStoreFactory('srm.basic.store.Codes');
			codeStore.load({
				//async:false,
				params:{
					type_attrib:srm.Const.TYPE_ATTRIB_CBX
				},
				callback:function(){
					CBXStore=codeStore;
					srm.Util.combxStore=me.clone(codeStore);
				}
			});
			/**
			 * 基础数据配置初始化
			 */
			var CodeStore=me.createStoreFactory('srm.basic.store.Codes',false,{storeId:'Code'});
			me.CodeConfigLoad();
			me.test();
            DataManager.lookup(srm.DataConst.CODE_CONFIG).load();
		};
		me.test=function(){
		};
		/**
		 * 普通基础数据加载
		 */
		me.CodeConfigLoad=function(){
			var me=this;
			var recs=srm.DataConst.Config.getRange();
			Ext.each(recs,function(rec){
				me.findStore(rec.get('code'),rec.get('store'));
			});
		};
		/**
		 * 获取字典	
		 */
		me.getComboStore=function(typeCode){
			var src=CBXStore;
			CBXStore.filter({property:'type_code',value:typeCode});
			target=me.clone(CBXStore);
			target.getProxy().setExtraParam('type_code',typeCode);
			CBXStore.clearFilter(true);
			return target;
		};
		/**
		 * 根据字典值获取名称
		 */
		me.getCbxNameByValue = function(typeCode, v){
			return me.getCBXValueByDis(typeCode, v);
		};
		/**
		 * 
		 */
		me.getCBXValueByDis=function(typeCode,v){
			var rec = me.getCBXRec(typeCode,v);
			if(rec){
				return rec.get('name');
			}
			return v;
		};
		me.getCBXRec=function(typeCode,v){
			CBXStore.clearFilter(true);
			CBXStore.filter({property:'type_code',value:typeCode});
			var rec=CBXStore.findRecord('value',v,0,false,false,true);
			CBXStore.clearFilter(true);
			return rec;
		};
		
		me.comboReload=function(){
			CBXStore.load({
				params:{
					type_attrib:srm.Const.TYPE_ATTRIB_CBX
				}
			});
		};
		/**
		 * 根据所给的参数来进行store的筛选
		 * @param config 参数对象，store属性，type属性，value属性
		 */
		me.storeFilter=function(config){
			var store=Ext.isString(config.store)?DataManager.lookup(config.store):config.store;
			var returnStore=null;
			if(store){
				store.filter({
					property:config.type,value:config.value
				});
				returnStore=me.createStoreFactory(store.$className);
			}
			return returnStore;
		};
		
		/**
		 *  为store增加record
		 */
		me.addRecord=function(storeId,model){
			var store=DataManager.lookup(storeId);
			var rec=null;
			if(store){
				rec=store.findRecord(model.idProperty,model.get(model.idProperty),0,false,false,true);
			    if(!rec){
			    	store.loadData(model,true);
			    }
			}
		};
	},
	initAutoStore:function(){
	  var me=this;
	  me.autoStore=function(config){
	     this.store=config.store;
	     this.idProperty=this.store;
	     this.removeRecord={};
	     this.insertRecord={};
	     this.updatedRecord={};
	     this.data={};
	     this.url={};
	     this.url.insert=this.store.getProxy().api.insert;
	     this.url.destory=this.store.getProxy().api.destory;
	     Ext.each(this.store.getRange(),function(rec){
	     	if(!this.idProperty){
	     	this.idProperty=rec.idProperty;
	     	}
	       var key=me.createDataKey();
	       this.data[key]=rec;
	     });
	     this.store.on({
	      add:function(store,records){
	      this.add(records);
	      },
	      update:function(store,records){
	      this.update(records);
	      },
	      remove:function(store,records){
	      this.remove(records);
	      },
	      scope:this
	     });
	  };
	  me.autoStore.prototype={
	    add:function(records){
	    	var store=this;
	      Ext.each(records,function(rec){
	      	var key=me.createDataKey(rec.data); 
	      	 if(store.removeRecord[key]){
	      	   delete store.removeRecord[key];
	      	 }else{
	      	 store.insertRecord[key]=rec.data;
	      	 }
	      	 if(!store.data[key]){
	      	 store.data[key]=rec.data;
	      	 }
	      });
	    },
	    update:function(records){
	    },
	    remove:function(records){
	    	var store=this;
	      Ext.each(records,function(rec){
	      	var key=me.createDataKey(rec.data); 
	      	 if(store.insertRecord[key]){
	      	   delete store.insertRecord[key];
	      	 }else{
	      	   store.removeRecord[key]=rec.data;
	      	 }
	      	 if(store.data[key]){
	      	  store.data[key]=null;
	      	 }
	      });
	    },
	    sync:function(){
	    	this.insert();
	    	this.destory();
	    },
	    insert:function(){
	    var store=this;
	    var data=[];
	     for(var key in store.insert){
	          data.push(insert[key]);
	       }
	    Ext.Ajax.request({
	      url:store.url.insert,
	      params:{
	          data:Ext.encode(data)
	      }
	    });   
	    },
	    destory:function(){
		    var store=this;
		    var data=[];
		     for(var key in store.remove){
		          data.push(remove[key]);
		       }
		    Ext.Ajax.request({
		      url:store.url.remove,
		      params:{
		          data:Ext.encode(data)
		      }
		    });
	    },
	    findRecord:function(key){
	      return this.data[key];
	    }
	  };
	},
	/**
	 * 初始化promise异步模型
	 */
	initProMises:function(){
		var me=this;
		me.Promise = function(ok){
		    this.state = 'unfulfilled';
		    this.ok = ok || function(obj) { return obj; };
		    this.thens = [];
		};
		me.Promise.prototype = {
		    resolve: function(obj,again){
		        if (this.state != 'unfulfilled'&&!again) throw '已完成，不能再次resolve';
		        this.state = 'fulfilled';
		        this.result = this.ok(obj); // 执行ok
		        for (var i=0, len=this.thens.length; i<len; ++i){
		            // 依次调用该任务的后续任务
		            var then = this.thens[i];
		            this._fire(then.promise, then.ok);
		        }
		        return this;
		    },
		    _fire: function(nextPromise, nextOK){
		        var nextResult = nextOK(this.result); // 调用nextOK
		        if (nextResult instanceof me.Promise){
		            // 异步的情况，返回值是一个Promise，则当其resolve的时候，nextPromise才会被resolve
		            nextResult.then(function(obj){
		                nextPromise.resolve(obj);
		            });
		        }else{
		            // 同步的情况，返回值是普通结果，立即将nextPromise给resolve掉
		            nextPromise.resolve(nextResult);
		        }
		        return nextPromise;
		    },
		    _push: function(nextPromise, nextOK){
		        this.thens.push({
		            promise: nextPromise,
		            ok: nextOK
		        });
		        return nextPromise;
		    },
		    then: function(nextOK){
		        var promise = new me.Promise();
		        if (this.state == 'fulfilled'){
		            // 如果当前状态是已完成，则nextOK会被立即调用
		            return this._fire(promise, nextOK);
		        }else{
		            // 否则将会被加入队列中
		            return this._push(promise, nextOK);
		        }
		    },
		    /**
		     * 
		     * @param nextOK
		     */
		    thenRequest:function(nextOK){
		    	var promises=new me.Promise();
		    	var success=nextOK.success;
		    	 //重写success方法
		    	nextOK.success=function(resp){
		    		//需要返回值作为参数传递到一下个方法中
		    		var result=success(resp);
		    		promises.resolve(result);
		    	};   
		    	//构造真正执行的ajax方法
		    	var Ajax=function(){
		    		Ext.Ajax.request(nextOK);
		    		return promises;
		    	};
		    	 var promise = new me.Promise();
			        if (this.state == 'fulfilled'){
			            // 如果当前状态是已完成，则nextOK会被立即调用
			            return this._fire(promise, Ajax);
			        }else{
			            // 否则将会被加入队列中
			            return this._push(promise, Ajax);
			        }
		    }
		};
	},
	/**
	 * 
	 */
	request:function(success){
		var request=Ext.Ajax.request;
		Ext.Ajax.request.list=[];
		Ext.Ajax.request.then=function(option){
			var me=this;
			this.list.push(option);
		};
		Ext.Ajax.request._fire=function(){ 
			
		};
		Ext.Ajax.request.resolve=function(){
			
		};
	},
	createDataKey:function(data){
	   var me=this;
	   var key="";
	   for(var p in data){
	     key=key+p+data[p];
	   }
	   return key;
	},
	isInited: false
},function(){
    srm.DataUtil= srm.util.data.DataUtil = new this();
    srm.DataUtil.init();
});


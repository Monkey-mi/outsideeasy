Ext.define('srm.util.AppUtil', {
	/**
	 * 返回一个带颜色样式的HTML字符串
	 * @param text 字符串
     * @param color 颜色 可选 默认值 brown
	 */
	colorText: function(text, color){
		return Ext.String.format('<span style="color:{0}">{1}</span>',color||'brown',text);
	},
	/**
     * 根据编码方案代码获得一个新的编码
     * @param cgrCode --编码方案代码
     * @param user_params --逗号分开的一组用户参数,可以省略
     * @return 返回一个新的编码，有错则返回空串             
     */
	getSeqCodeBycgrCode: function(cgrCode,userParams) {
        return srm.Const.callServiceMethodSync('codegen/BaseSeqService.do?method=getSimpleCgrByCode', {
            code: cgrCode,
            user_params:userParams
        });
    },
    /**
     * 根据编码方案代码获得一个新的编码
     * @param cgrCode --编码方案代码
     * @param instCode --编码实例代码
     * @param user_params --逗号分开的一组用户参数,可以省略
     * @return 返回一个新的编码，有错则返回空串             
     */
    getSeqCodeBycgrCodeEx: function(cgrCode,instCode,userParams) {
        return srm.Const.callServiceMethodSync('codegen/BaseSeqService.do?method=getSimpleCgrByCode', {
            code: cgrCode,
            instCode: instCode,
            user_params:userParams
        });
    },
	/**
	 * 根据代码检查编码规则的有效性
	 * @param {} cgrCode
	 * @return {} true | false
	 */
    getCodeGenRuleStatus:function(cgrCode){
    	var isValid = false;
      	Ext.Ajax.request({
            url:"codegen/BaseSeq.do?method=getCGRStatus",
            actionMehtods:'post',
            async: false,
            params:{
                code:cgrCode
            },
            success:function(resp){
                isValid=Ext.decode(resp.responseText).data;
            }
        });
        return isValid;
    },
    /**
	 * 获取一条编码规则的用户参数组成
	 * @param params cgrCode --规则代码
	 * @return 返回值为逗号隔开的字符串，按顺序列出该条规则中存在用户参数；制定的规则不存在或者没有用户参数时返回空串
	 */
	getCodeGenRuleUserParams:function(cgrCode){
		var uParams = "";
      	Ext.Ajax.request({
            url:"codegen/BaseSeqs.do?method=getCodeGenRuleUserParams",
            actionMehtods:'post',
            async: false,
            params:{
                code:cgrCode
            },
            success:function(resp){
                uParams=Ext.decode(resp.responseText).data;
            }
        });
        return uParams;
	},
    /**
     * 根据代码刷新编码规则的应用服务端计数缓存
     * @param {} cgrCode
     */
    clearCgrCacheByCode:function(cgrCode){
        srm.Const.callServiceMethod('codegen/BaseSeqService.do?method=clearCgrCacheSrv',
            {
                code:cgrCode
            },
            function(result,errMsg,total){
                if(!Ext.isEmpty(result)){
                    if(!result){
                        Ext.Msg.alert('刷新应用服务端计数缓存出错了:',errMsg);
                    }                                               
                }else{
                    Ext.Msg.alert('刷新应用服务端计数缓存出错了:',errMsg);
                }
                
            }
        );
    }
   
},function(){
    srm.AppUtil = srm.util.AppUtil= new this();
});
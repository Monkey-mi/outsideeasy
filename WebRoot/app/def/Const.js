Ext.define('srm.def.Const', {
	SUPER_ROLE: "admins", // 超级角色
	SUPER_USER: "admin", // 超级用户
	AJAX_ERR_CODE: 'ajaxErrorCode',
	TYPE_ATTRIB_CBX:'CBX',
	AJAX_SERVICE_MESSAGE: 'message',
	AJAX_SERVICE_TOTAL: 'total',
	AJAX_DATA_ROOT: 'data',
	HTTP_STATUS_200_OK: 200,
	AJAX_ERR_CODE_200_OK: 200,
	AJAX_ERR_CODE_300_ERROR: 300,
	AJAX_ERR_CODE_999_SessionTimeOut: 999,
	
	
	DATEFORMAT_TYPE:'DATEFORMAT_TYPE',
	CODEPART_TYPE: 'CODEPART_TYPE', // 编码组成类别
	CODEPART_TYPE_SYSDATE: '_sysdate_', // 系统日期
	CODEPART_TYPE_INCRSEQ: '_incrseq_', // 自增序号
	CODEPART_TYPE_FIXEDTEXT: '_fixedtext_', // 固定文本
	CODEPART_TYPE_FORMFIELD: '_formfield_', // 单据字段
	CODEPART_TYPE_USERPARAM: '_userparam_', //用户参数
	USERPARAM_TYPE: 'USERPARAM_TYPE', //用户参数类型
	INCRSEQ_RESETMODE_NOT: 'not',       //无需重置,超出后自动归零
	INCRSEQ_RESETMODE_DAY: 'day',       //每天重置
	INCRSEQ_RESETMODE_WEEK: 'week',     //每周重置
	INCRSEQ_RESETMODE_MONTH: 'month',   //每月重置
	INCRSEQ_RESETMODE_YEAR: 'year',     //每年重置
	INCRSEQ_RESETMODE:'INCRSEQ_RESETMODE',
	YESNO_TYPE: 'YESNO_TYPE',
	YESNO_TYPE_YES: 'true',
	YESNO_TYPE_NO: 'false',
	
	ONEZERO_TYPE:'ONEZERO_TYPE',
	ONEZERO_TYPE_ONE:1,
	ONEZERO_TYPE_ZERO:0,
	
	URL_TYPE: 'URL_TYPE',
	URL_TYPE_PAGE: 'page',
	URL_TYPE_MODULE: 'module',
	
	FUNC_ITEMID_BTN_ADD: 'BTN_ADD',
	FUNC_ITEMID_BTN_EDT: 'BTN_EDT',
	FUNC_ITEMID_BTN_DEL: 'BTN_DEL',
	FUNC_ITEMID_BTN_RESET:'BTN_RESET',
	FUNC_ITEMID_BTN_REFRESH: 'BTN_REFRESH',
	// 模块运行方式
	MODULE_RUN_MODE_TAB: 'tab',
	MODULE_RUN_MODE_WINDOW: 'win',
	MODULE_TABID_PREFIX: 'module_tabid_',
	
	MODULE_TYPE: 'MODULE_TYPE',
	MODULE_FUNCS: 'MODULE_FUNCS',
	MODULE_TYPE_SYS: 'SYS',
	MODULE_TYPE_APP: 'APP',
	MODULE_TYPE_OTHER: 'OTHER',
	MODULE_TYPE_FORM: 'FORM',
	SEX_TYPE:'SEX_TYPE',
	USE_PAGING: 'usePaging',
	LOGIN_PAGE: 'login.html',
	BG_LOGIN_PAGE: 'bgLogin.html',
	MAIN_PAGE: 'bgIndex.html',
	onAjaxResponse: function(conn, resp, options, eOpts) {

		// Ext.log('------------url='+options.url);
		// 对所有的AJAX调用返回结果进行处理
		var errMsg = '';
		if(resp.status == srm.Const.HTTP_STATUS_200_OK || Ext.isEmpty(resp.status)){
			var ajaxRet = Ext.decode(resp.responseText);
			if(ajaxRet[srm.Const.AJAX_ERR_CODE] == srm.Const.AJAX_ERR_CODE_999_SessionTimeOut){
				// 超时处理
				/*
				 * 因为无法区分到底是本地缓存发起还是真的超时，去掉此处提示，直接跳转到BG_LOGIN_PAGE
				 * Ext.Msg.alert('提示','由于长时间未操作,会话已超时,请重新登录!',function(){
				 * if(typeof(srm.Util)!='undefined') delete srm.Util.currentUser;
				 * window.top.location.href = srm.Const.BG_LOGIN_PAGE; });
				 */

				// 正常情况下需要重定向到BG_LOGIN_PAGE,但在打包模式下属于simple_sys则无需这样处理
				if(typeof (g_simple_sys) == 'undefined'){
					if(typeof (srm.Util) != 'undefined')
						delete srm.Util.currentUser;
					window.top.location.href = srm.Const.BG_LOGIN_PAGE;
				}
				return;
			}
			// 返回正确无需处理错误
			if(ajaxRet.success == true)
				return;
			else{
				// 增加用户自定义处理事件userexception
				if(!Ext.isEmpty(srm.Const.application)){
					srm.Const.application.fireEvent('userexception', resp.responseText);
				}
			}
			errMsg = ajaxRet.message;
		}else{
			// 这里一般都是HTTP层级的错误
			errMsg = resp.responseText;
		}
		// 所有请求错误信息显示
		var errObj = {
			responseStatus: resp.status + '-' + resp.statusText,
			requestUrl: options.url,
			responseText: errMsg
		};
		// 延迟200ms跳出以免被其他错误窗口覆盖
		Ext.create('Ext.util.DelayedTask', function() {
			srm.ErrorWin.showError(errObj);
		}).delay(200);

	},
	/**
	 * 异步调用服务方法
	 * 
	 * @param methodUrl
	 *            服务方法路径如：'form/FormService.do?method=existsFormTable'
	 * @param postData
	 *            提交数据格式形如{srm.Const.AJAX_DATA_ROOT:dataTopost}
	 * @param callBackFun(result,errMsg,total,ajaxCode)
	 *            回调函数，当result为空时(!Ext.isEmpty(result)||Ext.isArray(result))表示有错误,
	 *            因为查询等返回的result可能为一个空数组表示有错), 具体参看errMsg
	 *            要求被调用服务返回数据必须放在srm.Const.AJAX_DATA_ROOT
	 * @param opts
	 *            可以额外增加一些 Ext.Ajax.request支持的参数
	 */
	callServiceMethod: function(methodUrl, postData, callBackFun, opts) {
		var me = this;
		var reqOptions = {
			url: methodUrl,
			method: 'POST',
			params: postData,
			callback: function(options, success, resp) {
				var retObj = Ext.decode(resp.responseText);
				// 此处的success 和 retObj.success 有区别
				// ExtJS 根据http_status来判断 success = (status >= 200 && status <
				// 300) || status == 304
				// 而我们要根据服务返回的success状态判断
				// 而AJAX_ERR_CODE - 200 为服务正常
				// - 300 为服务调用错误
				// - 999 为超时
				if(retObj.success)
					if(Ext.isFunction(callBackFun)){
						Ext.callback(callBackFun, me, [retObj[srm.Const.AJAX_DATA_ROOT], retObj[srm.Const.AJAX_SERVICE_MESSAGE],
								retObj[srm.Const.AJAX_SERVICE_TOTAL], retObj[srm.Const.AJAX_ERR_CODE]]);
					}
			}
		};
		opts = opts || {};
		Ext.apply(reqOptions, opts);
		Ext.Ajax.request(reqOptions);
	},
	/**
	 * 同步调用服务方法,这个在一些情况下可能更加实用
	 * 
	 * @param methodUrl
	 *            服务方法路径如：'form/FormService.do?method=existsFormTable'
	 * @param postData
	 *            提交数据格式形如{srm.Const.AJAX_DATA_ROOT:dataTopost}
	 * @param opts
	 *            可以额外增加一些 Ext.Ajax.request支持的参数
	 * @return 返回一个类似于如下的JSON对象 { success:true, message:'成功!', data:'xxx',
	 *         total:0 }
	 */
	callServiceMethodSync: function(methodUrl, postData, opts) {
		var me = this;
		var retObj;
		var reqOptions = {
			url: methodUrl,
			async: false,
			params: postData,
			method: 'POST',
			callback: function(options, success, resp) {
				retObj = Ext.decode(resp.responseText).data;
			}
		};
		opts = opts || {};
		Ext.apply(reqOptions, opts);
		Ext.Ajax.request(reqOptions);
		return retObj;
	},
	MD5: function(inputText) {
		var hexcase = 0;
		var b64pad = '';
		var chrsz = 8;
		function hex_md5(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz));
		}
		function b64_md5(s) {
			return binl2b64(core_md5(str2binl(s), s.length * chrsz));
		}
		function hex_hmac_md5(key, data) {
			return binl2hex(core_hmac_md5(key, data));
		}
		function b64_hmac_md5(key, data) {
			return binl2b64(core_hmac_md5(key, data));
		}
		function calcMD5(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz));
		}

		function md5_vm_test() {
			return hex_md5('abc') == '900150983cd24fb0d6963f7d28e17f72';
		}

		function core_md5(x, len) {

			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for( var i = 0; i < x.length; i += 16){
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;

				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);

		}

		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		}
		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}
		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function core_hmac_md5(key, data) {
			var bkey = str2binl(key);
			if(bkey.length > 16)
				bkey = core_md5(bkey, key.length * chrsz);

			var ipad = Array(16), opad = Array(16);
			for( var i = 0; i < 16; i++){
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}

			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128);
		}

		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		}

		function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for( var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		}

		function binl2hex(binarray) {
			var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
			var str = '';
			for( var i = 0; i < binarray.length * 4; i++){
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		function binl2b64(binarray) {
			var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			var str = '';
			for( var i = 0; i < binarray.length * 4; i += 3){
				var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
						| ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
				for( var j = 0; j < 4; j++){
					if(i * 8 + j * 6 > binarray.length * 32)
						str += b64pad;
					else
						str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
				}
			}
			return str;
		}
		return hex_md5(inputText);
	},
	doLogin: function(loginId, pwd, vCode) {
		var result=false;
		Ext.Ajax.request({
			url: 'common/Users/doLogin2.do',
			params: {
				login_id: loginId,
				pwd: srm.Const.MD5(pwd),
				logintype:1,
				verify_code: vCode
			},
			async: false,
			success: function(resp, options) {
				var ret = Ext.decode(resp.responseText);
				if(ret.total > 0){
					window.location.href = srm.Const.MAIN_PAGE;
				}else{
					Ext.Msg.alert('提示',ret.message);
					result=true;
				}
			}
		});
		return result;
	},
	/**
	 * 退出
	 */
	doLogout: function() {
		var me = this;
		Ext.Ajax.request({
			url: 'common/Users/doLogout.do',
			params: {
				login_id: srm.Util.currentUser.loginId
			},
			method: 'POST',
			callback: function(options, success, resp) {
				var retObj = Ext.decode(resp.responseText);
				if(retObj.success){
					delete srm.Util.currentUser;
					window.location = me.BG_LOGIN_PAGE;
				}
			}
		});
	},
	/**
	 * 同步判断是否登录*/
	checkLogin: function() {
		var me = this;
		var result=false;
		Ext.Ajax.request({
			url: 'common/checkLogin.do',
			async:false,
			method: 'POST',
			callback: function(options, success, resp) {
				var retObj = Ext.decode(resp.responseText);
				if(retObj.success){
					result=true;
				}else{
					result=false;
					window.location = me.BG_LOGIN_PAGE;
				}
			}
		});
		return result;
	}
},function(){
    srm.Const = srm.def.Const = new this();
});
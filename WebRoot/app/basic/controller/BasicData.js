
Ext.define('srm.basic.controller.BasicData',{
	extend: 'Ext.app.Controller',
	requires: ['srm.def.Const',
	           'srm.util.Util',
	           'srm.def.ui.plugins.FormKeyMapper',
	           'srm.ux.PagingBar',
	           'srm.basic.store.Codes',
		       'srm.basic.store.CodeTypes'],
	models:['srm.basic.model.Code'],
	views: ['srm.basic.view.MngBasicData',
	        'srm.basic.view.EditCodeType',
	        'srm.basic.view.EditCode'
	        ],
    refs: [
	       //创建类型信息列表的一个引用，根据规则调用函数为this.getCodeTypeGrid()
	       {ref : 'codeTypeGrid',	selector:'mng_BasicData #typeGrid'},
	       {ref : 'codeGrid',		selector : 'mng_BasicData #codeGrid'}, 
	       {ref : 'edtCodeType',	selector:'edt_CodeType'},
	       {ref : 'edtCode',		selector : 'edt_Code'},
	       {ref : 'suitType', 		selector:'mng_BasicData #type_code_suit_type'}
	      ],  
    init: function(){
		//controller只初始化一次
		if(this.isInited) return ;
		var me = this;
		me.type_code=Ext.create('srm.basic.store.CodeTypes',{
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
		});
		this.control({
			'mng_BasicData':{
				afterrender:function(){
					this.typeStore = this.getCodeTypeGrid().getStore();
					this.typeStore.load();
					this.codeStore = this.getCodeGrid().getStore();
				}
			},
			'mng_BasicData #typeGrid button':{
				//响应类型信息窗口增、删、改按钮事件
				click: this.onMngTypeWinBtnClick
			},
			'edt_CodeType button':{
				//响应类型信息维护窗口按钮事件
				click: this.onEdtTypeWinBtnClick
			},
			'mng_BasicData #codeGrid' : {
				itemdblclick : this.onCodeGridItemdblclick
			},
			'mng_BasicData #codeGrid button' : {
				// 响应代码信息窗口增、删、改按钮事件
				click : this.onMngCodeWinBtnClick
			},
			'edt_Code button' : {
				// 响应代码信息维护窗口按钮事件
				click : this.onEdtCodeWinBtnClick
			}/*,
			'mng_BasicData #type_code_attrib' : {
				change : function(cbx, nv, ov) {
					var me = this;
					this.typeStore.load({
								params : {
									attrib : nv
								}
							});
				}
			},*/
		});
		
		//controller初始化完成
		this.isInited = true;
	},
	//响应类型信息窗口增、删、改按钮事件
	onMngTypeWinBtnClick: function(btn,event){
		//=============界面操作权限相关======================================
		//需要先检查操作权限
		if(!btn.up('mng_BasicData').modFuncsDisabled[btn.itemId]){
			switch(btn.itemId){
				case 'codetypeadd':
					this.doAddCodeType();
					break;
				case 'codetypeedt':
					this.doEditCodeType();
					break;
				case 'codetypedel':
					this.doDelCodeType();
					break;
				case 'codetyperef':
					this.typeStore.reload();
					break;
			}
		}
			
	},
	//响应类型信息维护窗口按钮事件
	onEdtTypeWinBtnClick: function(btn,event){
		var me=this;
		var edtWin = btn.up('edt_CodeType');
		switch(btn.action){
			case 'ACT_SAVE':
				var edtForm = edtWin.down('form');
				if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
					var rec = edtForm.getRecord();
					edtForm.updateRecord(rec);
					this.doSaveCodeType(rec);
					if(rec.get('attrib')=='CBX'&&edtWin.isAddNew){
						me.doSaveCodeConfig(rec);
					}
					edtWin.close();
				}
				break;
			case 'ACT_CLOSE':
				edtWin.close();
				break;
		}
	},
	onCodeGridItemdblclick: function(view,rec){
		this.doEditCode();
	},
	doAddCodeType: function(){
		var rec = Ext.create('srm.basic.model.CodeType',{
			attrib:srm.Const.TYPE_ATTRIB_CBX
		});
		var edtWin = Ext.widget('edt_CodeType',{isAddNew:true});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
	},
	doEditCodeType: function(){
		var selModel = this.getCodeTypeGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('edt_CodeType',{isAddNew:false,tcid:rec.get('tcid')});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
		
	},
	doDelCodeType: function(){
		//删除前需要做一些逻辑检查
		var me = this;
		var selModel = me.getCodeTypeGrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		Ext.Ajax.request({
			url:'base/Codes.do?method=getCodeCount',
			params:{
				type_code:rec.get('type_code')
			},
			success:function(resp){
				var ret = Ext.decode(resp.responseText);
				if (ret.total >0){
					Ext.Msg.alert('提示','代码类型['+rec.get('type_code')+'-'+rec.get('name')+']尚有下级代码定义,不能删除!');
				}else{
					Ext.Msg.confirm('提示','你确信要删除代码类型['+rec.get('name')+']吗?',
					     	function fn(id){
								if(id==Ext.Msg.buttonIds[1]){
									me.typeStore.remove(rec);
									me.typeStore.sync();
									if(rec.get('attrib')=='CBX'){
										me.doDeleteCodeConfig(rec);
									}
								}
					});
				}
			}
		});
	},
	doSaveCodeType: function(rec){
		if(this.typeStore.indexOf(rec) < 0){
			this.typeStore.add(rec);
		}
		this.typeStore.sync();
		this.typeStore.sort();
	},
	// 响应代码信息窗口增、删、改按钮事件
	onMngCodeWinBtnClick : function(btn, event) {
		// =============界面操作权限相关======================================
		// 需要先检查操作权限
		//if (!btn.up('mng_CodeType').modFuncsDisabled[btn.itemId])
			switch (btn.itemId) {
				case 'codeadd' :
					this.doAddCode();
					break;
				case 'codeedt' :
					this.doEditCode();
					break;
				case 'codedel' :
					this.doDelCode();
					break;
				case 'coderef' :
					var selModel = this.getCodeTypeGrid().getSelectionModel();
					rec = selModel.getSelection()[0];
					this.codeStore.load({
						params : {
							type_code : rec.get('type_code')
						}
					});
					break;
			}
	},
	// 响应代码信息维护窗口按钮事件
	onEdtCodeWinBtnClick : function(btn, event) {
		var edtWin = btn.up('edt_Code');
		switch (btn.action) {
			case 'ACT_SAVE' :
				var edtForm = edtWin.down('form');
				if (edtForm.getForm().isValid() && edtForm.getForm().isDirty()) {
					var rec = edtForm.getRecord();
					edtForm.updateRecord(rec);
					this.doSaveCode(rec);
					edtWin.close();
				}
				break;
			case 'ACT_CLOSE' :
				edtWin.close();
				break;
		}

	},
	doAddCode : function() {
		var me = this, edtWin, edtCodeType, level;
		var selModel = this.getCodeTypeGrid().getSelectionModel();
		rec = selModel.getSelection()[0];
		var record = Ext.create('srm.basic.model.Code', {
			type_code : rec.get('type_code')
		});
		edtWin = Ext.create('srm.basic.view.EditCode', {
					isAddNew : true
				});
		edtCodeType = edtWin.down('#type_code');
		combobox = edtCodeType.getStore();
		combobox.load({
			params : {
				type_code : rec.get('type_code')
			}
		});
		edtWin.on('afterrender', function() {
					edtWin.down('form').loadRecord(record);
		});
		edtWin.show();

	},
	doEditCode : function() {
		var me=this;
		var selModel = this.getCodeGrid().getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert('提示', '请选择一条数据!');
			return;
		}
		var rec = selModel.getSelection()[0];
		var  edtWin = Ext.widget('edt_Code', {
					isAddNew : false
				});
		edtCodeType = edtWin.down('#type_code');
		comboboxstore = edtCodeType.getStore();
		comboboxstore.load({
			params : {
				type_code : rec.get('type_code')
			}
		});
		edtWin.on('afterrender', function() {
					edtWin.down('form').loadRecord(rec);
		});
		edtWin.show();

	},
	doDelCode : function() {
		// 删除前需要做一些逻辑检查
		var me = this;
		var selModel = me.getCodeGrid().getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert('提示', '请选择一条数据!');
			return;
		}
		var recs = selModel.getSelection();
		Ext.Msg.confirm('提示', '你确信要删除这些代码吗?', function fn(id) {
					if (id == Ext.Msg.buttonIds[1]) {
						me.codeStore.remove(recs);
						me.codeStore.sync();
					}
				});
	},
	doSaveCode : function(rec) {
		if (this.codeStore.indexOf(rec) < 0) {
			this.codeStore.add(rec);
		}
		this.codeStore.sync();
		this.codeStore.sort();
	},
	/**
	 * 保存基础数据配置
	 */
	doSaveCodeConfig:function(rec){
		var me=this;
		var model=Ext.create('srm.basic.model.CodeConfig',{
			name:rec.get('name'),
			type:srm.DataConst.DICTIONARY,
			code_type:rec.get('type_code'),
			displayField:'name',
			valueField:'value'
		});
		var store=srm.DataUtil.getStoreByStoreManager(srm.DataConst.CODECONFIG_STOREID,true);
		
		srm.DataUtil.sync(store,model);
	},
	doDeleteCodeConfig:function(rec){
		Ext.Ajax.request({
			url : 'base/Codes.do?method=deleteCodeConfigByCode',
			method : 'post',
			params: {
				typecode: rec.get('type_code')
            }
		});
	}
});
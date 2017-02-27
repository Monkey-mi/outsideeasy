
Ext.define('srm.basic.view.MngBasicData', {
	extend : 'srm.ux.Panel',
	alias : 'widget.mng_BasicData',

	title : '基础类型定义',
	iconCls : 'application_view_list',
	layout : 'border',
	defaults : {
		autoScroll : true,
		containerScroll : true
	},
	doEditCodeType : function(rec){
		var edtWin = Ext.widget('edt_CodeType',{isAddNew:false,tcid:rec.get('tcid')});
		edtWin.down('form').loadRecord(rec);
		edtWin.show();
	},
	initComponent : function() {
		var me=this;
//		me.codetypeattrib = [];
//		me.codetypeattrib.push({'text':'全部','value':'全部'});
//		Ext.Ajax.request({
//			url : 'base/Codes.do?method=getCodeTypeSuitList',
//			method : 'post',
//			success : function(response) {
//				var obj = Ext.decode(response.responseText);
//				for(i=0;i<obj.data.length;i++){
//					if(obj.data[i]&&obj.data[i].suit_type!=""){
//						att = obj.data[i].suit_type;
//					me.codetypeattrib.push({'text':att,'value':att});
//					}
//				}
//				/*for(i=0;i<obj.data.length+1;i++){
//					Ext.log(me.codetypeattrib[i].text);
//				}*/
//			}
//		});
		me.codestore = srm.DataUtil.createStoreFactory('srm.basic.store.Codes');
		me.codestore.getProxy().setExtraParam('usePaging',true);
		me.store = srm.DataUtil.createStoreFactory('srm.basic.store.CodeTypes');
		me.store.getProxy().setExtraParam('usePaging',true);
		//Ext.log('每页：'+me.store.pageSize);
		Ext.apply(me, {
			xtype:'panel',
			itemId : 'panl',
			layout:'border',
					items : [{
								tbar : [{
											text : '新增',
											glyph : 0xf016,
											itemId : 'codetypeadd'
										}, {
											text : '修改',
											glyph : 0xf044,
											itemId : 'codetypeedt',
											disabled : true
										}, {
											text : '删除',
											glyph : 0xf014,
											itemId : 'codetypedel',
											disabled : true
										}, {
											text : '刷新',
											glyph : 0xf021,
											itemId : 'codetyperef'
										}
//										,'|', {
//											xtype : 'combobox',
//											store : Ext.create('Ext.data.Store',{
//												fields: ['text','value'],
//												data: me.codetypeattrib
//											}),
//											hidden:true,
//											value : '全部',
//											displayField : 'text',
//											valueField : 'value',
//											fieldLabel : '代码类型属性',
//											queryMode : 'remote',
//											itemId : 'type_code_attrib',
//											forceSelection : true,
//											listeners :{
//												select : function(combo, records){
//													var attrib=records[0].get('value');
//													delete me.store.getProxy().extraParams['attrib'];
//													if(attrib!='全部')
//														me.store.getProxy().setExtraParam('attrib',attrib);
//													me.store.currentPage = 1;
//													me.store.load({params:{start:0,limit:me.store.pageSize,page:1}});
//												}
//											} 
//										}
										],
								xtype : 'gridpanel',
								region : 'west',
								split : true,
								flex : 1,
								store : me.store,
								itemId : 'typeGrid',
								// selModel:Ext.create('Ext.selection.CheckboxModel'),
								columnLines : true,
								columns : [{
											text : '',
											xtype : 'rownumberer',
											width : 40,
											sortable : false,
											align : 'center'
										}, {
											text : '类型编码',
											dataIndex : 'type_code',
											flex : 2
										}, {
											text : '名          称',
											dataIndex : 'name',
											flex : 2
										}, {
											text : '类型属性',
											hidden:true,
											dataIndex : 'attrib',
											flex : 1
										}],
								dockedItems : [{
								               xtype : 'pagingbar',
								               stateId : 'b183cfe8-268c-44ab-8d19-f7177e6a9c14',
								               store : me.store,
								               dock : 'bottom',
								               displayInfo : true}],
								listeners :{
									selectionchange : function(sm, records){
										//Ext.log('length='+records.length);
										if(records.length>0){
											//Ext.log();
											this.up('#panl').down('#codetypeedt').setDisabled(false);
											this.up('#panl').down('#codetypedel').setDisabled(false);
											var type_code=records[0].get('type_code');
											delete me.codestore.getProxy().extraParams['type_code'];
											me.codestore.getProxy().setExtraParam('type_code',type_code);
											me.codestore.currentPage = 1;
											me.codestore.load({
												params:{
													start:0,
													limit:me.codestore.pageSize,
													page:1
												}
											});
										}
										else{
											me.codestore.removeAll();
										}
									},
									itemdblclick : function(view, rec){
										//if(!view.up('mng_CodeType').modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_EDT])
											me.doEditCodeType(rec);
									}
								}
							},
							{
								tbar : [
								{
									text : '新增',
									glyph : 0xf016,
									itemId : 'codeadd'
								}, {
									text : '修改',
									glyph : 0xf044,
									itemId : 'codeedt',
									disabled : true
								}, {
									text : '删除',
									glyph : 0xf014,
									itemId : 'codedel',
									disabled : true
								},{
									glyph : 0xf021,
									iconCls : 'page_refresh',
									itemId : 'coderef'
								}],
						xtype : 'gridpanel',
						region : 'center',
						split : true,
						flex : 1,
						itemId:'codeGrid',
						store : me.codestore,
						selModel : Ext
								.create('Ext.selection.CheckboxModel'),
						columnLines : true,
						dockedItems : [{
							xtype : 'pagingbar',
							stateId : 'cd7644fc-42cf-438c-b6ad-544a08e7b96e',
							store : me.codestore,
							dock : 'bottom',
							displayInfo : true
						}],
						listeners :{
							selectionchange : function(view, record){
								this.up('#panl').down('#codeedt').setDisabled(false);
								this.up('#panl').down('#codedel').setDisabled(false);
							}/*,
							itemdblclick : function(view, rec){
								//if(!view.up('mng_CodeType').modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_EDT])
									me.doEditCode(rec);
							}*/
						},
						columns : [{
									text : '',
									xtype : 'rownumberer',
									width : 40,
									sortable : false,
									align : 'center'
								}, {
									text : '类          型',
									dataIndex : 'type_code',
									flex : 2,
									hidden : true
								}, {
									text : '编          码',
									dataIndex : 'code',
									flex : 2
								}, {
									text : '名          称',
									dataIndex : 'name',
									flex : 2
								}, {
									text : '代  码  值',
									dataIndex : 'value',
									flex : 2
								}, {
									text : '排  序  号',
									dataIndex : 'order_seq',
									flex : 1
									//hidden : true
								},{
									text : '定  义  一',
									dataIndex : 'def_1',
									flex : 1,
									hidden : true
								}, {
									text : '定  义  二',
									dataIndex : 'def_2',
									flex : 1,
									hidden : true
								}, {
									text : '定  义  三',
									dataIndex : 'def_3',
									flex : 1,
									hidden : true
								}]
					}]
				});
		this.callParent(arguments);
	}
});
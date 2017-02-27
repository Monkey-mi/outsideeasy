Ext.define('srm.mngWebPublish.view.WebPublishMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.WebPublishMainInfo',
	requires : [
	            'srm.ux.SearchCombobox'
	            ],	
	width:980,
    height:800,
    modal : true,
    listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		me.moduleStore=Ext.create('srm.mngWebPublish.store.WebContentModule');
		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2
				
			},
			tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',hidden:!me.isEdit}],
			items:[{
				region:'center',
				xtype:'form',
				flex:2,
				title:'网页信息',
				bodyPadding: 10,
				itemId:'form_web',
				autoScroll:true,
				layout: 'column',
	       		defaults:{labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'0 4 4 4',
					msgTarget : 'side',
					readOnly:!me.isEdit,
					autoFitErrors : true},
				items:
				[
					{fieldLabel:'网页标题',name:'web_title',columnWidth:4/5,allowBlank:false},
					{fieldLabel:'所属页面',name:'content_type',columnWidth:2/5,allowBlank:false,
					xtype:'combo',
					store:[[2,'帮助中心']],
					listeners:{						
						'change':function( field,nv,ov){
							if(!Ext.isEmpty(nv)){
								me.moduleStore.load({
									params:{
										content_type:nv
									}
								});
							}
						}
					}},
					{fieldLabel:'所属模块',name:'module_id',columnWidth:2/5,allowBlank:false,
						xtype:'combo',
						store :me.moduleStore,
						queryMode:'local',
						displayField:'module_name',
						valueField:'module_id'},
					{fieldLabel:'创建时间',itemId:'create_dt',xtype:'datefield',format : 'Y-m-d H:i:s',columnWidth:2/5,value:new Date(),readOnly:!me.isEdit,allowBlank:false },
					{
						fieldLabel:'公告内容',
						xtype: 'extkindeditor',                     
	                    name: 'content', 
	                    allowBlank:false,
	                    columnWidth:4/5,
	                    readOnly:!me.isEdit,
	                    height:700
					}
				]
			}]
			});
		me.callParent(arguments);
	}
});
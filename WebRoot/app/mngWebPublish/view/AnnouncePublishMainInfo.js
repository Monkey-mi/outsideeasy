Ext.define('srm.mngWebPublish.view.AnnouncePublishMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.AnnouncePublishMainInfo',
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
				title:'公告信息',
				bodyPadding: 10,
				itemId:'form_announce',
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
					{fieldLabel:'公告标题',name:'web_title',columnWidth:4/5,allowBlank:false},
					{fieldLabel:'发布落款',name:'signed_release',columnWidth:2/5},
					{fieldLabel:'创建时间',itemId:'create_dt',xtype:'datefield',format : 'Y-m-d H:i:s',columnWidth:2/5,value:new Date(),readOnly:!me.isEdit,allowBlank:false },
					{
						fieldLabel:'内容摘要',
	                    name: 'content_abstract', 
	                    xtype:'textarea',
	                    columnWidth:4/5,
	                    allowBlank:false,
	                    readOnly:!me.isEdit,
	                    height:100
					},
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
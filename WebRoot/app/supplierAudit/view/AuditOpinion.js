/*认证审核不通过意见窗口*/
Ext.define('srm.supplierAudit.view.AuditOpinion',{
	extend:'srm.ux.Window',
	alias:'widget.win_auditOpinion',
	title:'不合格意见',
	width:500,
	height:200,
	frame:true,
	modal:true,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			xtype:'panel',
			
			items:[{
				xtype:'form',
				layout:'column',
				itemId:'auditOpinionForm',
				
				items:[
				{
					padding:'20 0 0 10',
					xtype:'textareafield',
					name:'auth_opinion',
					fieldLabel:'审核意见',
					allowBlank:false,
					msgTarget : 'side',
					autoFitErrors : true,
					labelWidth:80,
					columnWidth:0.9
				}
				],
				buttons:[{text:'确定',glyph:0xf058,itemId:'btn_save'}]
			}]
		});
		me.callParent(arguments);
		me.down('#auditOpinionForm').loadRecord(me.auditOpinionRec);
	}
});
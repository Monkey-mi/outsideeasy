Ext.define('srm.syslog.view.SrmlogInfo',{
	extend:'srm.ux.Window',
	alias:'widget.srmlogInfo',	
	width:900,
    height:600,
    modal : true,
	
	initComponent:function(){
		var me=this;			
		Ext.apply(me,{
			layout:{
				type:'border',
    			padding :2
				
			},
			buttons:[        
               {
                    text: '退出',
                    itemId:'CLOSE',
                    glyph:0xf057,
                    action:'ACT_CLOSE'
                }
            ],
			items:[{
				region:'center',
				xtype:'form',
				flex:1,
				title:'日志详细信息',
				bodyPadding: 10,
				itemId:'grid_edithead',
				store:me.logstore,
				layout: 'column',
			  	
	       		defaults:{labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'0 4 4 4',
					msgTarget : 'side',
					readOnly:true,
					autoFitErrors : true},
				items:
				[
					{fieldLabel:'主键ID',name:'h_id',hidden:true,columnWidth:1},
					{fieldLabel:'登陆名',name:'login_id',columnWidth:1},
					{fieldLabel:'记录时间',name:'logdtm',columnWidth:1,xtype: 'datefield',format:'Y-m-d H:i:s'},
					{fieldLabel:'客户端IP',name:'clientip',columnWidth:1},
					{fieldLabel:'模块ID',name:'mod_id',columnWidth:1,hidden:true},
					{fieldLabel:'模块名',name:'mod_name',columnWidth:1},
					{fieldLabel:'方法路径',name:'s_path',columnWidth:1},
					{fieldLabel:'系统名',name:'s_name',columnWidth:1},
					{fieldLabel:'方法名',name:'s_method',columnWidth:1},
					{fieldLabel:'参数列表',name:'s_data',columnWidth:1},
					{fieldLabel:'发请求的页面',name:'request_html',columnWidth:1},
					{fieldLabel:'错误信息',name:'error_message',columnWidth:1,
						renderer: function(value, meta, record) {
                            meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';   
                            return value;   
                       }}
				]
			}
			]
			});
		me.callParent(arguments);
		
	},
   loadData:function(rec){
	var me=this;
	me.down("form").loadRecord(rec);
}

});
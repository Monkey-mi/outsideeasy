Ext.define('srm.def.ui.ErrorWin',{
	extend:'Ext.window.Window',
	alternateClassName: 'srm.ErrorWin',
	singleton:true,
	title : '调用服务出错',
    layout: 'fit',
    width: 600,
    closeAction:'hide',
    buttons:[
		{
		    text: '关闭',
		    glyph:0xf057,
		    handler: function(btn){
		    	btn.up('window').close();
		    }
		}
    ],
    items:[
	   {
	    	xtype:'form',
	    	bodyPadding: 5,
	    	layout:'column',
	    	defaults: {
	    		labelAlign : 'center',
	    		xtype: 'textfield',
	    		columnWidth:1,
		    	labelWidth : 80,
		    	labelStyle : 'font-weight:bold;color:red',
		    	padding:2
	    	},
	        items:[
	           {
	        	   	fieldLabel:'HTTP状态',
	        	   	readOnly:true,
	        	   	name:'response_status'
	           },
	           {
	        	   	fieldLabel:'请求地址',
	        	   	readOnly:true,
	        	   	name:'request_url'
	           },
	           {	
	        	    fieldLabel:'错误信息',
	        	    xtype:'htmleditor',
	        	    readOnly:true,
	        	    height: 300,
					columnWidth:1,
	        	    name:'response_text',
	        	   	value:'显示一些错误信息!'
	           }
	        ]
	   }
	],
	/*listeners:{
		beforeclose:function(cmp){
			cmp.hide();
			return false;
		}
	},*/
	showError:function(errObj){
		if(errObj){
			this.down('form').getForm().setValues({
				response_status  :errObj.responseStatus,
				request_url : errObj.requestUrl ,
				response_text : errObj.responseText
			});
		}
		srm.ErrorWin.doLayout();
		srm.ErrorWin.show();
	}
});
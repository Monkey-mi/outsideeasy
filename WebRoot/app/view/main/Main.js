/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('srm.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'srm.view.main.MainController',
        'srm.view.main.MainModel'
    ],
	uses:['srm.view.main.region.top',
			'srm.view.main.region.bottom',
			'srm.view.main.region.Center',
			'srm.view.main.region.LeftMenu'
			],
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },
    items: [{
    		region : 'north', // 把他放在maintop的下面
    		xtype : 'maintop'
   		 },
		{
   		 	xtype:'leftMenu',
   		 	width:200,
   		 	region:'west',
   		 	split:true
		},
		{
	        region: 'center',
	        border:false,
	        xtype:'maincenter'
	    },
	    {
	    	region:'south',
	    	xtype:'mainbottom'
	    }
    ],
    listeners : {
				resize : function(container) {
					container.getController().onMainResize();
				},
				afterrender:function(cmp){
					srm.Const.mainView=cmp;
				}
	},
    initComponent : function() {  
    	Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性  
	    this.callParent();  
	}
});

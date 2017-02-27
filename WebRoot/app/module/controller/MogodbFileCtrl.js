Ext.define('srm.module.controller.MogodbFileCtrl', {
    extend: 'Ext.app.Controller',
    requires : [
				'srm.ux.PagingBar',				
				'srm.module.view.MogodbFileView'
				],
    views:['srm.module.view.MogodbFileView',
           'srm.module.view.MogodbQuery'
    ],
    refs:[
    	{ref:'MogodbFileView',selector:'MogodbFileView'},
    	{ref:'fileGrid',selector:'MogodbFileView #fileGrid'}
    	],
    init: function() {
		var me=this;
		if (this.isInited)
			return;
		me.control({
			'MogodbFileView':{
				afterrender:function(cmp){
					me.panel=me.getMogodbFileView();
					me.grid=me.getFileGrid();
					me.store = me.panel.store;
					me.grid.getStore().load();
					me.query_rec=Ext.create('srm.module.model.QueryParams');
				}
			},
			'MogodbFileView  button':{
				click:me.doAction
			},
		});
		// controller初始化完成
		this.isInited = true;	
	},
	doAction:function(btn){
		var me = this;
		switch(btn.itemId){
		 case 'btn_query':
			 	var win=Ext.widget('MogodbQuery',{
					itemId:'MogodbQuery',
					mainstore:me.store,
					mainview:me.panel,
					rec:me.query_rec
				});
			 	win.show();
				break;
		 case 'btn_del':
			 	var result=srm.Const.callServiceMethodSync('fileCenter/delUselessMogoFile.do');
			 	if(result){
			 		me.grid.getStore().load();
			 	}
				break;
		 case 'btn_replace':
			 	var me = this;	 
				var rec=me.grid.getSelectionModel().getSelection()[0];
		    	var win =Ext.create('srm.mes.mngtaskManager.view.ReplaceTaskFile',{
					title:'替换文件',
					glyph:0xf0f0,
					closable:true,
					store:me.grid.getStore(),
					mogodbId:rec.get('filename')
				});
				win.show();
		  	break;
		};
	}
});

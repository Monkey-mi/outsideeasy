Ext.define('srm.supplier.view.MaterialClassTreeWin',{	
	extend:'srm.ux.Window',
    alias:'widget.materialClassTreeWin',
    width:280,
    height:480,
    modal:true,
    initComponent:function(){
    	var me =this;
    	me.treeStore=Ext.create('srm.supplier.store.MaterialClassTree');
 		
    	Ext.apply(me,{	
    	  layout:'fit',
   	  	  items:[
   	  	   {
   	  	   		
				title: '类别',
				tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_area',
		    	useArrows: true,
		    	store:me.treeStore
   	  	   }],
   	  	  buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});		
 		me.callParent(arguments);
 	}
});

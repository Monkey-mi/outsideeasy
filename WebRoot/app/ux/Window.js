Ext.define('srm.ux.Window',{
	extend: 'Ext.window.Window',
	alias: 'widget.srmWindow',
//	requires:['gp.basic.view.helpWin.ContentHelpWin'],
	alternateClassName: 'srm.Window',
	constrainHeader:true,
	layout: 'fit',
	width: 400,
	config:{
		isAddNew:false
	},
	constructor: function(cfg) {
		this.callParent(arguments);
        this.initConfig(cfg);
    },
	listeners:{
		show:function(){
			//为了兼容IE浏览器,此处只能延后30ms以后执行才有效
			me= this;
			Ext.create('Ext.util.DelayedTask',function(){
				var cmp = me.down('#firstFocusOn');
				if(cmp)
					cmp.focus(false);
			}).delay(30);
		},
		afterrender : function(cmp) {
			// 根据modFuncsDisabled设置按钮的disable/enable
			for (prop in cmp.modFuncsDisabled) {
				btn = cmp.down('#' + prop);
				if (btn) {
					// 设置按钮初始状态
					if (!btn.disabled)
						btn.setDisabled(cmp.modFuncsDisabled[prop]);
					// 在按钮状态enable发生时检查权限
					btn.on('enable',function(btnCmp){
						if (this.modFuncsDisabled[btnCmp.itemId])
							btnCmp.setDisabled(this.modFuncsDisabled[btnCmp.itemId]);
					}, cmp);
				}
			}
			// 自动设置grid控件中的行选择变化时的功能按钮变化
			// 因为按钮ID可以是自定义的，所以这里就只能管到预定义的几个
			// 其余的需要模块自行处理
			var gridpanels = cmp.query('gridpanel');
			Ext.each(gridpanels, function(grid) {
				//华慧 2015-5-29 end
				grid.on('selectionchange', function(selModel,
						selections) {
					var n = selections.length || 0;
					var btn = grid.down('#'+ srm.Const.FUNC_ITEMID_BTN_DEL);
					// 删除按钮必须是选中一些行时有效
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_EDT);
					// 编辑时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_RESET);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
				}, cmp);
			});
		}
	},
    initComponent:function(){
    	var me=this;
    	this.callParent(arguments);
//    	me.addHelp();
//    	me.on({
//    	  close:function(){
//    	  	if(me.HelpWin){
//    	  	me.HelpWin.close();
//    	  	}
//    	  },
//    	  scope:me
//    	});
    },
    addHelp:function(){
    	var me=this;
    	if(!Ext.isArray(this.tools)){
    	this.tools=[];
    	}
    	Ext.each(this.tools,function(btn){
    	  if(!me.isHelp&&btn.type=='help'){
    	     me.helpTool=btn;
    	     me.isHelp=true;
    	  }
    	});
    	//这里会有些问题，可能会出现多个帮助按钮
    	if(!me.isHelp){
    	  this.tools.push({
    	  type:'help',
		  tooltip:'帮助',
		  handler:function(){
		  me.doHelp();
		  }
    	});
    	me.isHelp=true;
    	}
    },
    doHelp:function(){
        var me=this;
        var win=me.HelpWin=Ext.widget('contenthelpWin',{
          help_id:me.xtype
        });
        win.show();
    }
});
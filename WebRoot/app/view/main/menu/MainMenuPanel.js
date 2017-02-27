/**
 * 系统的主菜单条，根据MainModel中的数据来生成，可以切换至按钮菜单，菜单树
 */
Ext.define('srm.view.main.menu.MainMenuPanel', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.mainmenupanel',
			height:50,
			defaults : {
				xtype : 'srmMenuButton',
				height:50,
				width:120,
				handler : 'changemainview',
				border:'0 1 0 0',
				style:{background:'none!important'}
			},
			layout:{
			     type: 'hbox',
			     align: 'top'
			},
			bodyStyle:'background:#008cd7;',
			initComponent : function() {
				this.items = [
				{
					xtype:'image',
					width:182,
					height:50,
					src:'resources/images/logo1.png',
					padding:'0 0 0 0'
				},{
					//空panel,使菜单与logo隔开些距离,设置背景透明
					xtype:'panel',
					width:10,
					height:20,
					border:false,
					bodyStyle:{background:'none!important'}
				}];
				// 把ViewModel中生成的菜单items加到此toolbar的items中
				var itemArray=this.up('app-main').getViewModel().getMenus();
				var config_show_module=4;//该配置项，控制 可见的，最多数量的一级菜单，其余放在后台管理；一般就是供应商可见菜单上限
				var default_len=config_show_module;
				
				if(itemArray.length<default_len){
					default_len=itemArray.length;
				}
				//加载前4个菜单项
				for(var i=0;i<default_len;i++){
					var item = {
						
						text : '<div style="font-size:16px;">'+itemArray[i].text+'</div>',
						itemId:itemArray[i].itemId
						
					};
					this.items = this.items.concat(item);
				}
				//剩余菜单项,放在二级菜单；一级菜单，最多可见config_show_module个，其他不显示，其余放在后台管理；一般就是供应商可见菜单上限；
				//添加控制，只有公司内部人员可见，后台管理
				if(itemArray.length>=default_len && srm.UInfo.currentUser.userInfo.company_id==10000){
					
					var second_item=[];
					for(var i=default_len;i<itemArray.length;i++){
						var item = {
							
							//bodyStyle:{background:'none!important'},
							text : '<div style="font-size:16px;">'+itemArray[i].text+'</div>',
							itemId:itemArray[i].itemId,
							height:50,
							width:120,
							handler : 'changemainview'
						};
						second_item = second_item.concat(item);
					}
					
					if(default_len>=config_show_module){
						var more_item={
							text:'<span style="font-size:16px;">更多</span>',
							xtype : 'srmMenuButton',
							height:50,
							width:100,
							handler:null,
							menu:[{
								autoRender : true,
								xtype : 'segmentedbutton',//使得menu的子组件可以 应用button的规则
								layout:{
								     type: 'vbox',
								     align: 'middle'
								},
								items:second_item
							}]
							
						};
						this.items = this.items.concat(more_item);
					}
					
				}			
				this.callParent();
			}
		});
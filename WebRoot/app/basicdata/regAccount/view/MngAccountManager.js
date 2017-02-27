Ext.define('srm.basicdata.regAccount.view.MngAccountManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mngAccountManager',	
	initComponent:function(){
		var me=this;
		me.regstore=Ext.create('srm.basicdata.regAccount.store.MngRegAccout');//主账户的表		
		me.substore = Ext.create('srm.basicdata.regAccount.store.MngSubAccount');//子账户的表
		me.suppliestore = Ext.create('srm.basicdata.regAccount.store.MngCompanyInfo');//公司信息
	//	me.regCompanyInfostore = Ext.create('srm.basicdata.regAccount.store.MngCompanyInfo');//单个公司信息
		
		Ext.apply(me.suppliestore.proxy.extraParams, {limit:999});
		Ext.apply(me.regstore.proxy.extraParams,{usePaging:true});	
				
			
			Ext.apply(this,{
    		layout:{
    			type:'border',
    			padding :2
    		},			
    		items:[
		         {  
		        	region:'center',
		        	split: true,
		        	 flex:3,
		        	title:'主账户',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_head',		
	  		  		store: me.regstore,
	  				columnLines:true,	
	  				selModel:Ext.create('Ext.selection.CheckboxModel'), 
	  				dockedItems:[
			  					      {
						    xtype:'toolbar',dock:'top',itemId:'top_bar',
						    items:[
							{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'账户名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
							{xtype:'combo',itemId:'state_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:180,
			 					store:[[0,'可用'],[1,'禁用']]
			 				},
							{text:'查询',glyph:0xf002,itemId:'btn_search'},
							{text:'新增',glyph:0xf002,itemId:'btn_addRegAcc'},
							{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
							"-",							
							
	   	  					"->",
	   	  					{text:'启用',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
	   	  					{text:'禁用',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true}											   	  					   	  				 	  					
					]
				},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.regstore,
								dock : 'bottom',
								displayInfo : true
						    }],
	  				        columns:[
	  				            {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
	  							{text:'主账号ID',dataIndex: 'reg_id',flex:1,hidden:true},
	  							{text:'系统账号角色表主键',dataIndex: 'role_id',flex:1,hidden:true},	  							
	  							{text:'公司编号',dataIndex: 'company_id',flex:1,hidden:true},
	  							{text: '账号名称',dataIndex: 'acc_name',flex:1},
	  							{text:'系统账号角色',dataIndex: 'role_name',flex:1},
	  							{text:'公司名',dataIndex: 'cpyname_cn',flex:1,hidden:true},
	  							{text: '密码',dataIndex: 'password',flex:1,hidden:true},
	  							 {text:'启用状态',dataIndex: 'enabled',flex:0.5,
	  							 renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 0){
	  						            	return '可用';
	  						            }else if(value == 1){
	  						            	return '不可用';
	  						            }	  						            	
	  						            }},
	  							{text: '注册邮箱',dataIndex: 'reg_email',flex:1},
	  							{text: '邮箱验证',dataIndex: 'email_valid',flex:0.5,
	  							 renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 0){
	  						            	return '未验证';
	  						            }else if(value == 1){
	  						            	return '已验证';
	  						            }	  						            	
	  						            }},
	  							{text: '注册手机',dataIndex: 'reg_phone',flex:1	  			
	  						         },	
	  						    {text: '注册日期',dataIndex: 'reg_date',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'	  			
	  						         },		   
	  							{text: '修改时间',dataIndex: 'update_date',flex:1,xtype:'datecolumn',hidden:true,format:'Y-m-d H:i:s'},	  		
	  							{text: '最后登录IP',dataIndex: 'last_login_ip',flex:1}   
	  		           		]	  		           	  					   	  				   
		        },
		        {
		        	xtype:'tabpanel',
		        	region:'south',
		        	split:true,
					 flex:2,	
					title:'其他信息',
					//layout:"column",
					items:[
					{
						xtype:'grid',
						title:'子账户',
						split:true,
					    flex:1,	
					    itemId:'grid_account',
			  		    store: me.substore,
			  		    columnLines:true,
			  		    selModel:Ext.create('Ext.selection.CheckboxModel'), 
			  		    dockedItems:[
			  			 {
			  		    xtype:'toolbar',dock:'top',itemId:'top_bar2',
						items:[
                            {text:'新增',glyph:0xf0e7,itemId:'add_operto',disabled:true},	
                            "-",
							{text:'分配权限',glyph:0xf0e7,itemId:'company_operto',disabled:true},
							{text:'重置密码',glyph:0xf0e7,itemId:'reset_Password',disabled:true},
                            "->",
	   	  					{text:'启用',glyph:0xf0e3,itemId:'btn_AuditsubPass',disabled:true},
	   	  					{text:'禁用',glyph:0xf0e3,itemId:'btn_AuditsubunPass',disabled:true}	
					       ]
			  			 }],
				  				
			  		    columns:[
			  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
		  							{text:'子账号ID',dataIndex: 'sa_id',flex:0.6,hidden:true},
		  							{text: '组织架构表主键',dataIndex: 'org_id',flex:1,hidden:true},
		  							{text: '系统账号角色表主键',dataIndex: 'role_id',flex:1,hidden:true},		  							
		  							{text: '主账号ID',dataIndex: 'reg_id',flex:1,hidden:true},
		  							{text: '子帐号名称',dataIndex: 'sa_name',flex:1},
		  							{text: '用户名',dataIndex: 'username',flex:0.75},
		  							{text: '组织',dataIndex: 'name',flex:0.75},
		  							{text: '员工工号',dataIndex: 'emp_no',flex:0.75},
		  							{text: '系统账号角色名称',dataIndex: 'role_name',flex:1},
		  							{text: '启用状态',dataIndex: 'enabled',flex:0.5,
		  							renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 0){
	  						            	return '可用';
	  						            }else if(value == 1){
	  						            	return '不可用';
	  						            }	  						            	
	  						            }},		  						
		  							{text: '创建日期',dataIndex: 'create_date',flex:1,xtype:'datecolumn',format:'Y-m-d H:i:s'},		  							
		  							{text: '手机号',dataIndex: 'phone',flex:1},		  						
		  							{text: '上次登录IP',dataIndex: 'last_login_ip',flex:0.5},	
		  							{text: '删除状态',dataIndex: 'is_delete',flex:0.5,
			  							renderer: function(value,metaData,record,colIndex,store,view) { 
		  						            if(value == 0){
		  						            	return '未删除';
		  						            }else if(value == 1){
		  						            	return '前台已删除';
		  						            }	  						            	
		  						            }},	
		  		           		]
					},
					{
						xtype:'grid',
						title:'公司信息',
						split:true,
					    flex:1,	
					    itemId:'grid_supplies',
			  		    store: me.suppliestore,
			  		    columnLines:true,
			  		    columns:[
			  		                {text:'序号',xtype:'rownumberer',align:'center',flex:0.5},
		  							{text:'公司ID',dataIndex: 'company_id',flex:0.6},
		  							{text: '公司的英文名',dataIndex: 'cpyname_en',flex:1},
		  							{text: '公司的中文名',dataIndex: 'cpyname_cn',flex:1},		  							
		  							{text: '申请状态',dataIndex: 'apply_sts',flex:1,
		  								renderer: function(value,metaData,record,colIndex,store,view) { 
		  						            if(value == 4){
		  						            	return '已保存';
		  						            }else if(value == 5){
		  						            	return '已提交';
		  						            }else if(value == 15){
		  						            	return '已通过';
		  						            }else if(value == 20){
		  						            	return '未通过';
		  						            }	  						            	
		  						            }},
		  							{text: '注册地址',dataIndex: 'reg_addr',flex:0.5},
		  							{text: '联系地址',dataIndex: 'contact_addr',flex:0.5},
		  							{text: '法人代表',dataIndex: 'corporation',flex:1},
		  							{text: '公司总人数',dataIndex: 'emplyees',flex:1}		  								  						 
		  		           		]
					}
					       ]							        			        
    	}
    	]
    	});
    	this.callParent(arguments);    	
    }
});
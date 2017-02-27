Ext.define('srm.supplierAccess.view.UpImg',{
	extend:'srm.ux.Window',
	alias : 'widget.edt_Img',
	title:'图片上传',
	//iconCls:'picture--plus',
	modal:true,
	width: 600,
//	refs : [
//			{ref : 'oth_Tab',selector : 'mng_ProofApply #southPanel'}//下界面
//	],
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			//iconCls:'page_edit',
    		layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',/*
    						start - 子组件被包在一起放在容器的左边 (默认)
    						center - 子组件被包在一起放在容器里居中
    						end - 子组件被包在一起放在容器的右边*/
		     align: 'stretch'/*
		              控制子组件在容器中的对齐方式, 此参数的有效值有以下几个:
   		     top : 默认值 各子组件在容器顶部水平对齐.
    		 middle : 各子组件在容器中间水平对齐.
   			 stretch : 各子组件的高度拉伸至与容器的高度相等.
  			  stretchmax : 各子组件的高度拉伸至与最高的子组件的高度相等.
		     */
    	},
    	defaults:{padding:5},//默认样式
				items:[{
					xtype:'form',
					itemId:'upLoadForm',
			        width: 400,
			        bodyPadding: 10,
			        frame: true,
			        items: [{
			            xtype: 'filefield',
			            name:'file',
						itemId:'file',
			            fieldLabel: '选择图片',
			            labelWidth: 70,
			            msgTarget: 'side',
			            emptyText : '请选择图片',  
                        blankText : '图片不能为空', 
			            allowBlank: false,
			            anchor: '90%',
			            buttonText: '选择图片',
			            listeners : {  
                                change : function(view, value, eOpts) {  
                                    me.uploadImgCheck(view, value);  
                                }  
                            }  
			        },{
			        	xtype:'fieldset',
			        	title:'<span style="color:red;">上传须知</span>',
			        	layout : {  
                                type : 'table',  
                                columns : 1  
                            },  
                            collapsible : false,// 是否可折叠  
                            defaultType : 'label',// 默认的Form表单组件  
                            items : [ {  
                                html : '1、上传图片大小不超过10MB.'  
                            }, {  
                                html : '2、支持以下格式的:jpg,jpeg,png,gif,bmp等'  
                            } ]  
			        }],
			        buttons : [{  
                            text : '上传',
                            glyph:0xf093,
                            action : 'btn_save',  
                            itemId:'savePic',
                            handler:function(){
                            	var form = this.up('form').getForm();
           		    			if(form.isValid()){
           		    				form.submit({
           		    					url : 'common/uploadFile.do',
                        				method:'POST',
                        				timeout:20,
                        				params: {
        									partPath:'Access/'+me.company_id,
        									isimg:true
    									},
                        				waitMsg : '正在上传图片...',
				                    	success : function(form, action) {
				                    	//TODO:新增记录
				                    	if(!Ext.isEmpty(action.result.msg)){
				                    		Ext.Msg.alert("提示", action.result.msg);
				                    		return;
				                    	}
				                    	
				                    		var accessImg=Ext.create('srm.supplierAccess.model.SupplierAccessUploadImg',{
	                        				score_id:me.score_id,
	                        				file_path:action.result.file_path,
	                        				create_dt:new Date()
	                        				});
	                        				me.UploadImgStore.add(accessImg);
				                    		me.close();
				                   		 },
				                    	failure : function() {
				                        	Ext.Msg.alert("提示", "文件保存失败");
				                        	me.close();
				                    }
           		    				});
           		    			}
                            
                            }
                        }, {  
                            text : '取消',  
                            iconCls : 'page_error',  
                            handler : function(btn) {  
                                me.close();
                            }  
                        }]  
			}]
		});
		me.callParent(arguments);
	},
	/** 
     * 上传文件验证 
     */  
    uploadImgCheck : function(fileObj, fileName) {  
        var scope = this;  
        // 文件类型验证  
        if (!(scope.getImgTypeCheck(scope.getImgHZ(fileName)))) {  
            Ext.Msg.alert('提示','上传文件类型有误！');  
            fileObj.reset();// 清空上传内容  
            return;  
        }  
    },  
  
    /** 
     * 获取文件后缀(小写) 
     */  
    getImgHZ : function(imgName) {  
        // 后缀  
        var hz = '';  
        // 文件名称中最后一个.的位置  
        var index = imgName.lastIndexOf('.');  
        if (index != -1) {  
            // 后缀转成小写  
            hz = imgName.substr(index + 1).toLowerCase();  
        }  
        return hz;  
    },  
  
    /** 
     *	文件类型验证 
     */  
    getImgTypeCheck : function(hz) {  
        var typestr = 'jpg,jpeg,png,gif,bmp';  
        var types = typestr.split(',');// 图片类型  
        for (var i = 0; i < types.length; i++) {  
            if (hz == types[i]) {  
                return true;  
            }  
        }  
        return false;  
    }
});
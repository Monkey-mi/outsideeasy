Ext.define('srm.module.model.ModuleTree', {
	extend: 'Ext.data.Model',
	requires: ['srm.def.Const'],
	fields: [
	            {name:'id'          ,type:'int'},
				{name:'parentId'    },
				{name:'mod_type'    ,	defaultValue:srm.Const.MODULE_TYPE_APP},
				{name:'mod_code'    },
				{name:'text'        }, 
				{name:'textCls'     },
				{name:'glyph', type:'int',convert:function(v,record){
					return parseInt(Ext.util.Format.substr(record.get('iconCls'),2),16);
				}},
				{name:'expanded'    ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_YES},
				{name:'isvalid'     ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_YES},
				{name:'urltype'		,	defaultValue:srm.Const.URL_TYPE_MODULE},
				{name:'url'         },
				{name:'urltarget'   },
				{name:'icon'        },
				{name:'iconCls'     },
				{name:'qtip'        },
				{name:'qtitle'      },
				{name:'order_seq'   ,   type:'int'},
				{name:'remark'      },
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'ctrller'},
				{name:'jsview'},
				{name:'extraCfg'},
				{name:'softSet',	defaultValue:[]},
				{name:'module',	defaultValue:[]}
	        ]
});
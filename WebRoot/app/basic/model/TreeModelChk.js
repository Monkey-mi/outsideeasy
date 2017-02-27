Ext.define('srm.basic.model.TreeModelChk', {
	extend: 'Ext.data.Model',
	identifier:'negative',
	idProperty :'id',
	fields: [
	            {name:'id'          ,type:'int'},
				{name:'parentId'   ,type:'int' },
				{name:'text'        },
				{name:'expanded'    ,type:'boolean'},
				{name:'leaf'        ,type:'boolean'},
				{name:'checked'		,	type:'boolean',	defaultValue:null},
				{name:'order_seq'   ,   type:'int'},
				{name:'type'        },
				{name:'glyph', type:'int',convert:function(v,record){
					return parseInt(Ext.util.Format.substr(record.get('iconCls'),2),16);
				}},
				{name:'icon'        }
	        ]
});
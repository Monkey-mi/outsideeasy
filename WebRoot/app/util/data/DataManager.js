//自定义的数据源manager
Ext.define('srm.util.data.DataManager',{
	extend:"Ext.util.MixedCollection",
	//注册方法
    register : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.add(s);
        }
    },
    unregister : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.remove(this.lookup(s));
        }
    },
    //查找方法
    lookup : function(store) {
        if (Ext.isArray(store)) {
            var fields = ['field1'], 
                expand = !Ext.isArray(store[0]),
                data = store,
                i,
                len;
                
            if(expand){
                data = [];
                for (i = 0, len = store.length; i < len; ++i) {
                    data.push([store[i]]);
                }
            } else {
                for(i = 2, len = store[0].length; i <= len; ++i){
                    fields.push('field' + i);
                }
            }
            return new Ext.data.ArrayStore({
                data  : data,
                fields: fields,
                autoDestroy: true,
                autoCreated: true,
                expanded: expand
            });
        }
        
        if (Ext.isString(store)) {
            return this.get(store);
        } else {
            return Ext.data.AbstractStore.create(store);
        }
    },
    getKey : function(o) {
         return o.storeId;
    }
});
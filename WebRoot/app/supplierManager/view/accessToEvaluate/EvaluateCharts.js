/*评估分数汇总雷达图显示页面*/
Ext.define('srm.supplierManager.view.accessToEvaluate.EvaluateCharts', {
    extend: 'Ext.Panel',
    xtype: 'marked-radial',
	alias:'widget.access_EvaluateCharts',
	overflowY:'auto',
    initComponent: function() {
        var me = this;

//        this.myDataStore = Ext.create('Ext.data.JsonStore', {
//    		fields: ['EvaluateItem', 'score'],
//    		data:[
//        {'EvaluateItem':'管理策略','score':91},
//        {'EvaluateItem':'持续改进','score':95},
//        {'EvaluateItem':'生产过程区域','score':100},
//        {'EvaluateItem':'采购和供应商开发','score':90},
//        {'EvaluateItem':'原材料、成品储存和仓务管理','score':80},
//        {'EvaluateItem':'设备保养','score':100},
//        {'EvaluateItem':'技术和工艺工程','score':100},
//        {'EvaluateItem':'产品文件(工艺与品质)','score':100},
//        {'EvaluateItem':'研发','score':33},
//        {'EvaluateItem':'不合格隔离','score':50},
//        {'EvaluateItem':'生产质量和追溯','score':88},
//        {'EvaluateItem':'测量设备校准','score':100},
//        {'EvaluateItem':'文件记录保存','score':100}]
//    });

        me.items = [{
            xtype: 'chart',
            width: 600,
            height: 400,
            
            padding: '20 0 0 0',
            //style: 'border:1px solid #fbfb4b',
            animate: true,
            shadow: false,
//            legend: {
//                position: 'right',
//                boxStrokeWidth: 0,
//                labelFont: '12px Helvetica'
//            },
            store: me.scoreSummaryStore,
            insetPadding: 40,

            axes: [{
                type: 'Radial',
                position: 'radial',
                minimum: 0,
                maximum: 100,
                majorTickSteps: 9,
                legend: {
                    position: 'bottom'
                }
            }],
            series: [{
                type: 'radar',
                xField: 'fitem_name',
                yField: 'score',
                //showInLegend: true,
                style: {
                    'stroke-width': 2,
                    fill: 'none',
                    //曲线的颜色，蓝色
                    stroke:'#0033FF'
                },
                showMarkers: true,
                
                markerConfig: {
                    type: 'circle',
            		radius: 4,
            		//原点标记，红色
            		'fill': '#f00'
                },
                //高亮选中时的样式
                highlight: {
                    radius: 5,
                    fill: '#53C62D',
                    'stroke-width': 1,
                    stroke: '#888'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('EvaluateItem') + ': ' + storeItem.get('score') + '%');
                    }
                }
            }]
        }];

        this.callParent();
    }
});
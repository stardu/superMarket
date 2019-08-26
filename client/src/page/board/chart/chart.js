import React from 'react';
import echarts from 'echarts/lib/echarts';

// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/src/chart/pie';

import './chart.scss'


export default class Chart extends React.Component{
      componentDidMount(){
        this.drawChart();
      }
      drawChart(){
        var myChart = echarts.init(document.getElementById('chart'));
        // 绘制图表
        myChart.setOption({
            title: { 
              text: '走势图' ,
              padding: [0,0,0,120]
            },
            legend: {
                data:['销量']
            },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
      }
      render(){
        return(
          <div className='chartBox'>
             <div id='chart' style={{height:500,width:'80%'}}></div>
          </div>
          
        )
      }
}
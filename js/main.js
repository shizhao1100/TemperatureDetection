        var statekey;
        //温度阈值
        var Threshold = 90;
        //List 最大显示数量
        var MaxlistCount = 100;
        //数据拟合对象
        var Curvefitting = new CurveFitting();
             
        var SleepTime = 333;//刷新频率 单位毫秒;
        
        //显示对象          
        var Display = new Display(SleepTime);
        //保存对象
        var Collect = new CollectData();
        //数据对象
        var Data = new GreateData();
        //绘制坐标轴
        Display.ShowAxisGraph();
        
        //开始按钮点击事件
        function checkb(){      
            statekey = window.setInterval("Run()",SleepTime);
        }
        //结束按钮点击事件
        function checks(){
            clearInterval(statekey); 
        }
        //保持Lish显示数量低于100条
        function removelist() {
            var div = document.getElementById("bottom");
            if(div.children.length>MaxlistCount)
            {
                div.removeChild(div.firstChild);
            }
        }
        
        //高温报警
        function TemperatureDetection(Temperature) {
            if(Temperature>Threshold)
            {
                document.bgColor = "#ff0000";
                document.getElementById("warring").style.color = "#ffff00";
            }
            else
            {
                 document.bgColor = "#ffffff"
                 document.getElementById("warring").style.color = "#ffffff";
            }
        }
        //运行
        function Run(){

            var Time = Data.GreateNowTime();
            var Temperature = Data.GreateTemperature();
            
            TemperatureDetection(Temperature);
            
            removelist();
            Collect.save(Time.toISOString()+","+Temperature.toString().substr(0,6));        
            
            Display.ShowText(Time.toISOString(),Temperature.toString().substr(0,6));
            
            Display.GetRealData(Time,Temperature);
     
            Curvefitting.GetData(Temperature);
            
            var ForeastData = Curvefitting.CurFit();
            
            Display.GetForeastValue(ForeastData);
            
            Display.ShowAxisGraph();
        }
        //下载日志
        function Down(){
            this.location = "Download.php?action=Download";
        }
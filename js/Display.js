function Display(sleeptime) {
    
   this.ArryLength = 59;
   this.SleepTime = sleeptime;
   
   this.RealData = new Array();
   
   this.ForeastData = new Array();
   
   this.IntervalTime = sleeptime * 60;
    
   this.EndTime; 
   this.StartTime;
   
   this.ShowText = function(Time,Temperature) {
        var newNode = document.createElement("p");
        newNode.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspTime:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Time+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+"Temperature:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Temperature;
        var div = document.getElementById("bottom");
        
        div.appendChild(newNode);
        div.scrollTop = div.scrollHeight;
        
    },
   

   this.GetForeastValue = function (value) {
    if(this.RealData.length)
    {
    this.GreatForeastData(this.RealData,value);
    }
    
   }
   
   this.GreatForeastData = function (RealData,Foreastvalue) {
       this.ForeastData = [];
       this.ForeastData.push(RealData[RealData.length-1]);
       for(var i = 0;i<Foreastvalue.length;i++)
       {
           var d = {
                time : RealData[RealData.length-1].time + this.SleepTime * (i+1),
                value: Foreastvalue[i]
            }
           this.ForeastData.push(d);     
       }        
   }
    
   this.GetRealData =function (Time,Value) {
        var d = {
            time : Time.getTime(),
            value: Value
        }
        this.RealData.push(d);
        if(this.RealData.length>this.ArryLength)
        {
            this.RealData.shift();
        }
        this.EndTime= this.RealData[this.RealData.length-1].time + 0;
        this.StartTime = this.RealData[this.RealData.length-1].time - this.IntervalTime;
    },
    
   this.initGragp = function () {
        
   },  
   
   this.ShowAxisGraph = function() {
       
         UpData = d3.select("#Grough").selectAll("svg").remove();
           
         width = 1000;
         height = 550;

         padding = {left:30, right:30, top:20, bottom:70};

         svg = d3.select("#Grough").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");
        
         x = d3.time.scale()
            .domain([this.StartTime,this.EndTime+sleeptime*(this.ForeastData.length-1)])      
            .range([0 ,width-padding.right ]);
        
         y = d3.scale.linear()
            .domain([0,100])
            .range([height -padding.bottom , padding.top]);
        
        line = d3.svg.line()
            .x(function(d) { return x(d.time);})
            .y(function(d) { return y(d.value);})
            .interpolate('monotone');

       this.ShowAxis();  
      
       this.ShowForeastNodes();    
       this.ShowForeastPath();
       
       this.ShowRealPath();
       
       
       this.ShowRealNodes();                          
   }
   
   
   this.ShowAxis =function () {
       var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10);
                  
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickFormat(d3.time.format('%H:%M:%S'))
            .ticks(10);
       
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+ padding.left+","+ (height - padding.bottom) +")")
            .call(xAxis)
            .selectAll("text")
            .attr("transform","translate("+-20+","+20+")"+"rotate(-45)")
            .attr("class","ticktext");
            
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+ padding.left+",0)")
            .call(yAxis);
            
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate("+ padding.left+","+ (height - padding.bottom) +")")
            .call(xAxis
            .tickSize(-height, 0, 0))
            .selectAll("text")
            .remove();
            
        svg.append("g")
           .attr("class", "grid")
           .attr("transform", "translate("+ padding.left+",0)")
           .call(yAxis
           .tickSize(-width, 0, 0))
           .selectAll("text")
           .remove();

   }
   





   this.ShowPath = function (type,data) {      
        var path = svg.append('path')
            .attr('class', type)
            .attr('d', line(data)); 
   }
   this.ShowNodes =function (type,data){
      
      var duration = 500;
      
      var r0 = 5;
      var r1 = 8;
      
      var g = svg.selectAll(type)
        .data(data)
        .enter()
        .append('g')
        .append('circle')
        .attr('class',type)
        .attr('cx', line.x())
        .attr('cy', line.y())
        .attr('r', r0)
        .on('mouseover', function() {
          d3.select(this).transition().duration(duration).attr('r', r1);
        })
        .on('mouseout', function() {
          d3.select(this).transition().duration(duration).attr('r', r0);
        });
       
       g.append("title").text(function(d) {return "Time  :"+  new Date(d.time).getHours() + ":"+ new Date(d.time).getMinutes()+ ":" + new Date(d.time).getSeconds() + "\r\n" 
       
       + "Temp : " + d.value.toString().substr(0,6) ; })

   }
   
   this.ShowRealPath = function () {
       this.ShowPath('Realline',this.RealData);
   }
   
   this.ShowRealNodes = function () {
       this.ShowNodes('Reallinecircle',this.RealData);
   }
   
   this.ShowForeastPath = function () {
        this.ShowPath('Foreadtline',this.ForeastData);
   }
   this.ShowForeastNodes = function () {
       this.ShowNodes('Foreastlinecircle',this.ForeastData);
   }
}


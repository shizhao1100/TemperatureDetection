function CurveFitting() {
    //预测对象
    this.polyfit = new PolyFit();
    //所用的预测数据个数
    this.arrylength = 5;
    //几次方程
    this.poly_n = 3;
    //预测数据的长度
    this.NewValueLength = 2;
    // x y 数组 预测出来的多元方程的 a的数据
    this.x = new Array();
    this.y = new Array();
    this.a = new Array();
    
    //预测出来的数据数组
    this.NextValue = new Array();
    //因为时间间隔相等 so 假设 x 为 0 1 2 3 4 5 (一共5个数据)
    this.GreateX = function(){
       this.x=[];
       for(var i= 0 ; i < this.y.length; i++)
       {
            this.x.push(i);
       }
    }
    //获取温度数据(将 温度 压入 y 数组)
    this.GetData =function (Value) {
        this.y.push(Value);
        if(this.y.length>this.arrylength)
        {
            this.y.shift();
        }
        this.GreateX();
    }
    

    //计算接下来的数据
    this.ComputNewValue = function(){
        this.NextValue=[];
        for(var i = 0 ; i < this.NewValueLength; ++i)
        {
            var y1 = 0;
            for(var j=0;j < this.a.length;j++)
            {
                y1 = y1 + this.a[j] * Math.pow((this.x[this.x.length-1]+i),j);
            }
            this.NextValue.push(y1);
        }
    }
    //拟合
    this.CurFit = function(){
        
        //这里在预测 预测出来的多元方程的 a 的数据存在 a 数组里
        this.polyfit.polyfit(this.x,this.y,this.poly_n,this.a);
        
        this.ComputNewValue();

        return this.NextValue;
        
        // console.log("NextValue  "+ this.NextValue);
        // console.log("a  "+ this.a);
    }

};
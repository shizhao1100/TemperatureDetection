function GreateData() {
   
   this.GreateTemperature= function () {
        return Range=Math.random()*100 + 1;
    },
    
   this.GreateNowTime= function() {
        var Time = new Date();
        return Time;
    }

};
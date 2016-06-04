function CollectData() {
    this.save = function(Value) {
        $.ajax({
                type: "post",
                url: "js/SaveData.php",
                data: { Data : "\r\n"+Value},
                success: function () {                   
                },
                error: function () {
                    alert("Error 未能正确保存数据");
                }
            });
    }
}
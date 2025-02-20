

const app ={
    el:'#app',
    data(){
    return {
            itemList:
            [
                {
            
                itemName:'載入中',
                imgUrl:"",
                price:0,
                count:0
                }
            ],
                /*[
                {
            
                itemName:'巧克滋味1',
                imgUrl:"images/貓狗.jpg",
                price:250,
                count:0
                },
                {
        
                itemName:'巧克滋味2',
                imgUrl:"images/貓狗.jpg",
                price:200,
                count:0
                },
                {
            
                itemName:'小道消息',
                imgUrl:"images/貓狗.jpg",
                price:200,
                count:0
                },
                {
        
                itemName:'旅行袋',
                imgUrl:"images/貓狗.jpg",
                price:850,
                count:0
                },
            ]*/
            remark:"",
            cash : ""
        }
    },
    mounted(){
        window.app = this
    },
    methods:{

        handlePlus: function(item){
            //console.log(item);
            item.count++;
        },
        handleSub: function(item){
        //console.log(item);
            if(item.count>0){
                item.count--;
            }
        },
        buy: function(){

            let resultItemList = []
            for(item of this.itemList){
                if(item.count>0){

                    let data=[
                        new Date().toLocaleString(),
                        item.itemName,
                        item.price,
                        item.count,
                        item.price * item.count,
                        this.remark
                    ]

                    resultItemList.push(data)
                    
                }
                    
            }

            //如果都沒有資料，但有備註，單純送備註就好
            if(resultItemList.length == 0 && this.remark!=""){
                let data=[
                    new Date().toLocaleString(),
                    "備註",
                    0,
                    0,
                    0,
                    this.remark
                ]

                resultItemList.push(data)
            }

            //如果長度>0，送出
            if(resultItemList.length>0){

                itemListJson = JSON.stringify(resultItemList)
                console.log(  itemListJson)
                sendDataToGoogle(itemListJson)
                this.reset()
            }
            else{
                alert("尚未選取任何商品")
            }
            },
        reset: function(){
            console.log(this.itemList)
            for(let i=0; i<this.itemList.length ;i++){
                this.itemList[i].count = 0
            }
            this.remark=""
            this.cash = ""

        },
        
        updateItemList : function(dataList){
            
            //console.log(this.itemList)

            for(let i = 0; i<dataList.length ;i++){
                this.itemList.splice(i, 1, dataList[i])
            }
            console.log(this.itemList)
        }
        
        
    },
    computed:{
        totalPrice: function(){
            let total = 0
            
            
            for(item of this.itemList){
                /*console.log(item )
                console.log(item.count)*/
                total += item.price * item.count
                
            }
            return total
            },
        giveChange: function(){
            let change = this.cash - this.totalPrice 
            return change
        },
        details: function(){

            result = "明細<br>"

            for(let i=0; i<this.itemList.length ;i++){
                if(this.itemList[i].count != 0){
                    result += this.itemList[i].itemName + ": " + this.itemList[i].count + "<br>"

                   
                }
                
            }

            return result
        }
    }
}

    



function sendDataToGoogle(itemListJson){
    
    $.ajax({
        //url: "https://script.google.com/macros/s/AKfycbyHtFR1cmk4WwMkN9WvlhPg6a2bAYuJfU5s3Ukii_Dot9swo_M3sz4Oe0eV_suXaU2Ehg/exec",
        url: "https://script.google.com/macros/s/AKfycbxezvbAyB0KbhIE9b50WNtzR973lyd34AVeOBLxR-zYBqnYJxOIJi5gKJC7mCzwxFF0_Q/exec",
        dataType: "json",
        type:"post",
        data: {
            itemListJson:itemListJson
            /*
            time: new Date().toLocaleString(),
            itemName: item.itemName,
            price: item.price,
            count: item.count,
            total: item.price* item.count,
            remark: ""*/
        },
        beforeSend: function() {
            swal.fire({
                html: '<h5>Loading...</h5>',
                showConfirmButton: false,
                allowOutsideClick: false,
                onRender: function() {
                    var sweet_loader = '<div class="sweet_loader"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div>';
                     // there will only ever be one sweet alert open.
                     $('.swal2-content').prepend(sweet_loader);
                }
            });
        },
        success: function(response) {
            swal.fire({
                icon: 'success',
                html: '<h5>'+ response+'</h5>'
            });
            //alert(response);
            console.log(response);

        },
        error: function(err){
            swal.fire({
                icon: 'error',
                html: '<h5>'+ err.status + " " + err.statusText+'</h5>'
            });
            //alert(err.status + " " + err.statusText)
        }
    });
}


$(function(){
    Vue.createApp(app).mount('#app')

   
    //商品訊息
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyzdVL3A4cuLyfns1245eAV-PH4-nIvOAHJFqxsics9lAlH3P_FEva0fMbHVL206APQcg/exec",
        dataType: "json",
        type:"post",
       
        success: function(dataList) {
           
            console.log(dataList);

            //加上count屬性 圖片連結
            for(let i =0; i<dataList.length ;i++){
                dataList[i].count = 0
                //圖片URL
                //dataList[i].imgUrl = "images/" + dataList[i].itemName + ".jpg"
            }

            //console.log(app.methods.updateItemList)
            window.app.updateItemList(dataList)
            
         
        },
        error: function(err){
            
            console.log(err.status + " " + err.statusText)
        }
    });


})


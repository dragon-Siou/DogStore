

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
                count:0,
                totalPrice:0
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

        }
    },
    mounted(){
        window.app = this
    },
    methods:{
        updateItemList : function(dataList){
            
            console.log(dataList)
            
            let i = 0

            for(let key in dataList){
                console.log(dataList[key])
                this.itemList.splice(i, 1, dataList[key])
                i+=1
            }
        }
        
    },
    computed:{

        totalPrice: function(){
            let total = 0
            
            
            for(item of this.itemList){
                /*console.log(item )
                console.log(item.count)*/
                total += item.totalPrice
                
            }
            return total
            }
    }

}



$(function(){

    Vue.createApp(app).mount('#app')
    //目前商品數量統計
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzAc-9dLbRiu2J0dmvyR5XPvJR1I9UGkEnyt6BQZf9902DvkGRBeaYf7t-yy10udBB3KA/exec",
        dataType: "json",
        type:"post",
       
        success: function(data) {
           
            console.log(data);
            window.app.updateItemList(data)
           
         
        },
        error: function(err){
            
            console.log(err.status + " " + err.statusText)
        }
    });
})
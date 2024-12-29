const app ={
    el:'#app',
    data(){
    return {
            itemList:[
                {
                id:'1',
                itemName:'巧克滋味1',
                imgUrl:"images/貓狗.jpg",
                price:250,
                count:0
                },
                {
                id:'2',
                itemName:'巧克滋味2',
                imgUrl:"images/貓狗.jpg",
                price:200,
                count:0
                },
                {
                id:'3',
                itemName:'小道消息',
                imgUrl:"images/貓狗.jpg",
                price:200,
                count:0
                },
                {
                id:'4',
                itemName:'旅行袋',
                imgUrl:"images/貓狗.jpg",
                price:850,
                count:0
                },
        ]
        }
    },
    methods:{
        handlePlus: function(item){
            console.log(item);
            item.count++;
          },
          handleSub: function(item){
            console.log(item);
            if(item.count>0){
              item.count--;
            }
         },
         buy: function(){
            for(item of this.itemList){
                if(item.count>0){
                    send_data_to_google(item)
                }
                
                
            }
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
         }
    }
}


function send_data_to_google(item){
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwPJX0FQnZ_BQwEMWvEenym2A-tcR0b0LPGZz9EbvP3g-SZr683ytvpmS8TBmfs6RWZOA/exec",
        dataType: "json",
        type:"post",
        data: {
            time: new Date().toLocaleString(),
            itemName: item.itemName,
            price: item.price,
            count: item.count,
            total: item.price* item.count
        },
        
        success: function(response) {

            alert("成功");
            console.log(response);

        },
        error: function(err){alert(err.status + " " + err.statusText)}
    });
}


$(function(){
    Vue.createApp(app).mount('#app')
})


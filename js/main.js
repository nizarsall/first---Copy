
const store=new Vuex.Store({

state:{
    suser:[],
    recipes:[ {
        name:"burger",
        img:"./pics/close-up-photo-of-burger-3915906-scaled.jpg",
        desc:"grilled meat with cheader cheese",
        ings:[{name:"meat",quantity:2},{name:"cheader",quantity:1},{name:"tomatos",quantity:4},{name:"pickles",quantity:5}]
      },{
        name:"pizza",
        img:"./pics/Homemade-Pizza_EXPS_HCA20_376_E07_09_2b.jpg",
        desc:"italian pizza with mozzarilla",
        ings:[{name:"bread",quantity:2},{name:"mozarilla",quantity:1},{name:"tomatos",quantity:4},{name:"olive",quantity:5}]
      },{
        name:"lazagina",
        img:"./pics/Most-Amazing-Lasagna-2-e1574792735811.jpg",
        desc:"chees , meat and saus",
        ings:[{name:"bread",quantity:2},{name:"mozarilla",quantity:1},{name:"tomatos",quantity:4},{name:"olive",quantity:5}]
      }],
      shopinglist:[],
      t:{}
},
mutations:{
    signup(state,user){
        state.suser.push(user)
    },
    addrecipe(state,rec)
    {
        let trec={name:rec.name,
         img:rec.img ,
        desc:rec.desc,
        ings:rec.ings
        
        
        }
        state.recipes.push(trec);
    },
    addsh(state,ingr)
    {
           let ting={name:ingr.name,quantity:ingr.quantity};
         let tting= state.shopinglist.findIndex(element=>element.name==ting.name);
         
            state.t=tting;
            if(tting==-1){
            state.shopinglist.push(ting);
            }
            else{
              state.shopinglist[tting].quantity+=ting.quantity;
            }
    
    },
    delrec(state, n)
    {
        state.recipes.splice(n,1)
    },
    edrec(state,re){
        state.recipes[re.reindex].name=re.name;
        state.recipes[re.reindex].desc=re.desc;
        state.recipes[re.reindex].ings=re.ings;
    },
    updatelist(state,recin){

        state.shopinglist[recin.in].quantity=recin.n;
    }

}

})
var eventbus=new Vue()
Vue.component('signup',{
    store,
    template:`
    
    <form @submit.prevent="sign" >
            
            <input type="text" v-model="user.name" required  placeholder="Name" >
            
            <input type="email" v-model="user.email" required  placeholder="Email">
            
            <input type="password" v-model="user.password" required  placeholder="Password" >
            <input type="submit" class="submit">

        </form>
        
    `,
    data(){
        return{
            user:{
            name:'',
            email:'',
            password:''}
            
        }
    },
    methods:{
        sign:function(){
         if(this.checkEmail)
         {
             this.$store.commit('signup',this.user)

             eventbus.$emit('sigtrans')

         }

        },
        
        checkEmail:function () {

        
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;    
            if (!re.test(this.user.localemail)) {
            alert('Please provide a valid email address');
            
            return false;
         }
        }
    }
})
Vue.component('login',{
    template:`
    <form action="" @submit.prevent="loginn" >
          
          <input type="text " v-model="user.name" placeholder="Name" >
          
          <input type="password" v-model="user.password" placeholder="Password">
          <input type="submit" class="submit">
      </form>`
      ,
      data()
      {
          return{
              user:{
              name:"",
              password:""},
              logged:false,
              
          }
      }
      ,
      methods:
      {
          loginn:function(){
          
            for (var i = 0; i < this.l; i++) {
                if(this.signedusers[i].name==this.user.name)
                {this.logged=true
                eventbus.$emit('loged')
                }
                
            } 
                  
                  
              
              
          },
          auth(userr){
              if(this.user.name==userr.name){this.logged=true}
          }
      },
      
      computed:{
        signedusers(){return this.$store.state.suser},
        l(){return this.signedusers.length}

      }
})
Vue.component('recadd',{

template:`

<div class="editrec" >

    <div>
    
    <input type="text" v-model="recipe.name" style="width:98%;"  required placeholder="Rcipe name">
    
    </div>
    <div><input type="file" @change="selectimg" style="width 20px">   </div>
    <div></div>
    <div>
    <input type="text" v-model="recipe.desc" style="height:50px;width:98%;"  required placeholder="Description">
    <div class="mytext" style="font-size:20px; margin:0px">
    <span>ingreadents :</span>
    <ul >
        <li v-for="(inge,index) in recipe.ings" style="margin:0px">{{inge.name}} ({{inge.quantity}}) <button class="minusebutton" @click="reming(index)">-</button>  </li>
    </ul>
    <input type="text" v-model="ing.name" placeholder="ingrediant name" style="width:150px">
    <input type="number" v-model="ing.quantity" class="numinput">
    <button @click="adding" class="minusebutton" style="color: white;">+</button>
    
    </div>
    </div>
    <div> <img :src="recipe.img" style="margin:10px; height:200px; width:200px; position:absloute; z-index:8; top:20%;right:0%; border-radius:20px;"> 
    
    
    </div>
    <div></div>
    <button @click="addrecipe" style="margin:0px; position:absloute; right:0%">Add recipe</button>
    <div>
    
    </div>
    
</div>
</div>
`,

data(){
    return{
        recipe:{
            name:"",
            img:"./pics/unnamed.png",
            desc:"",
            ings:[]
          },
        ing:{name:"",
        quantity:0},
        styleobj:{
            
            
        }
        
    }
}
,
    methods:
    {
       adding:function(){
           if(this.ing.name!=""&& this.ing.quantity>0){
           let k ={ name:this.ing.name, quantity:this.ing.quantity  }
           this.recipe.ings.push(k);
           this.ing.name="";
           this.ing.quantity="";
       }},
       reming:function(n){
           
               this.recipe.ings.splice(n,1)
           
       },
       addrecipe:function()
       {
           if(this.recipe.name==""){ alert('Please provide a recipe name');}
           else if(this.recipe.desc==""){ alert('Please provide a desc');}
           else if(this.recipe.ings.length==0){alert('please add ingredants')}
           else if(this.recipe.img=="./pics/unnamed.png"){alert('please add an image')}
           else{
            eventbus.$emit('doit')
           this.$store.commit('addrecipe',this.recipe); 
           this.recipe.name="",
           this.recipe.desc="",
           this.recipe.img="./pics/unnamed.png"
            this.recipe.ings=[];
        }
       },
       selectimg:function(event)
       {
           
           let img=event.target.files[0];
           let reader= new FileReader();
           reader.readAsDataURL(img);
           reader.onload=event=>{this.recipe.img=event.target.result}

       },
       
       

         
        

    },
computed:{
    recipes(){return this.$store.state.recipes},
    shopinglist(){return this.$store.state.shopinglist},
}


})

Vue.component('recedit',{

    props:{
        rein:{
            type:Number,
            required:true
        }
    },

    template:`
    
    <div class="editrec" >
    
        <div>
        
        <input type="text" v-model="recipe.name" style="width:98%;">
        
        </div>
        <div> <input type="file" @change="selectimg" :style="styleobj">  </div>
        <div></div>
        <div>
        <input type="text" v-model="recipe.desc" style="height:50px;width:98%;">
        <div style="margin:0px; font-size:20px; position:absloute; top:40% ; left:0%" class="mytext">
        <span>ingreadents :</span>
        <ul >
            <li v-for="(inge,index) in recipe.ings">{{inge.name}} ({{inge.quantity}}) <button class="minusebutton" @click="reming(index)">-</button>  </li>
        </ul>
        <input type="text" v-model="ing.name" placeholder="ingrediant name" style="width:150px">
        <input type="number" v-model="ing.quantity" class="numinput">
        <button @click="adding" class="minusebutton" style="color: white;">+</button>
        
        </div>
        </div>
        
        <div> <img :src="recipe.img" style="margin:10px; height:200px; width:200px; position:absloute; z-index:8; top:20%;right:0%; border-radius:20px;">  </div>
        <div></div>
        <div>
        
        <button @click="editrecipe" style="vertical-align: bottom; margin-left: 30px;">Edit recipe</button>
        </div>
        <div>
        
        </div>
        
    </div>
    </div>
    `,
    
    data(){
        return{
            recipe:{
                name:"",
                img:"./pics/Image-512.png",
                desc:"",
                ings:[]
              },
            ing:{name:"",
            quantity:""},
            styleobj:{}
            
        }
    }
    ,
        methods:
        {
           adding:function(){
               let k ={ name:this.ing.name, quantity:this.ing.quantity  }
               this.recipe.ings.push(k);
               this.ing.name="";
               this.ing.quantity="";
           },
           reming:function(n){
               
               
                   this.recipe.ings.splice(n,1)
               
           },
           editrecipe:function()
           {
               
            this.$store.commit('edrec',this.recipe)
            eventbus.$emit('doneed');
           },
           selectimg:function(event)
       {
           
           let img=event.target.files[0];
           let reader= new FileReader();
           reader.readAsDataURL(img);
           reader.onload=event=>{this.recipe.img=event.target.result}

       },
           
    
             
            
    
        },
        mounted(){
            eventbus.$on('edition',data=>{this.recipe=this.recipes[this.rein];this.recipe.reindex=this.rein})
        },
    computed:{
        recipes(){return this.$store.state.recipes}
    },watch:{
        rein(){eventbus.$on('edition',data=>{this.recipe=this.recipes[this.rein];this.recipe.reindex=this.rein})}
    }
    
    
    })
Vue.component('taps',{
    
template:`
<div>

<button  v-for="(tap,index) in taps"  :kye='index' @click="selectedtap = tap" :class="{activeTab: selectedtap === tap }">
{{tap}}

</button>
<signup v-show="selectedtap === 'signup'"></signup>

<login  v-show="selectedtap === 'login'"></login>
</div>


`,
data(){
    return{
    taps:['signup','login'],
    selectedtap:'signup',
    vis:true
}},

mounted(){
    eventbus.$on('sigtrans', data=>{this.selectedtap='login'})
}

})


Vue.component('mylist',{
    template:`
    <div style="position: fixed; top: 60px; right: 0%; background-color: rgba(70, 133, 252, .5); height: wrap; z-index: 5; width:20%;">
        <ul>
            <li style="color: seashell;font-size=50px" v-for="(item,index) in shopinglist" >
                {{item.name}} <input type="number" v-model.number="item.quantity" class="numinput" @focus="recin=index">
            </li>
        </ul>
    </div>
    `,
    data(){return{
        recin:0,}
    },
    computed:{
        shopinglist(){return this.$store.state.shopinglist},
        item(){return this.shopinglist[this.recin].quantity}
    },
    watch:{
        shopinglist:
        {
          deep:true,
          handler(newval)
          {
             if(newval[this.recin].quantity<1)
             {
                 newval[this.recin].quantity=1;
             }
             else{
                 this.$store.commit('updatelist',{in:this.recin,n:newval[this.recin].quantity})
             }
          }
        }
    }
})


var app = new Vue({
    el: '#app',
    store,
    data:{
      vis:false,
     sr:"",
     editmode:false,
     addmode:false,
     re:null,
     recipe:{
        name:"",
        img:null,
        desc:"",
        ings:[]
      },
      
      reindex:0,
      vis2:false,
      logeed:false
    },
    
    methods:{
        shrec:function(n,ind){
           this.sr=n;
           this.recipe=this.recipes[ind];
           this.reindex=ind;
           eventbus.$emit('edition');
        },
        addtosh:function(r){
            this.re=this.recipes[r];
            
             for(i=0;i<this.re.ings.length;i++)    {
                this.$store.commit('addsh',this.re.ings[i])}
            
        },
        deleterec:function(n){

            this.$store.commit('delrec',n)
            sr=""
        },
        sel(n){return this.sr==n },
        addition(){this.addmode=true}
    },
    mounted(){
        eventbus.$on('doit' , data=>{this.addmode=false})
        eventbus.$on('loged' ,data=>{this.logeed=true;this.vis=false})
        eventbus.$on('doneed',data=>{this.sr=""})
        
    },
    
 computed:{
    recipes(){return this.$store.state.recipes},
    
    
}  
    
    
})
 
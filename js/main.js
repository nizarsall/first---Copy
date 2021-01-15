
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
        state.recipes.push(rec)
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
    <div></div>
    <div></div>
    <div>
    <input type="text" v-model="recipe.desc" style="height:50px;width:98%;"  required placeholder="Description">

    </div>
    <div></div>
    <div></div>
    <div>
    <div style="background-color: aliceblue;">
    <span>ingreadents :</span>
    <ul >
        <li v-for="(inge,index) in recipe.ings">{{inge.name}} ({{inge.quantity}}) <button class="minusebutton" @click="reming(index)">-</button>  </li>
    </ul>
    <input type="text" v-model="ing.name" placeholder="ingrediant name">
    <input type="number" v-model="ing.quantity" class="numinput">
    <button @click="adding" class="minusebutton" style="color: #1E95EA;">+</button>
    
    </div>
    
    </div>
    <div>
    <button @click="addrecipe" style="vertical-align: bottom; margin-left: 30px;">Add recipe</button>
    </div>
    
</div>
</div>
`,

data(){
    return{
        recipe:{
            name:"",
            img:"./pics/Image-512.jpg",
            desc:"",
            ings:[]
          },
        ing:{name:"",
        quantity:""},
        
    }
}
,
    methods:
    {
       adding:function(){
           if(this.ing.name!=""&& this.ing.quantity!=""){
           let k ={ name:this.ing.name, quantity:this.ing.quantity  }
           this.recipe.ings.push(k);
           this.ing.name="";
           this.ing.quantity="";
       }},
       reming:function(n){
           
               this.recipe.ings.splice(n,0)
           
       },
       addrecipe:function()
       {
           if(this.recipe.name==""){ alert('Please provide a recipe name');}
           else if(this.recipe.desc==""){ alert('Please provide a desc');}
           else if(this.recipe.ings.length==0){alert('please add ingredants')}
           else
           this.$store.commit('addrecipe',this.recipe)
       },
       selectimg:function(event)
       {
           
           this.recipe.img=event.target.files[0].src
       }

         
        

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
        <div></div>
        <div></div>
        <div>
        <input type="text" v-model="recipe.desc" style="height:50px;width:98%;">
    
        </div>
        <div></div>
        <div></div>
        <div>
        <div style="background-color: aliceblue;">
        <span>ingreadents :</span>
        <ul >
            <li v-for="(inge,index) in recipe.ings">{{inge.name}} ({{inge.quantity}}) <button class="minusebutton" @click="reming(index)">-</button>  </li>
        </ul>
        <input type="text" v-model="ing.name" placeholder="ingrediant name">
        <input type="number" v-model="ing.quantity" class="numinput">
        <button @click="adding" class="minusebutton" style="color: #1E95EA;">+</button>
        
        </div>
        
        </div>
        <div>
        <button @click="editrecipe" style="vertical-align: bottom; margin-left: 30px;">Edit recipe</button>
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
               
               this.recipe.img=event.target.files[0].src
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
            <li style="color: seashell;font-size=50px" v-for="item in shopinglist" >
                {{item.name}} <input type="number" v-model="item.quantity" class="numinput">
            </li>
        </ul>
    </div>
    `,
    computed:{
        shopinglist(){return this.$store.state.shopinglist}
    }
})


var app = new Vue({
    el: '#app',
    store,
    data:{
      vis:false,
     sr:"",
     editmode:false,
     re:null,
     recipe:{
        name:"",
        img:null,
        desc:"",
        ings:[]
      },
      addmode:false,
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
        sel(n){return this.sr==n }
    },
    mounted(){
        eventbus.$on('loged' ,data=>{this.logeed=true})
        eventbus.$on('doneed',data=>{this.sr=""})
    },
    
 computed:{
    recipes(){return this.$store.state.recipes},
    
    
}  
    
    
})
 
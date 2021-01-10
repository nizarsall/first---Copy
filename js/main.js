
const store=new Vuex.Store({

state:{
    suser:[]
},
mutations:{
    signup(state,user){
        state.suser.push(user)
    }
}

})
var eventbus=new Vue()
Vue.component('signup',{
    store,
    template:`
    
    <form @submit.prevent="sign" >
            <label for="name" >name: </label>
            <input type="text" v-model="user.name" required>
            <label for="email">email:</label>
            <input type="email" v-model="user.email" required>
            <label for="password" >  password: </label>
            <input type="password" v-model="user.password" required>
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
             this.name="",
             this.email="",
             this.password=""
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
          <label for="name">name:</label>
          <input type="text " v-model="user.name" >
          <label for="password">password:</label>
          <input type="password" v-model="user.password">
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
var app = new Vue({
    el: '#app',
    store,
    data:{
      vis:true
    }
    ,
    methods:
    {
       
         
        

    },
    mounted(){
        eventbus.$on('loged' ,data=>{this.vis=false})
    }
   
    
    
})
 
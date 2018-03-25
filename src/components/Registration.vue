<template>
    <div class="Registration">
        <div class="container">
             <div class="columns">
                <div class="column is-10">       
                    <div class="box has-text-left"> 
                            <div class="columns">
                                <div class="column">
                                    <b-field label="WID No" :type="errors.has('WID No') ? 'is-danger': ''" :message="errors.has('WID No') ? errors.first('WID No'): ''">
                                        <b-input name="WID No" v-model="registration.widNo" v-validate="'required'"></b-input>
                                    </b-field>
                                </div>
                                <div class="column">
                                    <b-field label="Title Only">
                                        <b-input  v-model="registration.titleOnly"></b-input>
                                    </b-field>
                                </div> 
                            </div>
                        <app-address :address="registration.address"></app-address>  
                         
                    </div>     
                </div>
            </div>        
        </div>    
    </div>
</template>

<script>
import bus from '@/bus'
export default {
    name: "Registration",
    
    props: {
      registration: Object
    },
  created () {
    bus.$on('validate-registration', () => {
        this.$validator.validateAll().then(result => {
        if(!result) {
          bus.$emit('validated', this.$validator.errors)
        }
      })
    })
    // bus.$on('validate-reg-address', () => {
    //         Address.$validator.validateAll().then(result => {
    //             if(!result) {
    //                 bus.$emit('validated', Address.$validator.errors)
    //             }
    //         })
    //     })
  }
}
</script>


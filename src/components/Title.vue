<template>
    <div class="Title">
        <div class='container'>
            <div class="columns">
                <div class="column is-10">  
                <div class="box has-text-left">
                    <div class="columns">
                        <div class="column">
                            <b-field label="Title No*" :type="errors.has('Title No') ? 'is-danger': ''" 
                                :message="errors.has('Title No') ? errors.first('Title No'):''">                       
                                <b-input name="Title No" v-model="title.titleNo" v-validate="'required'"></b-input> 
                            </b-field>
                        </div>
                        <div class="column"> 
                            <b-field label="Current Owner*" :type="errors.has('Current Owner') ? 'is-danger': ''"
                                :message="errors.has('Current Owner') ? errors.first('Current Owner'): ''">
                                <b-input name="Current Owner" v-model="title.curOwner" v-validate="'required'"></b-input>
                            </b-field>
                        </div>
                    </div>
                    <app-address :address="title.address"></app-address>
                </div>
           
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import bus from '@/bus'

export default {
  name: 'Title',
  props: {
      title: Object
  },
  created () {
    bus.$on('validate-title', () => {
        this.$validator.validateAll().then(result => {
        if(!result) {
          bus.$emit('validated', this.$validator.errors)
        }
        bus.$emit('validate-address')
      })
      
    })
  }
}
</script>


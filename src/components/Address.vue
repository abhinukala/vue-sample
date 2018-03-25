<template>
    <div class="Address">
        <div class="columns">
            <div class="column">
                <b-field label="AddressLine1*" :type="errors.has('Address') ? 'is-danger': ''" 
                                :message="errors.has('Address') ? errors.first('Address'):''">                       
                    <b-input name="Address" v-model="address.line1" v-validate="'required'"></b-input> 
                </b-field>
            </div>
            <div class="column">
                <b-field label="City*" :type="errors.has('City') ? 'is-danger': ''" 
                                :message="errors.has('City') ? errors.first('City'):''">
                    <b-input name="City" v-model="address.city" v-validate="'required'"></b-input>
                </b-field>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@/bus'
export default {
  name: "Address",
  props: {
      address: Object
  },
    created(){ 
        bus.$on('validate-address', () => {
            this.$validator.validateAll().then(result => {
                if(!result) {
                    bus.$emit('validated', this.$validator.errors)
                }
            })
        })
    }
}
</script>

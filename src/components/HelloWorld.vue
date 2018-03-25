<template>
  <section>
    <div class="columns">
      <div class="column is-10">
        <div class="box">
            <b-tabs type="is-toggle" expanded v-model="activeTab">
                <b-tab-item @click="activeTab=0" label="Title">
                  <app-title :title="title"></app-title>
                </b-tab-item>
                <b-tab-item @click="activeTab=1" :disabled="activeTab<1" label="Registration">
                    <app-registration :registration="registration"></app-registration>
                </b-tab-item>
            </b-tabs>
            <a class="button is-success" v-if="activeTab>0" @click="getBackActiveTab">Back </a>
            <a class="button is-success" v-if="activeTab<5" @click="getNextActiveTab">Next</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from '@/components/Title'
import Registration from '@/components/Registration'
import bus from '@/bus'

export default {
  name: 'Home',
  components: {
    'app-title': Title,
    'app-registration': Registration
  },
  data () {
    return {
      activeTab: 0,
      title: {
        titleNo: '',
        curOwner: '',
        address: {}
      },
      registration: {
        widNo:'',
        titleOnly:'',
        address: {}
      },
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: ''
      },
      hasErrors: false
    }
  },
  methods: {
    getNextActiveTab (event) {
        if (this.activeTab == 0){
          this.validateTitleTab()
        }
        if (this.activeTab == 1){
          this.validateRegistrationTab()
        }
          this.$nextTick(() => {
            if (!this.hasErrors) {
              this.activeTab = this.activeTab+1
              this.$emit('activeTab',{activeTab:this.activeTab})
            }
          })
    },
    getBackActiveTab (event) {
      this.activeTab = this.activeTab-1
      this.$emit('activeTab',{activeTab:this.activeTab} )
    },
    validateTitleTab () {
      bus.$emit('validate-title')
      bus.$emit('validate-address')
          this.hasErrors = false
          this.$validator.validateAll().then(result => {
            if(!result) {
              this.hasErrors = true
            } 
          })
    },
    validateRegistrationTab () {
      bus.$emit('validate-registration')
      bus.$emit('validate-address')
          this.hasErrors = false
          this.$validator.validateAll().then(result => {
            if(!result) {
              this.hasErrors = true
            }
          })
    },
    validateAddress () {
      bus.$emit('validate-address')
          this.hasErrors = false
          this.$validator.validateAll().then(result => {
            if(!result) {
              this.hasErrors = true
            }
          })
    }
  },
  created () {
      bus.$on('validated', (errors) => {
        this.hasErrors = true
        errors.forEach(error => {
          this.$validator.errors.push(error)
        })
      })
    }
}
</script>

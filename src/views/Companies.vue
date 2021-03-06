<template>
  <div class="companies">
    <Buttons @_click="click" :names="{ Partners: true, Messages: false }" />

    <center
      class="sponsors-page"
      style="margin-top: 8vh"
      v-if="!loading_partners"
    >
      <div class="main-sponsors sponsors">
        <Partner
          v-for="partner in main_sponsors"
          :key="partner.name"
          @learn="learn"
          :name="partner.name"
          :partnership="partner.partnership_tier"
          :img_src="jeec_brain_url + partner.logo"
        />
      </div>
      <div class="gold-sponsors sponsors">
        <Partner
          v-for="partner in gold_sponsors"
          :key="partner.name"
          @learn="learn"
          :name="partner.name"
          :partnership="partner.partnership_tier"
          :img_src="jeec_brain_url + partner.logo"
        />
      </div>
      <div class="silver-sponsors sponsors">
        <Partner
          v-for="partner in silver_sponsors"
          :key="partner.name"
          @learn="learn"
          :name="partner.name"
          :partnership="partner.partnership_tier"
          :img_src="jeec_brain_url + partner.logo"
        />
      </div>
      <div class="bronze-sponsors sponsors">
        <Partner
          v-for="partner in bronze_sponsors"
          :key="partner.name"
          @learn="learn"
          :name="partner.name"
          :partnership="partner.partnership_tier"
          :img_src="jeec_brain_url + partner.logo"
        />
      </div>
    </center>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Partner from "@/components/Partner.vue";
// import UserService from "../services/user.service";

export default {
  name: "Companies",
  components: {
    Buttons,
    Partner,
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      partners: [{name:'BNP Paribas', partnership_tier:'silver', logo:'/static/companies/images/bnp_paribas_.png'},
      {name:'Celfinet', partnership_tier:'bronze', logo:'/static/companies/images/celfinet.png'},
      {name:'CI&T', partnership_tier:'silver', logo:'/static/companies/images/ci&t.png'},
      {name:'Fidelidae', partnership_tier:'bronze', logo:'/static/companies/images/fidelidade.png'},
      {name:'Infinera', partnership_tier:'bronze', logo:'/static/companies/images/infinera.png'},
      {name:'KPMG', partnership_tier:'gold', logo:'/static/companies/images/kpmg.png'},
      {name:'Siemens', partnership_tier:'silver', logo:'/static/companies/images/siemens.png'},
      {name:'Vodafone', partnership_tier:'silver', logo:'/static/companies/images/vodafone.png'},
      ],
      partner: null,
      loading_partners: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    main_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "main_sponsor";
      });
    },
    gold_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "gold";
      });
    },
    silver_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "silver";
      });
    },
    bronze_sponsors() {
      return this.partners.filter((obj) => {
        return obj.partnership_tier === "bronze";
      });
    },
  },
  methods: {
    learn(name) {
      this.$router.push({ name: "Company", params: { name: name } });
    },
    click(name) {
      if (name === "Messages") {
        this.$router.push("/chat");
      }
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    // UserService.getPartners().then(
    //   (response) => {
    //     this.partners = response.data.data;
    //     this.loading_partners = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loading_partners = false;
    //   }
    // );
  },
};
</script>

<style scoped>
.companies {
  background-color: #e6e6e6;
}

.sponsors-page {
  background-color: #f1f1f1;
}

.sponsors {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

@media screen and (max-width: 1100px) {
  .sponsors-page {
    height: 82vh;
    overflow-y: auto;
  }
}

@media screen and (min-width: 1100px) {
  .companies {
    height: 100vh;
    overflow-y: auto;
  }

  .partner-info {
    width: 50vw;
  }

  .sponsors:first-of-type {
    padding-top: 3vh;
  }

  .sponsors:last-of-type {
    padding-bottom: 3vh;
  }
}
</style>

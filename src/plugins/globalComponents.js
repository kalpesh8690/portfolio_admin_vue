import BaseInput from "@/components/Inputs/BaseInput.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
import Card from "@/components/Cards/Card.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import BaseDatePicker from "@/components/Inputs/BaseDatePicker.vue";

/**
 * You can register global components here
 */
const GlobalComponents = {
  install(Vue) {
    Vue.component("base-input", BaseInput);
    Vue.component("base-dropdown", BaseDropdown);
    Vue.component("base-button", BaseButton);
    Vue.component("base-alert", BaseAlert);
    Vue.component("base-card", Card);
    Vue.component("base-datepicker", BaseDatePicker);
  },
};

export default GlobalComponents;

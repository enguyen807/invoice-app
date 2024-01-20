<script setup lang="ts">
// import INVOICES from "@/assets/json/invoices.json";

import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import Card from "primevue/card";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import Invoice from "@/components/Invoice.vue";
import { useInvoiceStore } from "@/store";

const route = useRoute();
const router = useRouter();
const invoiceStore = useInvoiceStore();
const selectedStatuses = ref();
// const invoice = ref();
const getInvoiceById = (no) => invoiceStore.getInvoiceById(no);

const invoice = computed(() => getInvoiceById(route.params.id));

onBeforeMount(() => {
  invoiceStore.getInvoices();
});
</script>

<template>
  <div class="flex justify-content-center">
    <Card style="width: 50rem; margin-top: 2em; margin-bottom: 2em">
      <template #title>
        <div @click="router.push({ name: 'dashboard' })" style="cursor: pointer">
          <i class="pi pi-arrow-left" />
          Back
        </div>
      </template>
      <template #content>
        <Invoice v-if="invoice" :invoice="invoice" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.p-card {
  background: transparent;
}
</style>

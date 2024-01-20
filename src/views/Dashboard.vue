<script setup lang="ts">
import INVOICES from "@/assets/json/invoices.json";

import { ref, onMounted } from "vue";
import Card from "primevue/card";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import InvoiceBar from "@/components/InvoiceBar.vue";

const selectedStatuses = ref();
const invoices = ref([]);

const statuses = ref([
  { name: "Pending" },
  { name: "Paid" },
  { name: "Draft" },
  { name: "Sent" },
  { name: "Overdue" },
  { name: "Void" },
]);

onMounted(() => {
  setTimeout(() => {
    invoices.value = INVOICES;
  }, 1000);
});
</script>

<template>
  <div class="flex justify-content-center">
    <Card style="width: 50rem; margin-top: 2em; margin-bottom: 2em">
      <template #title>
        <div class="flex justify-content-between">
          <div class="flex flex-column">
            <div class="text-lg mb-2">Invoices</div>
            <div class="text-sm">There are 7 total invoices</div>
          </div>
          <div>
            <MultiSelect
              class="border-transparent surface-overlay"
              v-model="selectedStatuses"
              :options="statuses"
              optionLabel="name"
              placeholder="Filter by status"
            />
            <!-- <Button label="New Invoice" class="p-button-rounded" /> -->
            <Button type="button" class="p-button-rounded p-button-primary ml-2">
              <span><i class="pi pi-plus p-1 border-circle"></i></span>
              <span class="ml-2 font-bold">New Invoice</span>
            </Button>
          </div>
        </div>
      </template>
      <template #content>
        <InvoiceBar
          v-for="(invoice, i) in invoices"
          :key="invoice.no"
          :index="i"
          :invoice="invoice"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.p-card {
  background: transparent;
}
</style>

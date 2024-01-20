<script setup lang="ts">
import { ref, PropType } from "vue";
import { useDateFormat } from "@vueuse/core";
import { Invoices } from "@/core/interfaces/invoices.json";
import Message from "primevue/message";
import Button from "primevue/button";
import { formatNumbers } from "@/core/helpers";
import { useRouter } from "vue-router";

defineProps<{
  invoice: PropType<Invoices>;
}>();

const router = useRouter();
const count = ref(0);

const convertUTCToLocal = (date: string) => useDateFormat(date, "YYYY-MM-DD").value;

const openInvoice = (invoiceNo) => {
  router.push({ name: "Invoice", params: { id: invoiceNo } });
};

const getStatusColor = (status: string) => {
  if (!status) return;
  if (status === "sent" || status === "paid") return "bg-success";
  if (status === "pending") return "bg-warning";
  if (status === "overdue" || status === "void") return "bg-danger";
  return "bg-secondary";
};
</script>

<template>
  <div class="invoice__wrapper border-round">
    <span class="invoice__no" :title="invoice.no">{{ invoice.no }}</span>
    <span class="invoice__dueDate">Due {{ convertUTCToLocal(invoice.dueDate) }}</span>
    <span class="invoice__contact">{{ invoice.to.name }}</span>
    <span class="invoice__total">{{ formatNumbers(invoice.total) }}</span>
    <div class="flex align-items-center">
      <span class="invoice__status bg-success" :class="getStatusColor(invoice.status)">
        {{ invoice.status }}</span
      >
      <Button
        icon="pi pi-angle-right"
        class="p-button-rounded p-button-primary p-button-text"
        @click="openInvoice(invoice.no)"
      />
    </div>
  </div>
</template>

<style scoped>
.invoice__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1rem;
  /* border-radius: 0.8rem; */
  /* background-color: rgb(22, 51, 24); */
  background-color: #89898924;
  margin-bottom: 0.2rem;
}

.invoice__no {
  font-family: "Raleway-SemiBold";
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.invoice__total {
  font-family: "Raleway-Bold";
  font-size: 21px;
}

.bg-success {
  background: #c8e6c9;
  border: solid #439446;
  border-width: 0 0 0 6px;
  color: #224a23;
}

.bg-warning {
  background: #ffecb3;
  border: solid #d9a300;
  border-width: 0 0 0 6px;
  color: #6d5100;
}

.bg-danger {
  background: #ffcdd2;
  border: solid #e60017;
  border-width: 0 0 0 6px;
  color: #73000c;
}

.bg-secondary {
  background: #e7e7e7;
  border: solid #595959;
  border-width: 0 0 0 6px;
  color: #595959;
}

.invoice__status {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem;
  margin: 0;
  border-radius: 6px;
  margin-right: 1.2rem;
  width: 120px;
  text-align: center;
  justify-content: center;
  text-transform: capitalize;
}
</style>

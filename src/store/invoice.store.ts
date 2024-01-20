import INVOICES from "@/assets/json/invoices.json";
import { defineStore } from "pinia";

export const useInvoiceStore = defineStore({
  id: "invoice",
  state: () => ({
    invoices: [],
  }),
  getters: {
    getInvoiceById: (state) => {
      return (invoiceNo) =>
        state.invoices.find((invoice) => invoice.no === invoiceNo);
    },
  },
  actions: {
    async getInvoices() {
      setTimeout(() => {
        // console.log(INVOICES);
        this.invoices = INVOICES;
      }, 1000);
    },
  },
});

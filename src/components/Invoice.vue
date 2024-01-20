<script setup lang="ts">
import { ref, PropType, computed } from "vue";
import { useDateFormat } from "@vueuse/core";
import { Invoices } from "@/core/interfaces/invoices.json";

import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import Sidebar from "primevue/sidebar";

import { formatNumbers } from "@/core/helpers";

const props = defineProps<{
  invoice: PropType<Invoices>;
}>();

const count = ref(0);
const visibleLeft = ref(false);
const selectedTerm = ref("");
const terms = ref([
  { name: "Due in 7 days" },
  { name: "Due in 14 days" },
  { name: "Due in 30 days" },
]);

const convertUTCToLocal = (date: string) => useDateFormat(date, "YYYY-MM-DD").value;

const getStatusColor = (status: string) => {
  if (!status) return;
  if (status === "sent" || status === "paid") return "bg-success";
  if (status === "pending") return "bg-warning";
  if (status === "overdue" || status === "void") return "bg-danger";
  return "bg-secondary";
};

const totalInvoice = computed(() => {
  let total = 0;
  console.l;
  for (let invoice of props.invoice.rows) {
    total += invoice.total;
  }

  return formatNumbers(total);
});
</script>

<template>
  <div
    class="flex justify-content-between border-round mb-3"
    style="background-color: #89898924; padding: 1.2rem 1rem"
  >
    <div class="flex align-items-center">
      <div class="text-lg mr-2">Status:</div>
      <span class="invoice__status bg-success" :class="getStatusColor(invoice.status)">
        {{ invoice.status }}</span
      >
    </div>
    <div>
      <!-- <Button label="New Invoice" class="p-button-rounded" /> -->
      <Button
        type="button"
        class="p-button-rounded p-button-secondary ml-2"
        @click="visibleLeft = true"
      >
        <span class="font-bold">Edit</span>
      </Button>
      <Button type="button" class="p-button-rounded p-button-danger ml-2">
        <span class="font-bold">Delete</span>
      </Button>
      <Button
        type="button"
        class="p-button-rounded p-button-primary ml-2"
        :disabled="invoice.status === 'paid'"
      >
        <span class="font-bold">Mark as Paid</span>
      </Button>
    </div>
  </div>

  <div class="" style="background-color: #89898924; padding: 2.2rem 3rem">
    <div class="flex justify-content-between mb-3">
      <div class="flex flex-column">
        <div class="mb-2">#{{ invoice.no }}</div>
        <div class="text-primary font-bold invoice__header_font text-lg">
          {{ invoice.from.company }}
        </div>
      </div>
      <div class="text-primary font-bold invoice__header_font">
        <div>{{ invoice.from.address }}</div>
        <div>
          {{ invoice.from.city }}, {{ invoice.from.state }}, {{ invoice.from.zip }}
        </div>
        <div>{{ invoice.from.country }}</div>
      </div>
    </div>
    <div class="flex justify-content-start">
      <div class="flex flex-1 justify-content-between column-gap-4">
        <div class="flex flex-column row-gap-5 flex-none">
          <div>
            <div class="text-primary font-bold invoice__header_font mb-2">
              Issue Date:
            </div>
            <div class="text-lg">{{ convertUTCToLocal(invoice.createdAt) }}</div>
          </div>
          <div>
            <div class="text-primary font-bold invoice__header_font mb-2">Due Date</div>
            <div class="text-lg">{{ convertUTCToLocal(invoice.dueDate) }}</div>
          </div>
        </div>

        <div class="flex flex-column" style="flex: 1">
          <div class="text-primary font-bold invoice__header_font mb-2">Issue To:</div>
          <div class="text-lg mb-2">{{ invoice.to.name }}</div>
          <div class="text-primary font-bold invoice__header_font mb-2">
            <div>{{ invoice.to.address }}</div>
            <div>{{ invoice.to.city }}, {{ invoice.to.state }}</div>
            <div>
              {{ invoice.to.zip }}
            </div>
            <div>{{ invoice.to.country }}</div>
          </div>
        </div>

        <div class="flex flex-column" style="flex: 2">
          <div class="text-primary font-bold invoice__header_font mb-2">Sent To:</div>
          <div class="text-lg">{{ invoice.to.email }}</div>
        </div>
      </div>
    </div>

    <div class="surface-100 mt-5">
      <DataTable
        :value="invoice.rows"
        class="p-datatable-customers"
        :rows="10"
        dataKey="id"
        :rowHover="true"
        :loading="loading"
        responsiveLayout="scroll"
      >
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column field="name" header="Name"></Column>
        <Column
          field="qty"
          header="Quantity"
          class="numericColumn"
          style="text-align: right"
        ></Column>
        <Column
          field="price"
          header="Price"
          dataType="numeric"
          class="numericColumn"
          style="text-align: right"
        >
          <template #body="{ data }">
            {{ formatNumbers(data.price) }}
          </template>
        </Column>
        <Column
          field="total"
          header="Total"
          dataType="numeric"
          class="numericColumn"
          style="text-align: right"
        >
          <template #body="{ data }">
            {{ formatNumbers(data.total) }}
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column
              footer="Amount Due"
              :colspan="3"
              footerStyle="text-align:right; background-color: #717171"
            />
            <Column
              :footer="totalInvoice"
              style="text-align: right; font-size: 22px; background-color: #717171"
            />
            <!-- <Column :footer="thisYearTotal" /> -->
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
  </div>

  <Sidebar v-model:visible="visibleLeft" class="p-sidebar-md">
    <div
      class="text-2xl text-overflow-ellipsis white-space-nowrap overflow-hidden mb-6"
      style="font-family: 'Raleway-Bold'"
    >
      Edit: #{{ invoice.no }}
    </div>

    <div class="mb-6">
      <div class="text-primary font-bold invoice__header_font mb-5">Bill From</div>

      <span class="p-float-label mb-4 fullWidth__input">
        <InputText id="billFromStreetAddress" type="text" v-model="value" />
        <label for="billFromStreetAddress">Street Address</label>
      </span>

      <div class="flex justify-content-between">
        <span class="p-float-label">
          <InputText id="billFromCity" type="text" v-model="value" />
          <label for="billFromCity">City</label>
        </span>

        <span class="p-float-label">
          <InputText id="billFromPostCode " type="text" v-model="value" />
          <label for="billFromPostCode  ">Post Code</label>
        </span>

        <span class="p-float-label">
          <InputText id="billFromCountry" type="text" v-model="value" />
          <label for="billFromCountry">Country</label>
        </span>
      </div>
    </div>

    <div>
      <div class="text-primary font-bold invoice__header_font mb-5">Bill To</div>

      <span class="p-float-label mb-5 fullWidth__input">
        <InputText id="billToClientName" type="text" v-model="value" />
        <label for="billToClientName">Client's Name</label>
      </span>

      <span class="p-float-label mb-5 fullWidth__input">
        <InputText id="billToClientEmail" type="text" v-model="value" />
        <label for="billToClientEmail">Client's Email</label>
      </span>

      <span class="p-float-label mb-5 fullWidth__input">
        <InputText id="billToStreetAddress" type="text" v-model="value" />
        <label for="billToStreetAddress">Street Address</label>
      </span>

      <div class="flex justify-content-between mb-5">
        <span class="p-float-label">
          <InputText id="billToCity" type="text" v-model="value" />
          <label for="billToCity">City</label>
        </span>

        <span class="p-float-label">
          <InputText id="billToPostCode " type="text" v-model="value" />
          <label for="billToPostCode  ">Post Code</label>
        </span>

        <span class="p-float-label">
          <InputText id="billToCountry" type="text" v-model="value" />
          <label for="billToCountry">Country</label>
        </span>
      </div>

      <div class="flex justify-content-between mb-5 dateTerm__wrapper">
        <Calendar v-model="value"></Calendar>
        <Dropdown v-model="selectedTerm" :options="terms" optionLabel="name"></Dropdown>
      </div>

      <div class="flex justify-content-between mb-5 invoiceDescription__wrapper">
        <Textarea v-model="value" rows="5" cols="100" />
      </div>

      <div class="flex justify-content-end">
        <Button label="Cancel" class="p-button-rounded p-button-secondary mr-3" />
        <Button label="Save Changes" class="p-button-rounded" />
      </div>
    </div>
  </Sidebar>
</template>

<style>
.dateTerm__wrapper > .p-inputwrapper {
  flex: 1;
}

.p-float-label {
  display: flex;
}

.fullWidth__input > input {
  flex: 1;
}

.invoice__header_font {
  font-family: "Raleway-Bold";
}

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

th.numericColumn > .p-column-header-content {
  justify-content: flex-end;
}
</style>

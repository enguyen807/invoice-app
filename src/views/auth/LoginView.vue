<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/store";

import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const username = ref();
const password = ref();

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore();
  const { username, password } = values;

  return authStore
    .login(username, password)
    .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
  <div class="flex justify-content-center loginView">
    <Card style="width: 40rem; margin-top: 2em; margin-bottom: 2em">
      <template #content>
        <div class="flex" style="height: 80vh">
          <div
            style="
              min-width: 50%;
              min-height: 100px;
              background: url('media/illustrations/dozzy-1/loginview.svg') center
                center/cover no-repeat;
              background-size: cover;
            "
          ></div>
          <div class="p-5 flex-grow-1 border-round-right">
            <div class="text-4xl mb-3">Company</div>
            <div class="text-sm">
              Need an account?
              <router-link to="/" class="text-primary">Sign up now!</router-link>
            </div>

            <Message :closable="false">
              <div><strong>username:</strong> <span>test</span></div>
              <div><strong>password:</strong> <span>test</span></div>
            </Message>

            <div class="text-center mt-5">
              <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors, isSubmitting }"
              >
                <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
                  {{ errors.apiError }}
                </div>
                <div class="mb-5 text-left">
                  <span class="p-float-label">
                    <Field v-slot="{ field }" v-model="username" name="username">
                      <InputText
                        id="username"
                        autocomplete="username"
                        type="text"
                        class="w-full"
                        :class="{ 'p-invalid': errors.username }"
                        v-bind="field"
                        v-model="username"
                        aria-describedby="username2-help"
                      />
                    </Field>

                    <label for="username">Username</label>
                  </span>
                  <small v-if="errors.username" id="username2-help" class="p-error">{{
                    errors.username
                  }}</small>
                </div>

                <div class="mb-5 text-left">
                  <span class="p-float-label">
                    <Field v-slot="{ field }" v-model="password" name="password">
                      <Password
                        autocomplete="current-password"
                        :feedback="false"
                        class="w-full"
                        v-bind="field"
                        v-model="password"
                        :class="{ 'p-invalid': errors.password }"
                        aria-describedby="password-help"
                      />
                    </Field>

                    <!-- <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer="sp">
                    {{ sp.level }}
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template> -->

                    <label for="password">Password</label>
                  </span>
                  <small v-if="errors.password" id="password-help" class="p-error">{{
                    errors.password
                  }}</small>
                </div>

                <Button type="submit" label="Sign In" class="w-full mb-5" />
              </Form>

              <router-link to="/" class="text-primary">Forgot Password?</router-link>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.loginView .p-card {
  background: transparent !important;
}

.loginView .p-card-body {
  border-radius: 56px;
  padding: 0.3rem !important;
  background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);
}

.loginView .p-card-content {
  border-radius: 53px;
  padding: 0 !important;
  background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
}

.loginView .p-password-input {
  width: 100%;
}
</style>

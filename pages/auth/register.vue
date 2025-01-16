<template>
  <div class="h-full flex items-center justify-center flex-col px-5 pb-5 md:(px-0 pb-0)">
    <div class="w-104 max-w-full text-white space-y-10">
      <div>
        <p class="text-primary block text-left w-full text-subtitle md:text-title mb-2">享樂酒店，誠摯歡迎</p>
        <h2 class="text-white block text-left w-full text-h3 md:text-h1 mb-4">立即註冊</h2>
        <LuxurySteps class="py-4" :steps="steps" :step="step" />
      </div>
      <form id="register-from" class="space-y-4" @submit.prevent>
        <template v-if="step === 1">
          <LuxuryInput :show-feedback="false" label="電子信箱" placeholder="請輸入電子信箱" />
          <LuxuryInput :show-feedback="false" type="password" label="密碼" placeholder="請輸入密碼"></LuxuryInput>
          <LuxuryInput :show-feedback="false" type="password" label="確認密碼" placeholder="請再輸入一次密碼"></LuxuryInput>
        </template>
        <template v-if="step === 2">
          <UserBasicInfo></UserBasicInfo>
          <LuxuryCheckbox>
            我已閱讀並同意本網站個資使用規範
          </LuxuryCheckbox>
        </template>
      </form>
      <div>
        <LuxuryButton class="mb-4" block form="register-from-1">
          <template v-if="step === 1">
            下一步
          </template>
          <template v-if="step === 2">
            完成註冊
          </template>
        </LuxuryButton>
        <p>已經有會員了嗎？
          <NuxtLink class=":uno: text-primary text-sm md:text-base underline-primary underline underline-offset-1" :to="{ path: '/auth/login' }">立即登入</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LuxuryButton, LuxuryInput, LuxurySteps, LuxuryCheckbox } from '@enjoyment-luxury-hotel/shared/components';

definePageMeta({
  name: 'ClientAuthRegister',
  layout: 'auth-layout',
});

defineOptions({
  name: 'ClientAuthRegister',
});

const step = ref(1)

const steps = [
  {
    title: '輸入信箱及密碼'
  },
  {
    title: '填寫基本資料'
  }
]
</script>

<style scoped>

</style>

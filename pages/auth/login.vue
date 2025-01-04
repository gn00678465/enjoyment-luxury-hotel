<template>
  <div class="h-full flex items-center justify-center flex-col px-5 pb-5 md:(px-0 pb-0)">
    <div class="w-104 max-w-full space-y-10">
      <div>
        <p class="text-primary block text-left w-full text-subtitle md:text-title mb-2">享樂酒店，誠摯歡迎</p>
        <h2 class="text-white block text-left w-full text-h3 md:text-h1">立即開始旅程</h2>
      </div>
      <form id="login-form" class="space-y-4" @submit.prevent>
        <LuxuryInput label="電子信箱" :showFeedback="false" placeholder="請輸入電子信箱"></LuxuryInput>
        <LuxuryInput label="密碼" type="password" :showFeedback="false" placeholder="請輸入密碼"></LuxuryInput>
        <div class="flex items-center justify-between">
          <LuxuryCheckbox>記住帳號</LuxuryCheckbox>
          <NuxtLink class=":uno: text-primary text-sm md:text-base underline-primary underline underline-offset-1" :to="{ path: '/auth/register' }">忘記密碼</NuxtLink>
        </div>
      </form>
      <LuxuryButton block attrType="submit" form="login-form">會員登入</LuxuryButton>
      <p class="text-white text-body2 md:text-body">沒有會員嗎？
        <NuxtLink class=":uno: text-primary text-sm md:text-base underline-primary underline underline-offset-1" :to="{ path: '/auth/register' }">前往註冊</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LuxuryButton, LuxuryInput, LuxuryCheckbox } from '@enjoyment-luxury-hotel/shared/components';

definePageMeta({
  name: 'ClientAuthLogin',
  layout: 'auth-layout',
});

defineOptions({
  name: 'ClientAuthLogin',
});

useSeoMeta({
  title: '登入|享樂酒店',
})

</script>

<style scoped>

</style>

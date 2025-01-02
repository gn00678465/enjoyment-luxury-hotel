<template>
  <div class="h-full flex items-center justify-center mx-5 md:mx-0 flex-col">
    <div class="w-104 max-w-full">
      <p class="text-primary block text-left w-full">享樂酒店，誠摯歡迎</p>
      <h2 class="text-white block text-left w-full">立即開始旅程</h2>
      <form @submit.prevent>
        <LuxuryInput label="電子信箱"></LuxuryInput>
        <LuxuryInput label="密碼" type="password"></LuxuryInput>
        <div class="flex items-center justify-between">
          <LuxuryCheckbox>記住帳號</LuxuryCheckbox>
          <LuxuryButton text :themeOverrides="{ padding: '0px' }">忘記密碼</LuxuryButton>
        </div>
        <LuxuryButton block attrType="submit">會員登入</LuxuryButton>
      </form>
      <p class="text-white">沒有會員嗎？<NuxtLink class="text-primary" :to="{ name: 'ClientAuthRegister' }">前往註冊</NuxtLink></p>
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

<template>
  <NuxtLayout name="user-layout">
    <template #left>
      <div class="p-6 bg-white rounded-5 space-y-6 md:(p-10 space-y-10)">
        <h6 class="text-h6 md:text-h5 font-700">修改帳號資料</h6>
        <form class="space-y-6">
          <LuxuryLabel label="電子信箱" :label-class="clsx('text-neutral-80 mb-2', [!isPasswdEdit && 'text-body2! md:text-body!'])">
            <p class="text-subtitle md:text-title">Jessica@exsample.com</p>
          </LuxuryLabel>
          <div v-if="!isPasswdEdit" class="flex items-center">
            <LuxuryLabel label="密碼" :label-class="clsx('text-neutral-80 mb-2', [!isPasswdEdit && 'text-body2! md:text-body!'])">
              <p class="text-subtitle md:text-title">**********</p>
            </LuxuryLabel>
            <LuxuryButton type="primary" text :theme-overrides="{ padding: '0px' }" @click="isPasswdEdit = !isPasswdEdit">重設</LuxuryButton>
          </div>
          <template v-else>
            <div>
              <LuxuryLabel label="舊密碼" :label-class="clsx('text-neutral-100')">
                <LuxuryInput placeholder="請輸入舊密碼"></LuxuryInput>
              </LuxuryLabel>
              <LuxuryLabel label="新密碼" :label-class="clsx('text-neutral-100')">
                <LuxuryInput placeholder="請輸入新密碼"></LuxuryInput>
              </LuxuryLabel>
              <LuxuryLabel label="確認新密碼" :label-class="clsx('text-neutral-100')">
                <LuxuryInput placeholder="請再輸入一次新密碼"></LuxuryInput>
              </LuxuryLabel>
            </div>
            <LuxuryButton :block="viewport.isLessOrEquals('md') ? true : false" :disabled="true">儲存設定</LuxuryButton>
          </template>
        </form>
      </div>
    </template>
    <template #right>
      <div class="p-6 bg-white rounded-5 space-y-6 md:(p-10 space-y-10)">
        <h6 class="text-h6 md:text-h5 font-700">基本資料</h6>
        <form class="space-y-6">
          <UserBasicInfo :editable="isBasicEdit" :label-class="clsx([isBasicEdit && 'text-neutral-100'], [!isBasicEdit && 'text-body2! md:text-body! text-neutral-80'])"></UserBasicInfo>
        </form>
        <template v-if="!isBasicEdit">
          <LuxuryButton type="secondary" @click="isBasicEdit = !isBasicEdit">編輯</LuxuryButton>
        </template>
        <template v-else>
          <LuxuryButton :block="viewport.isLessOrEquals('md') ? true : false" :disabled="true">儲存設定</LuxuryButton>
        </template>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { LuxuryButton, LuxuryLabel, LuxuryInput } from '@enjoyment-luxury-hotel/shared/components'
import clsx from 'clsx'
import { parseISO } from 'date-fns'
// import { toTypedSchema } from '@vee-validate/zod';
// import * as zod from 'zod';
// import { editMachine } from '~/machines/edit-machine'
// import { useMachine } from '@xstate/vue'
// import type { AuthResponse } from '~/types'
import { formatRFC3339 } from "date-fns"

defineOptions({
  name: 'UserProfile'
})

definePageMeta({
  layout: false,
  name: 'user-profile',
  meta: {
    title: '個人資料'
  },
  props: true,
  headerFade: false,
})

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
const { userId } = toRefs(props)
const viewport = useViewport()

const isBasicEdit = ref(false)
const isPasswdEdit = ref(false)
</script>

<style scoped>

</style>
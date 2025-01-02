<template>
  <div>
    <LuxuryButton>123456</LuxuryButton>
  </div>
</template>

<script setup lang="ts">
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components';

definePageMeta({
  layout: 'auth-layout',
});

defineOptions({
  name: 'ClientAuthLogin',
});
</script>

<style scoped>

</style>

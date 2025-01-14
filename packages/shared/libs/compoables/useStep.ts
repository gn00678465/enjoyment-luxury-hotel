import { ref, computed } from 'vue'

interface StepOptions {
  initialStep?: number
  minStep?: number
  maxStep?: number
  validateStep?: (step: number) => boolean
  onStepChange?: (newStep: number, oldStep: number) => void
}

export function useStep(options: StepOptions = {}) {
  const {
    initialStep = 1,
    minStep = 1,
    maxStep = Infinity,
    validateStep,
    onStepChange,
  } = options

  const currentStep = ref(initialStep)
  
  // 計算目前是否為第一步
  const isFirstStep = computed(() => currentStep.value <= minStep)
  
  // 計算目前是否為最後一步
  const isLastStep = computed(() => currentStep.value >= maxStep)
  
  // 計算是否可以前進
  const canNext = computed(() => !isLastStep.value)
  
  // 計算是否可以後退
  const canPrevious = computed(() => !isFirstStep.value)

  // 設置特定步驟
  const setStep = (step: number): boolean => {
    // 檢查是否在允許範圍內
    if (step < minStep || step > maxStep) {
      return false
    }

    // 如果有自訂驗證函數，執行驗證
    if (validateStep && !validateStep(step)) {
      return false
    }

    const oldStep = currentStep.value
    currentStep.value = step
    
    // 觸發步驟變更回調
    onStepChange?.(step, oldStep)
    
    return true
  }

  // 前進一步
  const nextStep = (): boolean => {
    if (canNext.value) {
      return setStep(currentStep.value + 1)
    }
    return false
  }

  // 後退一步
  const previousStep = (): boolean => {
    if (canPrevious.value) {
      return setStep(currentStep.value - 1)
    }
    return false
  }

  // 重置到初始步驟
  const reset = (): boolean => {
    return setStep(initialStep)
  }

  // 跳到第一步
  const goFirst = (): boolean => {
    return setStep(minStep)
  }

  // 跳到最後一步
  const goLast = (): boolean => {
    return setStep(maxStep)
  }

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    canNext,
    canPrevious,
    setStep,
    nextStep,
    previousStep,
    reset,
    goFirst,
    goLast
  }
}
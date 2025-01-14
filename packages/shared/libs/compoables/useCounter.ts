import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'

interface CounterOptions {
  initial?: number
  min?: number
  max?: number
  step?: number
  validateCount?: (count: number) => boolean
  onChange?: (newValue: number, oldValue: number) => void
  formatter?: (value: number) => string | number
}

export function useCounter(options: CounterOptions = {}) {
  const {
    initial = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
    validateCount,
    onChange,
    formatter = (value) => value
  } = options

  const count = ref(initial)

  // 格式化後的值
  const formattedValue = computed(() => formatter(count.value))
  
  // 計算是否可以增加
  const canIncrement: ComputedRef<boolean> = computed(() => {
    const nextValue = count.value + step
    return nextValue <= max && (!validateCount || validateCount(nextValue))
  })
  
  // 計算是否可以減少
  const canDecrement: ComputedRef<boolean> = computed(() => {
    const nextValue = count.value - step
    return nextValue >= min && (!validateCount || validateCount(nextValue))
  })

  // 更新值的核心函數
  const updateCount = (newValue: number): boolean => {
    // 檢查是否在允許範圍內
    if (newValue < min || newValue > max) {
      return false
    }

    // 如果有自訂驗證函數，執行驗證
    if (validateCount && !validateCount(newValue)) {
      return false
    }

    const oldValue = count.value
    count.value = newValue
    
    // 觸發變更回調
    onChange?.(newValue, oldValue)
    
    return true
  }

  // 增加指定數量
  const increment = (): boolean => {
    if (canIncrement.value) {
      return updateCount(count.value + step)
    }
    return false
  }

  // 減少指定數量
  const decrement = (): boolean => {
    if (canDecrement.value) {
      return updateCount(count.value - step)
    }
    return false
  }

  // 直接設置值
  const setValue = (value: number): boolean => {
    return updateCount(value)
  }

  // 重置到初始值
  const reset = (): boolean => {
    return updateCount(initial)
  }

  // 設置為最大值
  const setToMax = (): boolean => {
    return updateCount(max)
  }

  // 設置為最小值
  const setToMin = (): boolean => {
    return updateCount(min)
  }

  return {
    count,
    formattedValue,
    canIncrement,
    canDecrement,
    increment,
    decrement,
    setValue,
    reset,
    setToMax,
    setToMin,
  }
}
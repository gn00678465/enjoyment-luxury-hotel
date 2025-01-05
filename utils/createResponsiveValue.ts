/**
 * 可接受的值的類型
 */
type InputValue = string | number;

/**
 * 響應式值的處理結果
 */
type ResponsiveValue<Breakpoint extends string> = Map<'default' | Breakpoint, string>;

/**
 * 值轉換器函數的類型定義
 */
type ValueTransformer = (value: InputValue) => string;



/**
 * 創建響應式值的主函數
 * @param value - 輸入值（數字、字串或響應式字串）
 * @param options - 配置選項，包含斷點數組和可選的轉換器
 * @returns 包含所有斷點值的 Map
 */
export const createResponsiveValue = <Breakpoint extends string>(
  value: InputValue,
  breakpoints: Breakpoint[],
  transformer: ValueTransformer = (v) => `${v}`
): ResponsiveValue<Breakpoint> => {
  const resultMap = new Map<'default' | Breakpoint, string>();

  // 處理特殊值 'auto'
  if (value === 'auto') {
    resultMap.set('default', 'auto');
    breakpoints.forEach(breakpoint => {
      resultMap.set(breakpoint, 'auto');
    });
    return resultMap;
  }
  
  // 處理數字輸入
  if (typeof value === 'number') {
    const transformedValue = transformer(value);
    resultMap.set('default', transformedValue);
    breakpoints.forEach(breakpoint => {
      resultMap.set(breakpoint, transformedValue);
    });
    return resultMap;
  }

  // 處理非響應式字串
  if (typeof value === 'string' && !value.includes(':')) {
    const transformedValue = transformer(value);
    resultMap.set('default', transformedValue);
    breakpoints.forEach(breakpoint => {
      resultMap.set(breakpoint, transformedValue);
    });
    return resultMap;
  }

  // 處理響應式字串
  if (typeof value === 'string' && value.includes(':')) {
    const parts = value.split(' ');
    
    // 設置預設值
    const defaultValue = transformer(parts[0]);
    resultMap.set('default', defaultValue);

    // 創建斷點值的映射
    const breakpointValues = new Map<'default' | Breakpoint, string>();
    parts.forEach(part => {
      if (part.includes(':')) {
        const [breakpoint, val] = part.split(':') as ['default' | Breakpoint, string];
        breakpointValues.set(breakpoint, transformer(val));
      }
    });

    // 設置所有斷點的值
    breakpoints.forEach(breakpoint => {
      const breakpointIndex = breakpoints.indexOf(breakpoint);
      let currentValue = defaultValue;

      breakpointValues.forEach((bpValue, bpKey) => {
        const definedBreakpointIndex = breakpoints.indexOf(bpKey as Breakpoint);
        if (definedBreakpointIndex !== -1 && definedBreakpointIndex <= breakpointIndex) {
          currentValue = bpValue;
        }
      });

      resultMap.set(breakpoint, currentValue);
    });

    return resultMap;
  }

  // 處理其他情況
  const transformedValue = transformer(value);
  resultMap.set('default', transformedValue);
  breakpoints.forEach(breakpoint => {
    resultMap.set(breakpoint, transformedValue);
  });
  return resultMap;
};

// 導出類型和函數
export type { 
  InputValue,
  ResponsiveValue,
  ValueTransformer,
};
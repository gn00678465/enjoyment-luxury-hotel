/**
 * 處理尺寸值並返回包含所有斷點值的 Map
 */
export const processSize = <breakpoint extends string>(size: number|string, breakpoints: breakpoint[] = []) => {
  const resultMap = new Map<'default' | breakpoint, string>();
  
  // 處理數字輸入
  if (typeof size === 'number') {
    const pixelValue = `${size}px`;
    resultMap.set('default', pixelValue);
    breakpoints.forEach(breakpoint => {
      resultMap.set(breakpoint, pixelValue);
    });
    return resultMap;
  }

  // 處理單純的 px 字串或 'auto'
  if (isSize(size) && !size.includes(':')) {
    const value = size;
    resultMap.set('default', value);
    breakpoints.forEach(breakpoint => {
      resultMap.set(breakpoint, value);
    });
    return resultMap;
  }

  // 處理響應式尺寸 (例如: "466px md:800px")
  if (typeof size === 'string' && size.includes(':')) {
    const parts = size.split(' ');
    
    // 設置預設值（第一個值）
    let defaultValue = parts[0];
    if (!isSize(defaultValue)) {
      defaultValue += 'px';
    }

    // 創建斷點值的映射
    const breakpointValues = new Map();
    parts.forEach(part => {
      if (part.includes(':')) {
        const [breakpoint, value] = part.split(':');
        breakpointValues.set(
          breakpoint, 
          isSize(value) ? value : `${value}px`
        );
      }
    });

    // 設置 default 和所有斷點的值
    resultMap.set('default', defaultValue);
    breakpoints.forEach(breakpoint => {
      // 找到第一個大於或等於當前斷點的值
      const breakpointIndex = breakpoints.indexOf(breakpoint);
      let value = defaultValue;

      // 遍歷所有已定義的斷點值
      breakpointValues.forEach((bpValue, bpKey) => {
        const definedBreakpointIndex = breakpoints.indexOf(bpKey);
        // 如果找到定義的斷點，且它的索引小於或等於當前斷點的索引
        if (definedBreakpointIndex !== -1 && definedBreakpointIndex <= breakpointIndex) {
          value = bpValue;
        }
      });

      resultMap.set(breakpoint, value);
    });

    return resultMap;
  }

  // 處理其他情況
  const defaultValue = size.endsWith('px') ? size : `${size}px`;
  resultMap.set('default', defaultValue);
  breakpoints.forEach(breakpoint => {
    resultMap.set(breakpoint, defaultValue);
  });
  return resultMap;
};

function isSize(size: string) {
  if (typeof size === 'string' && (size.endsWith('px'))) return true
  if (typeof size === 'string' && (size.endsWith('%'))) return true
  if (typeof size === 'string' && (size.endsWith('rem'))) return true
  if (typeof size === 'string' && (size.endsWith('vh'))) return true
  if (typeof size === 'string' && (size.endsWith('vw'))) return true
  if (typeof size === 'string' && (size.endsWith('dvh'))) return true
  if (typeof size === 'string' && (size.endsWith('vw'))) return true
  if (typeof size === 'string' && size === 'auto') return true
  return false
}
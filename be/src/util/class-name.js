function isCorrectClassName(cls) {
  return (/\s*/).test(cls) 
}

export const hasClassName = (node, cls) => {
  if (!isCorrectClassName(cls)) {
    throw new Error('className should not contain space')
  }
  return Array.from(node.classList).some(classListItem => classListItem === cls)
}

export const addClassName = (node, cls) => {
  try {
    if (!isCorrectClassName(cls)) {
      throw new Error()
    }
    node.classList.add(cls)
  } catch (e) {
    throw new Error(`Try add className ${cls} on ${node} failed`)
  }
}

export const removeClassName = (node, cls) => {
  try {
    if (!isCorrectClassName(cls)) {
      throw new Error()
    }
    node.classList.remove(cls)
  } catch (e) {
    throw new Error(`Try remove className ${cls} on ${node} failed`)
  }
}

export const toggleClassName = (node, cls) => {
  if (hasClassName(node, cls)) {
    removeClassName(node, cls)
  } else {
    addClassName(node, cls)
  }
}

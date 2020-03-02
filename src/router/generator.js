export function handleRouter (subApp) {
  const { router, name } = subApp
  function next (list) {
    return list.map(item => {
      if (item.children) {
        let children = next(item.children)
        return { ...item, path: `${name}${item.path}`, children }
      }
      return { ...item, path: `${name}${item.path}` }
    })
  }
  return next(router)
}

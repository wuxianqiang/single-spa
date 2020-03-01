// import project1 from '../project1/main'
// import project2 from '../project2/main'

// import config from 'dir/config'

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



// export const subAppMapInfo = {
//   // project1: () => import('../project1/main'),
//   // project2: () => import('../project2/main')
// }

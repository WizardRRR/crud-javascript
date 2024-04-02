import { getItemLocalStorage, setItemLocalStorage } from "../localstorage.js"

export const getHistoryUserById = userId => {
  const historyUsers = getItemLocalStorage('user-activity-history')
  return historyUsers.find(user => user.id === userId)
}

export const getAllHistorysUsers = () => getItemLocalStorage('user-activity-history') ?? []

export const createHistoryUser = (type, user) => {
  const historyUsers = getAllHistorysUsers()
  historyUsers.push({
    id: historyUsers.length + 1,
    date: new Date(),
    type,
    user
  })
  setItemLocalStorage('user-activity-history', historyUsers)
  return historyUsers.slice(-1)[0]
}
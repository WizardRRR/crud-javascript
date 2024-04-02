import { $ } from './jquery.js'
import { getAllHistorysUsers } from './services/history-activity-users.js'

displayUI(getAllHistorysUsers().reverse())

function displayUI(historysUsers) {
  let templateHMTL = ''

  historysUsers.forEach(historyUser => {
    if (historyUser.type === 'CREATE') {
      templateHMTL += `
      <div class="badge-history create">
        <span>Historial n° ${historyUser.id}</span>
        <p>Has creado a el usuario n° ${historyUser.user.id} con nombre ${historyUser.user.name}</p>
      </div>
    `
    }
    if (historyUser.type === 'UPDATE') {
      templateHMTL += `
      <div class="badge-history update">
        <span>Historial n° ${historyUser.id}</span>
        <p>Has actualizasdo al usuario n° ${historyUser.user.id}</p>
      </div>
    `
    }
    if (historyUser.type === 'DELETE') {
      templateHMTL += `
      <div class="badge-history delete">
        <span>Historial n° ${historyUser.id}</span>
        <p>Has eliminado al usuario n° ${historyUser.user.id}</p>
      </div>
    `
    }
  })

  $('.wrapped-history').innerHTML = templateHMTL
}

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()

  const historyFiltered = getAllHistorysUsers().filter((historyUser) => {
    const currentDate = new Date(historyUser.date)
    const startDate = new Date($('#startDate').value)
    const endDate = new Date($('#endDate').value)
    return currentDate >= startDate && currentDate <= endDate
  })

  displayUI(historyFiltered)
})
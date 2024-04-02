export default function formatDateString(date) {
  const currentDate = new Date()

  const providedDate = new Date(date)

  const yesterdayDate = new Date(currentDate)
  yesterdayDate.setDate(currentDate.getDate() - 1)

  const hours = providedDate.getHours()
  const minutes = providedDate.getMinutes()
  const formattedHour = hours < 10 ? '0' + hours : hours
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

  if (providedDate.toDateString() === currentDate.toDateString()) {
    return `hoy a las ${formattedHour}:${formattedMinutes}`
  } else if (providedDate.toDateString() === yesterdayDate.toDateString()) {
    return `ayer a las ${formattedHour}:${formattedMinutes}`
  } else {
    const year = providedDate.getFullYear()
    const month = providedDate.getMonth()
    const day = providedDate.getDay()

    const formattedMonth = month < 10 ? '0' + month : month
    const formattedDay = day < 10 ? '0' + day : day

    return `${year}/${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinutes}`
  }
}

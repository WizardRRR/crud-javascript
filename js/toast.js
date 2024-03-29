import { $ } from './jquery.js'
const d = document

export const notifications = $('.notifications')

export const toastDetails = {
    timer: 4000,
    success: {
        icon: 'uil uil-check-circle',
        text: 'Éxito',
    },
    danger: {
        icon: 'uil uil-exclamation-octagon',
        text: 'Peligro',
    },
    warning: {
        icon: 'uil uil-exclamation-triangle',
        text: 'Advertencia',
    },
    info: {
        icon: 'uil uil-info-circle',
        text: 'Información',
    }
}

export const removeToast = (toast) => {
    console.log(toast)
    toast.classList.add('hide')//agregar animación salida
    if (toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 300)//eliminar toast despues de la animación
}

export const createToast = (type, message, duration = toastDetails.timer) => {
    const toast = d.createElement('li')
    toast.className = `toast ${type}`
    // Si no se proporciona un mensaje, utiliza el mensaje predeterminado
    const toastMessage = message || toastDetails[type].text
    toast.innerHTML = `
                    <div class='column'>
                        <i class='${toastDetails[type].icon}'></i>
                        <span>${toastMessage}</span>
                    </div>
                    <i class='uil uil-times'></i>`
    notifications.appendChild(toast)
    //obtener id del temporizador y llamar a la función removeToast
    toast.timeoutId = setTimeout(() => removeToast(toast), duration)
    // Asigna la duración a la animación de toast before (line)
    toast.style.setProperty('--animation-duration', duration + 'ms')
    // Maneja el evento de clic x  para eliminar el toast 
    toast.querySelector('.uil-times').addEventListener('click', () => {
        removeToast(toast)
    })
}
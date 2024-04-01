import { $ } from './jquery.js'
const d = document

export const notifications = $('.notifications')

export const toastDetails = {
    timer: 4000,
    success: {
        icon: 'assets/toast-icons/check-circle.svg',
        text: 'Éxito',
    },
    danger: {
        icon: 'assets/toast-icons/exclamation-octagon.svg',
        text: 'Peligro',
    },
    warning: {
        icon: 'assets/toast-icons/exclamation-triangle.svg',
        text: 'Advertencia',
    },
    info: {
        icon: 'assets/toast-icons/info-circle.svg',
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
                    <img src="${toastDetails[type].icon}">
                        <span>${toastMessage}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="times" class="times">
                    <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,
                    10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,
                    1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,
                    0,0,1.42,0,1,1,0,0,0,0-1.42Z">
                    </path></svg>`
    notifications.appendChild(toast)
    //obtener id del temporizador y llamar a la función removeToast
    toast.timeoutId = setTimeout(() => removeToast(toast), duration)
    // Asigna la duración a la animación de toast before (line)
    toast.style.setProperty('--animation-duration', duration + 'ms')
    // Maneja el evento de clic x  para eliminar el toast 
    toast.querySelector('.times').addEventListener('click', () => {
        removeToast(toast)
    })
}
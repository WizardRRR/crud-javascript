
export const notifications = document.querySelector(".notifications");
export const buttons = document.querySelectorAll(".buttons .btn");

export const toastDetails = {
    timer: 5000,
    success: {
        icon: 'uil uil-check-circle',
        text: 'Success: Mensaje de exito.',
    },
    danger: {
        icon: 'uil uil-exclamation-octagon',
        text: 'Danger: Mensaje de peligro.',
    },
    warning: {
        icon: 'uil uil-exclamation-triangle',
        text: 'Warning: Mensaje de advertencia.',
    },
    info: {
        icon: 'uil uil-info-circle',
        text: 'Info: Mensaje de información.',
    }
};

export const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // borrar tiempo de espera del toast
    setTimeout(() => toast.remove(), 500); 
};

export const createToast = (id) => {
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;
    toast.innerHTML = `<div class="column">
                        <i class=" ${icon}"></i>
                        <span>${text}</span>
                    </div>
                    <i class="uil uil-times"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
    
    // Manejar el evento de clic para eliminar el toast
    toast.querySelector(".uil-times").addEventListener("click", () => {
        removeToast(toast);
    });
};

// Agrego un evento de clic a cada botón para crear un toast cuando se haga clic (por el momento)
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});

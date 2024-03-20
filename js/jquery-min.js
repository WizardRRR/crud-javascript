/**
 * Seleccion un único elemento HTML del DOM utilizando
 * un selector CSS dentro del contexto especificado.
 * 
 * @param {string} selector
 * @param {Document | Element} [context]
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector)

/**
 * Selecciona todos los elementos HTML que coincidan con
 * el selector CSS dentro del contexto especificado.
 * 
 * @param {string} querySelector
 * @param {Document|Element} [context]
 */
export const $$ = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector))
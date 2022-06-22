export const $id = (idx: string) => document.getElementById(idx)

export const $query = (classes: string): HTMLElement => document.querySelector(classes)

export const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

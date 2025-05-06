import { MdMenu } from '@material/web/menu/menu.js';
import { MdMenuItem } from '@material/web/menu/menu-item.js';

// MARK: Types
// ------------------------------------------------
type MdTagNameMap = {
  [Key in keyof HTMLElementTagNameMap as Key extends `md-${string}` ? Key : never]: HTMLElementTagNameMap[Key];
};

type MdComp = MdTagNameMap[keyof MdTagNameMap];

type SlotElement = HTMLOrSVGElement | MdMenu | MdMenuItem;

export type ComponentSettings = {
  select?: {
    noAsterisk?: boolean;
    variant?: 'outlined' | 'filled';
  };
  textField?: {
    noAsterisk?: boolean;
    variant?: 'outlined' | 'filled';
    noSpinner?: boolean;
  };
};

// MARK: Helpers
// ------------------------------------------------
/**
 * Validates that the child is a valid slot element.
 * @param child The child to validate.
 * @returns Whether or not the child is a valid slot element.
 */
function validateChild(child: unknown): child is SlotElement {
  if (child instanceof HTMLElement) return true;
  if (child instanceof SVGElement) return true;
  if (child instanceof MdMenu) return true;
  if (child instanceof MdMenuItem) return true;

  return false;
}

// MARK: Library
// ------------------------------------------------
/**
 * Sets the slot attribute on all child elements of a component.
 * This is because slots are not supported by Svelte.
 * The work around takes the `data-slot` attribute and sets the slot attribute on the child element.
 * @param component The component to set the slots on.
 */
export function setSlots(component: MdComp | undefined) {
  if (!component) return;

  for (const child of component.children) {
    if (validateChild(child) === false) continue;
    if (child.dataset.slot === undefined) continue;
    child.slot = child.dataset.slot;
    delete child.dataset.slot;
  }
}

/**
 * Group sequential function calls into one delayed call.
 * - 1111111110 Input
 * - 0000000001 Output
 * @param callback The function to debounce.
 * @param delay The time, in milliseconds the function should wait.
 */
export const debounce = <T extends any[]>(fx: (...args: T) => any, delay: number) => {
  let timeout: number;

  return (...args: T) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fx(...args);
    }, delay);
  };
};

/**
 * Rounds a number to a specified increment.
 * @param num The value to round.
 * @param inc The increment to round to.
 */
export function round(num: number, inc = 1) {
  if (inc === 0) return num;
  const dec = `${inc}`.split('.')[1]?.length || 0;
  const value = Math.round((num + Number.EPSILON) / inc) * inc;
  return Number(`${Math.round(Number(value + 'e' + dec))}e-${dec}`);
}

import { passwordReg } from './regex';

export const isValidPassword = (value) => passwordReg.test(value);

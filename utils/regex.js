export const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneReg = /^[+]*[0-9]{6,15}$/;
export const PNReg = /^[0-9]{11,11}$/;
export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const linkReg = /^https?:\/\//;

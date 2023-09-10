import parseJwt from '@/utils/parseJWT';

export function User(token) {
  const parsed = parseJwt(token);
  this.fullName = parsed.given_name || '';
  this.username = parsed.username;
  this.id = parsed.unique_name;
  this.nameid = parsed.nameid;
  this.hasPassword = parsed.phash === 'true';
  this.idNumber = parsed.id_number;
  this.isJuridical = parsed.ctype === 'jur';
}

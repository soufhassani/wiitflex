type SetCookie = {
  name: string;
  value: string;
  days: number;
};
type SetLocalStorage = {
  key: string;
  value: string;
};
export function setCookie({ name, value, days }: SetCookie) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value ? value : "") + expires + "; path=/";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function eraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setStorage({ key, value }: SetLocalStorage) {
  localStorage.setItem(key, value);
}

export function getStorage(name: string) {
  const item = localStorage.getItem(name);
  if (item) {
    const value = JSON.parse(item);
    return value;
  }
  return null;
}
export function eraseStorage(name: string) {
  localStorage.removeItem(name);
}

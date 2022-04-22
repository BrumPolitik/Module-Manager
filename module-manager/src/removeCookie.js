import Cookies from "universal-cookie";
const cookies = new Cookies();

export function removeCookie(cookieName) {
    try {
        cookies.remove(cookieName, { path: '/' });
    } catch (err) {

    }
}


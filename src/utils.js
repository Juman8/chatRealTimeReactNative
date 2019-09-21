import firebase from 'firebase';
let navigation = null;
let toast = null
const utils = {
    setNavigation: (_navigation) => {
        navigation = _navigation;
    },
    getNavigation: () => {
        return navigation
    },
    setToast: (_toast) => {
        toast = _toast
    },
    showToast: (titel, duration = 1000) => {
        toast.show(titel, duration);
    },
    onLogin: async (user, success_callback, failed_callback) => {
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }
}

export default utils
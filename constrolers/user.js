import extend from '../utils/context.js';
//import user from '../models/index.js';
import models from '../models/index.js';

export default {
    get: {
        login(context) {
            extend(context)
                .then(function() {
                    this.partial('../views/user/login.hbs');
                });
        },

        register(context) {
            extend(context)
                .then(function() {
                    this.partial('../views/user/register.hbs');
                });
        },

        logout(context) {
            models.user.logout(context)
                .then((responce) => {
                    context.redirect('#/login');
                })
        }
    },

    post: {
        login(context) {
            const {username, password} = context.params;

            models.user.login(username, password)
                .then((responce) => {
                    // context.user = responce;
                    // context.username = responce.user.email;
                    // context.isLoggedIn = true;
                    context.redirect('#/home');
                })
                .catch((e) => console.error(e))
        },
        register(context) {
            const {username, password, rePassword} = context.params;
            
            if(password === rePassword){
                models.user.register(username, password)
                    .then((responce) => {
                        context.redirect('#/login');
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
}
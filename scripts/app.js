import controlers from '../constrolers/index.js';


const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controlers.home.get.home);

    //User
    //Load login form
    this.get('#/login', controlers.user.get.login);
    //Load register form
    this.get('#/register', controlers.user.get.register);
    //Register: Sign up new users
    this.post('#/register', controlers.user.post.register);
    //Login: sign in existing users
    this.post('#/login', controlers.user.post.login);
    //Logout
    this.get('#/logout', controlers.user.get.logout);

    //Articles
    //Load create form
    this.get('#/create', controlers.articles.get.create);
    //Create article in database
    this.post('#/create', controlers.articles.post.create);
    //Load details
    this.get('#/details/:articleId', controlers.articles.get.details);
    //Delete article
    this.get('#/delete/:articleId', controlers.articles.del.delete);
    //Back from article details
    this.get('#/back', controlers.articles.get.back);
    //Edit article
    this.get('#/edit/:articleId', controlers.articles.get.edit);
    this.post('#/edit/:articleId', controlers.articles.put.edit);
});


(() => {

    app.run('#/login');
})();
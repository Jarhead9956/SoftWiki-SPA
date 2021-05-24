import  extend  from '../utils/context.js';
import models from '../models/index.js';
import docModifire from '../utils/doc-modifire.js';

export default {
    get: {
        create(context) {
            extend(context)
                .then(function() {
                    this.partial('./views/articles/create.hbs');
                })
        },
        details(context) {
            const { articleId } = context.params;
        
            models.articles.get(articleId).then((responce) => {
                const article = docModifire(responce);
                
                Object.keys(article).forEach((key) => {
                    context[key] = article[key];
                })
                
                context.canEdit = context.uid === localStorage.getItem('userId');
                extend(context)
                .then(function() {
                    this.partial('./views/articles/details.hbs')
                })
            })
        },
        back(context) {
            extend(context).then(function() {
                context.redirect('#/home');
            })
        },
        edit(context) {
            const { articleId } = context.params;
            
            models.articles.get(articleId).then((responce) => {
                const article = docModifire(responce);
                Object.keys(article).forEach((key) => {
                    context[key] = article[key];
                })
                extend(context)
                .then(function() {
                    this.partial('./views/articles/edit.hbs')
                })
            })
        }
    },

    post: {
        create(context) {
            const data = {
                ...context.params,
                uid: localStorage.getItem('userId')
            };
  
            if(data.category === 'JavaScript'){
                data.JavaScript = true;
            }else if(data.category === 'C#'){
                data.cSharp = true;
            }else if(data.category === 'Java'){
                data.Java = true;
            }else if(data.category === 'Pyton'){
                data.Pyton = true;
            }
            console.log(data)
             models.articles.create(data)
                .then((responce) => {
                    context.redirect('#/home')
                })
                .catch((e) => console.error(e));
        }
    },

    del: {
        delete(context) {
            const { articleId } = context.params;
            
            models.articles.delete(articleId).then((responce) => {
                context.redirect('#/home');
            })
        }
    },

    put: {
        edit(context) {
            const { articleId, category, content, title} = context.params;

            models.articles.get(articleId).then((responce) => {
                const article = docModifire(responce);
                article.category = category;
                article.content = content;
                article.title = title;
                
                if(article.category === 'JavaScript'){
                    article.JavaScript = true;
                    article.cSharp = false;
                    article.Java = false;
                    article.Pyton = false
                }else if(article.category === 'C#'){
                    article.cSharp = true;
                    article.JavaScript = false;
                    article.Java = false;
                    article.Pyton = false;
                }else if(article.category === 'Java'){
                    article.Java = true;
                    article.cSharp = false;
                    article.JavaScript = false;
                    article.Pyton = false;
                }else if(article.category === 'Pyton'){
                    article.Pyton = true;
                    article.cSharp = false;
                    article.JavaScript = false;
                    article.Java = false;
                }

                return models.articles.edit(articleId, article)
                
                
                .then(function() {
                    context.redirect('#/home')
                })
            })
        }
    }
}
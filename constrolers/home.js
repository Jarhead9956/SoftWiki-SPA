import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifire from '../utils/doc-modifire.js';

export default {
    get: {
        home(context) {
            models.articles.getAll().then((response) => {
                
                const articles = response.docs.map(docModifire);
                context.articles = articles
                
                if(context.articles.length === 0){
                    context.test = true
                }
                
                
                extend(context)
                .then(function(){
                    this.partial('../views/home/home.hbs');
                });
            })
        }
    }
}
const db = firebase.firestore()

export default {
    create(data) {
        return db.collection('articles').add(data);
    },

    getAll() {
        return db.collection('articles').get();
    },
    get(id) {
        return db.collection('articles').doc(id).get();
    },
    delete(id) {
        return db.collection('articles').doc(id).delete();
    },
    edit(id, data) {
        return db.collection('articles').doc(id).update(data);
    }
}
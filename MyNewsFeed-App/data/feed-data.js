const { Category } = require('../models/category-model');
const { Feed } = require('../models/feed-model');
const { Article } = require('../models/article-model');
const ObjectId = require('./database-connection.js').ObjectID;

class FeedData {
    constructor(db) {
        this.db = db;
    }

    addNewCategory(name) {
        const category = new Category(name).toObject();
        return this.db.collection('categories')
                .insertOne({ category })
                .then((result) => {
                    return result;
                })
                .catch((err) => console.log(err));
    }

    addNewCategory(name) {
        const category = new Category(name).toObject();
        return this.db.collection('categories')
                .insertOne({ category })
                .then((result) => {
                    return result;
                })
                .catch((err) => console.log(err));
    }

    findCategoryByName(name) {
    return this.db.collection('categories')
            .findOne({ name })
            .then((category) => {
                    return category;
                })
            .catch((err) => console.log(err));
    }

    getAllCategories() {
   return this.db.collection('categories')
            .find({})
            .toArray()
            .then((categories) => {
                return categories;
            })
            .catch((err) => console.log(err));
    }

    addNewFeed(catName, catId, title, url, image, description) {
        const feed = new Feed(title, url, image, description).toObject();
        catId = catId.toString();
            return Promise.all([
                this.db
                .collection('categories')
                .updateOne({ name: catName }, { $push: { feeds: feed } }),
                this.db
                .collection('feeds')
                .insertOne({ catId, catName, feedId: feed.id, feedurl: feed.url,
                    name: feed.title, articles: [] }),
            ])
            .then((result) => {
                return result;
            })
            .catch((err) => console.log('Error ' + err));
    }

    findFeedByName(name) {
            return this.db
            .collection('feeds')
            .findOne({ name })
            .then((feed) => {
                return feed;
            })
            .catch((err) => console.log(err));
    }

    addNewArticles(feedname, feeds) {
        const articles = feeds.map((feed) => {
            if (!feed['content:encoded']) {
                return new Article(feed.title, feed.pubDate, feed.link,
                    feed.image.url, feed.summary, feed.description)
                    .toObject();
            }
            return new Article(feed.title, feed.pubDate, feed.link,
                feed.image.url, feed.summary, feed['content:encoded']['#'])
                .toObject();
        });

        return this.db
                .collection('feeds')
                .updateOne({ name: feedname }, { $set: { articles: [] } })
                .then(
                    this.   db
                    .collection('feeds')
                    .updateOne({ name: feedname },
                        { $pushAll: { articles: articles } } )
                )
                .then(console.log('Feeds updated'))
                .catch((err) => console.log(err));
    }

    findArticleById(feedname, id) {
        return this.db
            .collection('feeds')
            .findOne({ name: feedname }, { articles: { $elemMatch: { id } } } )
            .then((article) => {
                return article.articles[0];
            })
            .catch((err) => console.log(err));
    };

    getLatestArticles() {
        const articles = [];
        return this.db.then((dbd) => {
                    dbd.collection('feeds')
                        .find({})
                        .forEach((feed) => {
                            articles.push({
                                category: feed.catName,
                                feed: feed.name,
                                url: feed.url,
                                id: feed.articles[0].id,
                                title: feed.articles[0].title,
                                image: feed.articles[0].imageUrl,
                                summary: feed.articles[0].summary,
                            });
                        }, () => {
                        });
        })
        .then(() => {
            return articles;
        });
    }

    deleteItem(itemId, subItemId) {
        const itemObjectId = new ObjectId(itemId);
        if (!subItemId) {
            return Promise.all([
                this.db
                .collection('categories')
                .deleteOne({ _id: itemObjectId }),
                this.db
                .collection('feeds')
                .deleteMany({ catId: itemId }),
                ])
                .then((result) => {
                    return result[0].deletedCount +
                        result[1].deletedCount;
                })
                .catch((err) => console.log('Error' + err));
        }
            return Promise.all([
                this.db
                .collection('categories')
                .updateOne({ _id: itemObjectId },
                    { $pull: { feeds: { id: subItemId } } }),
                this.db
                .collection('feeds')
                .deleteOne({ feedId: subItemId }),
            ])
                .then((result) => {
                    return result[0].result.nModified +
                        result[1].deletedCount;
                })
                .catch((err) => console.log('Error' + err));
    }
}

module.exports = FeedData;

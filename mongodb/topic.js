const mongodb = require("./connect");
class TopicCRUD {
  constructor() {
    this.client = null;
    this.collection = null;
    this.connect()
  }

  async connect() {
    const {db, client} = await mongodb
    this.collection = db.collection("topic")
    this.client = client
  }

  insertTopic(topic = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.insertOne(Object.assign(topic, {time: new Date}), (err, result) => {
        if (err) throw err;
        console.log("insert topic is successed");
        resolve(result);
      });
    })
  }

  findTopic(query = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.find(query).toArray((err, result) => {
        if (err) throw err;
        console.log("find topic success");
        resolve(result);
      });
    })
  }

  deleteTopic(query = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.deleteOne(query, (err, result) => {
        if (err) throw err;
        console.log("deleted topic success");
        resolve(result);
      });
    })
  }

  updateTopic(query = {}, data = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.updateOne(query,{$set: Object.assign(data, {time: new Date})}, (err, result) => {
        if (err) throw err;
        console.log("update topic success");
        resolve(result);
      });
    })
  }
}

module.exports = {
  TopicCRUD
};

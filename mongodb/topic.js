const mongodb = require("./connect")
class TopicCRUD {
  constructor() {
    this.client = null
    this.collection = null
    this.connect()
  }

  async connect() {
    const { db, client } = await mongodb
    this.collection = db.collection("topic")
    this.client = client
  }

  insertTopic(topic = {}) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne(
        Object.assign(topic, { createTime: new Date() }),
        (err, result) => {
          if (err) throw reject(err)
          console.log("insert topic is successed")
          resolve(result)
        }
      )
    })
  }

  findTopic(query = {}) {
    return new Promise((resolve, reject) => {
      this.collection.find(query).toArray((err, result) => {
        if (err) throw reject(err)
        console.log("find topic success")
        resolve(result)
      })
    })
  }

  deleteTopic(query = {}) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne(
        query,
        { $set: { deleted: true } },
        (err, result) => {
          if (err) throw reject(err)
          console.log("deleted topic success")
          resolve(result)
        }
      )
    })
  }

  updateTopic(query = {}, data = {}, opt) {
    return new Promise((resolve, reject) => {
      console.log(opt)
      this.collection.updateOne(
        query,
        opt ? opt : { $set: Object.assign(data, { updateTime: new Date() }) },
        (err, result) => {
          if (err) throw reject(err)
          console.log("update topic success")
          // console.log(result)
          resolve(result)
        }
      )
    })
  }
}

module.exports = {
  TopicCRUD
}

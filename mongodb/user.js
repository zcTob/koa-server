const mongodb = require("./connect");

class UserCRUD {
  constructor() {
    this.client = null;
    this.collection = null;
    this.connect()
  }

  async connect() {
    const { db, client } = await mongodb;
    this.collection = db.collection("user");
    this.client = client;
  }

  findUser(query = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.find(query).toArray((err, result) => {
        if (err) throw err;
        console.log("find user success");
        resolve(result);
      });
    });
  }

  deleteUser(val) {
    return new Promise(async (resolve, reject) => {
      this.collection.deleteMany(val, (err, result) => {
        if (err) reject(err);
        console.log("delete user success");
        resolve(result);
      });
    });
  }

  updateUser(oldVal, newVal) {
    return new Promise(async (resolve, reject) => {
      this.collection.update(oldVal, { $set: newVal }, (err, result) => {
        if (err) reject(err);
        console.log("Update user success");
        resolve(result);
      });
    })
  }

  insertUser(data) {
    return new Promise(async (resolve, reject) => {
      this.collection.insertOne(
          {
            username: data.username,
            password: data.password
          }
        ,
        (err, result) => {
          if (err) reject(err);
          console.log("insert user success");
          resolve(result.result);
        }
      );
    })
  }
}

module.exports = {
  UserCRUD
};

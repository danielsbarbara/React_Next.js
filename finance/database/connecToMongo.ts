const {MongoClient} = require('mongodb')

interface mongoObj{
    cli: object,
    db: Function
    collection: Function
}

const url: string = "mongodb://127.0.0.1:27017"
const defaultDbName: string = "FinanceApp"

let client: any = undefined

async function GetMongoClient() {
    if(!client){
        try{
            client = new MongoClient(url)
            await client.connect()
        } catch (err){
            console.log(err)
        }
    }
    return client
}

export async function GetCollection(dbName: string = defaultDbName, collectionName: string) {
    const cli: mongoObj = await GetMongoClient()
    const db: mongoObj = await cli.db(dbName)
    return db.collection(collectionName)
}
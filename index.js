import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use('/pub', express.static(path.join(__dirname, "client", "public")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

app.get('/fruits', async (req, res) => {
    const data = await fs.readFile('./fruits.json', 'utf8');
    const fruits = JSON.parse(data).fruits;
    if (fruits) {
        res.send(fruits);
    } else {
        res.status(404).send({ state: 'Fruits not found.' });
    }
})

app.get('/fruits/:fruitId', async (req, res) => {
    const data = await fs.readFile('./fruits.json', 'utf8');
    const fruits = JSON.parse(data).fruits;
    const fruitId = parseInt(req.params.fruitId)
    const fruit = fruits.find(fruit => fruit.id === fruitId)
    if (fruit) {
        res.send(fruit);
    } else {
        res.status(404).send({ state: `Fruit not found with id ${fruitId}.` });
    }
})


app.delete('/fruits/:fruitId', async (req, res) => {
    const data = await fs.readFile('./fruits.json', 'utf8');
    const fruits = JSON.parse(data).fruits;
    const fruitId = parseInt(req.params.fruitId)
    const fruit = fruits.find(fruit => fruit.id === fruitId)
    if (fruit) {
        const newFruits = fruits.filter(fruit => fruit.id !== fruitId)
        await fs.writeFile('./fruits.json', JSON.stringify({ fruits: newFruits }), 'utf8')
        res.send({ state: `Fruit with id ${fruitId} has been deleted.` });
    } else {
        res.status(404).send({ state: `Fruit not found with id ${fruitId}.` });
    }
});

app.post('/fruits', async (req, res) => {
    const data = await fs.readFile('./fruits.json', 'utf8');
    const fruits = JSON.parse(data).fruits;
    const fruitIds = fruits.map(fruit => fruit.id);
    const maxId = Math.max(...fruitIds);
    const newFruit = {
        id: maxId + 1,
        name: req.body.name
    };
    fruits.push(newFruit);
    await fs.writeFile('./fruits.json', JSON.stringify({ fruits }), 'utf8');
    res.send({ state: `${newFruit.name} has been successfully added to database.` });
});


app.listen(3000, () => {
    console.log('Your server is running on http://127.0.0.1:3000');
});
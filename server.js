const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: "Rent",
            budget: 375
        },
        {
            title: 'Grocery',
            budget: 110
        }
    ]
};

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/budget', (req, res) => {
    fs.readFile('budget.json', 'utf8', (err, data) => { //Using fs module from nodejs to read from budget.json
        if (err) { //In case of error, this will be thrown
            console.error('Error reading budget.json:', err);
            res.status(500).json({ error: 'Unable to read budget data' });
            return;
        }

        //Parses json file and puts it inside of budgetData
        try {
            const budgetData = JSON.parse(data);
            res.json(budgetData); //Responds with budgetData array
        } catch (parseError) { //In case of a parsing error
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Unable to parse budget data' });
        }
    });
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
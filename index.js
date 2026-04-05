const fs = require('fs');
const http = require('http');
// const slugify = require('slugify');


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%NUTIRENT%}/g, product.nutrients);
    
    if (!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    
    return output;
};

const templetOverview = fs.readFileSync(`${__dirname}/starter/templates/overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/starter/templates/product.html`, 'utf-8');
const templates = fs.readFileSync(`${__dirname}/starter/templates/template.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);
// const slugs = productData.map(el => slugify(el.productName, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
    
    // ✅ Modern URL API
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const query = Object.fromEntries(myUrl.searchParams);
    const pathName = myUrl.pathname;

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = productData
            .map(el => replaceTemplate(templates, el))
            .join('');

        const output = templetOverview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
        res.end(output);
    }

    else if (pathName === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const product = productData[query.id];

        
        const output = replaceTemplate(templateProduct, product);

        res.end(output);
    }

    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }

    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

const faker = require('faker')
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = 'vi'

//Random data
const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = []

    //loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        categoryList.push(category)
    })

    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return [];
    const productList = [];

    //random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                id: faker.datatype.uuid(),
                categoryId: category.id,
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(300, 300)


            }

            productList.push(product)
        })
    }


    return productList;
}


//IFFE
(() => {
    //Random data
    const categoryList = randomCategoryList(5);
    const productList = randomProductList(categoryList, 20);

    //prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Rio",
        },
    };

    //write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully =))');
    })
})();
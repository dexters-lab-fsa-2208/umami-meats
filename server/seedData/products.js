const products = [
    {
        name: "Kobe Beef",
        price: 299.99,
        grade: "A5",
        qty: 30,
        img: "https://www.thecoldwire.com/wp-content/uploads/2021/06/Chef-cutting-raw-Japanese-wagyu-beef.jpg",
        desc: "Kobe Beef from the Japanese Province of Kobe, the best of the best of wagyu",
        type: "steaks",
        tagName: "japanese"
    },
    {
        name: "Sanuki Olive Wagyu",
        price: 199.99,
        grade: "A5",
        qty: 50,
        img: "https://cdn.shopify.com/s/files/1/0520/1739/7957/products/japanese-a5-wagyu-sanuki-olive-wagyu-filet-mignon-i-bms-11-8oz-37578333913304.png?v=1658554784&width=700",
        desc: "Olive-Fed Wagyu from the Kagawa (Sanuki) prefecture of Japan. The cattle are raised on a strict diet consisting of dehydrated and roasted olive mulch, giving it a nuttier taste with elevated oleic acid levels. All Japanese A5 Wagyu comes with a complete Certificate of Authenticity, including the nose print from the cattle that provided your meat.",
        type: "steaks",
        tagName: "japanese"
    },
    {
        name: "Kumamoto Wagyu",
        price: 179.99,
        grade: "A5",
        qty: 75,
        img: "https://images.squarespace-cdn.com/content/v1/59bedf3e4c326dffa810a231/1558508002004-R24NFYK3N1WJZB3YI8EV/_SDI7869_20190427_kumamoto_wagyu_strip_ootf.jpg?format=2500w",
        desc: "Famous for being more lean that other wagyu, but still having that signature marbling, this is a great choice for those wanting less oily beef",
        type: "steaks",
        tagName: "japanese"
    },
    {
        name: "American Wagyu Beef NY Strip Steak",
        price: 79.99,
        grade: "BMS 9+",
        qty: 75,
        img: "https://cdn.shopify.com/s/files/1/0554/4466/8481/products/WagyuNYStrip_900x.png?v=1664225224",
        desc: "This is the highest grade of American Wagyu you can buy. Look no further, you have found the best steak in the country. The New York Strip is cut from the short loin of the Wagyu cattle. Delicious, tender, always juicy, amazing, superb, wow! Those are just some of the adjectives that will help (doesn't even scratch the surface) to describe the explosion of perfection in your mouth, after you try it!",
        type: "steaks",
        tagName: "american"
    },
    {
        name: "American Wagyu Beef Filet Mignon",
        price: 106.99,
        grade: "BMS 9+",
        qty: 70,
        img: "https://cdn.shopify.com/s/files/1/0061/3957/6410/products/american_wagyu-dark_c4260c2a-8ea6-4ec6-b65c-273280aa878c_1024x1024.jpg?v=1574352224",
        desc: "This is the highest grade of American Wagyu you can buy. Look no further, you have found the best steak in the country. The New York Strip is cut from the short loin of the Wagyu cattle. Delicious, tender, always juicy, amazing, superb, wow! Those are just some of the adjectives that will help (doesn't even scratch the surface) to describe the explosion of perfection in your mouth, after you try it!",
        type: "steaks",
        tagName: "american"
    },
    {
        name: "O-Toro",
        price: 169.99,
        grade: "AAA",
        qty: 150,
        img: "https://cdn.shopify.com/s/files/1/0075/4234/1743/products/MG_9017_b801102b-3fe2-4e7d-a5e3-1fd577b992be_5000x.jpg?v=1661987953",
        desc: "The delicacy of sushi, O-toro is the fatty belly of the tuna",
        type: "sushi",
        tagName: "tuna"

    },
    {
        name: "Chu-Toro",
        price: 124.99,
        grade: "AAA",
        qty: 200,
        img: "https://storage.googleapis.com/duckr-b8e76.appspot.com/EpD9w7lsZp-e8e4f49c53b61d5ad13af4af8488d9317409d866fb148e976bda52cb4eb298de.png",
        desc: "Just like our highest-quality Bluefin Otoro, Bluefin Chutoro also comes from the fatty underbelly of the Bluefin tuna. Chutoro is slightly lower in fat than Otoro and has a less intense taste, but its supreme flavor and soft flesh still make it one of the finest delicacies to come from the sea. ",
        type: "sushi",
        tagName: "tuna"
    },
    {
        name: "Akami",
        price: 84.99,
        grade: "AAA",
        qty: 300,
        img: "https://storage.googleapis.com/duckr-b8e76.appspot.com/5O7x8yZaE-20151c0035a13760fb24fc846119bcebaaf8e650d9f094e7af3027783ba80b5f.png",
        desc: "The delicacy of sushi, O-toro is the fatty belly of the tuna",
        type: "sushi",
        tagName: "tuna"
    },
    {
        name: "King Salmon",
        price: 84.99,
        grade: "AAA",
        qty: 300,
        img: "https://cdn.shopify.com/s/files/1/0523/1414/4937/products/Fillet-sq_600x600.jpg?v=1634072449",
        desc: "The delicacy of sushi, O-toro is the fatty belly of the tuna",
        type: "sushi",
        tagName: "salmon"
    },
    {
        name: "Atlantic Salmon",
        price: 74.99,
        grade: "AA",
        qty: 300,
        img: "https://catalinaop.com/wp-content/uploads/2020/12/wjnKaV9-scaled-2.jpg",
        desc: "The delicacy of sushi, O-toro is the fatty belly of the tuna",
        type: "sushi",
        tagName: "salmon"
    },
    {
        name: "Kumamoto Oysters",
        price: 49.99,
        grade: "AAA",
        qty: 500,
        img: "https://www.citarella.com/media/catalog/product/cache/0a1f163765072c838f99d363b77c89e0/k/u/kumamoto_1.jpg",
        desc: "Kumamoto Oysters are deep-cupped with petite meats, have a mild brininess, sweet flavor and a honeydew finish. They are a favorite for both new oyster eaters and connoisseurs.",
        type: "sushi",
        tagName: "shellfish"
    },
    {
        name: "Uni (Sea Urchin)",
        price: 169.99,
        grade: "AAA",
        qty: 500,
        img: "https://tastecooking.com/wp-content/uploads/2018/12/10.13_uni.jpg",
        desc: "Uni is a world-class delicacy—and one of the more unexpected foods to come from Japan. Sometimes referred to as the sea urchin's roe, or eggs, uni is actually the creature's gonads (reproductive glands), and the edible portion of the spiny sea urchin.",
        type: "sushi",
        tagName: "shellfish"
    },
    {
        name: "Hotate (Scallop)",
        price: 169.99,
        grade: "AAA",
        qty: 500,
        img: "https://www.umai-aomori.com/wp-content/uploads/2019/02/scallop.jpg",
        desc: "Sashimi-grade hotate scallops caught in The Sea of Okhotsk, northeast of Hokkaido prefecture.",
        type: "sushi",
        tagName: "shellfish"
    },
];

module.exports = products;

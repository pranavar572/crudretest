
let products = [];

if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
}

displayProducts();

productsForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const prodid = productid.value;
    const prodname = productName.value;
    const prodprice = price.value;
    const prodquantity = quantity.value;

    const product = {
        productid: prodid,
        productName: prodname,
        price: prodprice,
        quantity: prodquantity
    };

    const editIndex = editStatus.value;

    if (editIndex === "") {
        products.push(product);
    } else {
        products[editIndex] = product;
        editStatus.value = "";
    }

    localStorage.setItem("products", JSON.stringify(products));

    productsForm.reset();

    displayProducts();

});

function displayProducts() {

    tableBody.innerHTML = "";

    products.forEach((item, index) => {

        let status = "";

        if (Number(item.quantity) < 5) {
            status = `<span class="badge bg-danger">Low Stock</span>`;
        } else {
            status = `<span class="badge bg-success">Available</span>`;
        }

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productid}</td>
                <td>${item.productName}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${status}</td>
                <td>
                    <button onclick="editProduct(${index})"
                        class="btn btn-warning btn-sm">
                        Edit
                    </button>

                    <button onclick="deleteProduct(${index})"
                        class="btn btn-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

    totalProducts.innerHTML = products.length;

    const lowStockProducts = products.filter((item) => {
        return Number(item.quantity) < 5;
    });

    lowStock.innerHTML = lowStockProducts.length;

}

function deleteProduct(index) {

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

}

function editProduct(index) {

    const productDetails = products[index];

    productid.value = productDetails.productid;
    productName.value = productDetails.productName;
    price.value = productDetails.price;
    quantity.value = productDetails.quantity;

    editStatus.value = index;

}


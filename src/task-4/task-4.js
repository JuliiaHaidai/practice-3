function renderCartItem(item) {
    return `
    <li data-item-id="${item.id}" data-item-qty="1" data-item-price="${item.price}" data-item-total="${item.price}">
        <h5 class="item-name">${item.name}</h5>
        <div class="item-info-wrapper">
            <div class="qty-wrapper">Qty: <span class="item-qty">1</span></div>
            <div class="price-wrapper"> Price: $<span class="item-price">${item.price}</span></div>
            <button class="btn btn-sm btn-outline-danger remove" data-item-id="${item.id}">Remove</button>
        </div>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(rootEl) {
        this.cartEl = rootEl.querySelector(".shopping-cart-list");
        this.totalEl = rootEl.querySelector(".total");
        this.emptyCartEl = rootEl.querySelector(".empty-cart-message");
        this.removeAllEl = rootEl.querySelector(".remove-all");

        this.addEventListeners();
    }

    /**
     * Adds initial event listeners
     * @returns {undefined}
     */
    addEventListeners() {
        this.removeAllEl.addEventListener("click", () => {
            this.removeAll();
        });
        this.cartEl.addEventListener("click", e => {
            const target = e.target;
            if (target.tagName !== "BUTTON") {
                return;
            }
            this.removeItem(target.closest("li").dataset.itemId);
        });
    }

    /**
     * Adds new item to the cart
     * or increments its quantity if item is already present.
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addItem(item) {
        if (!this.isItemInCart(item.id)) {
            this.addNewItem(item);
        } else {
            this.incrementItem(item);
        }

        this.updateCartState();
    }

    /**
     * Renders new item in the cart
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addNewItem(item) {
        this.cartEl.innerHTML += renderCartItem(item);
    }

    /**
     * Increments quantity and total price for existing cart item
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    incrementItem(item) {
        const li = this.cartEl.querySelector(`[data-item-id="${item.id}"]`);
        const qtyWrapper = li.querySelector("span.item-qty");
        const priceWrapper = li.querySelector("span.item-price");

        const currentQty = +li.dataset.itemQty;

        li.dataset.itemTotal = +li.dataset.itemTotal + item.price;
        li.dataset.itemQty = `${currentQty + 1}`;

        qtyWrapper.innerHTML = li.dataset.itemQty;
        priceWrapper.innerHTML = li.dataset.itemTotal;
    }

    /**
     * Checks existence of item in shopping cart by its id
     * @param {string} id - ID of an item
     * @returns {boolean} - true if item is present in shopping cart, false otherwise
     */
    isItemInCart(id) {
        for (const elem of this.cartEl.children){
            if(elem.getAttribute('data-item-id') === id){
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if shopping cart is empty
     * @returns {boolean} true if there's no items in cart, false otherwise
     */
    isCartEmpty() {
        if (this.cartEl.childElementCount === 0 ) {
            return true;
        }
        return false;
    }

    /**
     * Removes all items from the cart
     * @returns {undefined}
     */
    removeAll() {
        this.cartEl.innerHTML = "";
        this.updateCartState();
    }

    /**
     * Removes item from a list
     * @param {string} id - ID of and item to remove
     * @returns {undefined}
     */
    removeItem(id) {
        this.cartEl.removeChild(this.cartEl.querySelector(`[data-item-id="${id}"]`));
        this.updateCartState();
    }

    /**
     * Updates total sum and visibility of "no items" message / "remove all" button
     * @returns {undefined}
     */
    updateCartState() {
        this.updateTotal();
        this.updateNoItemsMessage();
        this.updateRemoveAllButton();
    }

    /**
     * Update total sum in cart
     * @returns {undefined}
     */
    updateTotal() {
        if (this.isCartEmpty()) {
            this.totalEl.innerHTML = "0";
        }
        this.totalEl.innerHTML = this.getTotalSum();
    }

    /**
     * Get total sum of all items in list
     * @returns {number} Total sum
     */
    getTotalSum() {
        let tSum = 0;
        for (const elem of this.cartEl.children) {
            tSum += +elem.getAttribute('data-item-total');
        }
        return tSum;
    }

    /**
     * Updates visibility of cart "no items" message depending on state of the cart
     * @returns {undefined}
     */
    updateNoItemsMessage() {
        if (!this.isCartEmpty()) {
            this.emptyCartEl.classList.add('d-none');
        } else {
            this.emptyCartEl.classList.remove('d-none')
        }
    }

    /**
     * Updates visibility of cart /"remove all" button depending on state of the cart
     * @returns {undefined}
     */
    updateRemoveAllButton() {
        if (!this.isCartEmpty()){
            this.removeAllEl.classList.remove('d-none')
        }
        else{
            this.removeAllEl.classList.add('d-none')
        }
    }
}

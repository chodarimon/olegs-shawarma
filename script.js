products = [
  {
    name: 'Beef Shawarma',
    tag: 'beef',
    price: 1100,
    inCart: 0
  },
  {
    name: 'Chicken Shawarma',
    tag: 'chicken',
    price: 1100,
    inCart: 0
  },
  {
    name: 'Sojok Shawarma',
    tag: 'sojok',
    price: 1290,
    inCart: 0
  },
  {
    name: 'Kebab Shawarma',
    tag: 'kebab',
    price: 990,
    inCart: 0
  },
  {
    name: 'Camel Shawarma',
    tag: 'camel',
    price: 1200,
    inCart: 0
  },
  {
    name: 'Special Beef Shawarma',
    tag: 'specBeef',
    price: 1300,
    inCart: 0
  },
  {
    name: 'Special Chicken Shawarma',
    tag: 'specChicken',
    price: 1300,
    inCart: 0
  },
  {
    name: 'Special Kebab Shawarma',
    tag: 'specKebab',
    price: 1200,
    inCart: 0
  }
  // {
  // 	name: "Secret Shawarma",
  // 	tag:"secret",
  // 	price:0,
  // 	inCart: 0
  // }
]

let buyButtons = $('.buy-btn')

for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener('click', function () {
    totalAmount(products[i], '+', true)
    totalCost(products[i], '+')
    let buySound = new Audio('sounds/give_gift.wav')
    buySound.play()
  })
}

function totalAmount(product, operation, buyButtonPressed) {
  let totalAmount = localStorage.getItem('totalAmount')
  totalAmount = parseInt(totalAmount)

  if (totalAmount) {
    switch (operation) {
      case '+':
        totalAmount++
        break
      case '-':
        totalAmount--
        break
      case '0':
        totalAmount -= product.inCart
        break
    }

    localStorage.setItem('totalAmount', totalAmount)
  } else if(buyButtonPressed) {
    localStorage.setItem('totalAmount', 1)
  }
  setCart(product, operation)
}

function setCart(product, operation) {
  let cartProducts = localStorage.getItem('cartProducts')
  cartProducts = JSON.parse(cartProducts)

  if (cartProducts != null) {
    if (cartProducts[product.tag] == undefined) {
      cartProducts = {
        ...cartProducts,
        [product.tag]: product
      }
    }
    switch (operation) {
      case '+':
        cartProducts[product.tag].inCart++
        break
      case '-':
        cartProducts[product.tag].inCart--
        break
      case '0':
        cartProducts[product.tag].inCart = 0
        break
    }
  } else {
    product.inCart = 1
    cartProducts = {
      [product.tag]: product
    }
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
}

function totalCost(product, operation) {
  let totalCost = localStorage.getItem('totalCost')

  if (totalCost != null) {
    totalCost = parseInt(totalCost)

    switch (operation) {
      case '+':
        totalCost += product.price
        break
      case '-':
        totalCost -= product.price
        break
      case '0':
        totalCost = totalCost - product.price * product.inCart
        break
    }

    localStorage.setItem('totalCost', totalCost)
  } else {
    localStorage.setItem('totalCost', product.price)
  }
}

function displayCart() {
  let cartProducts = localStorage.getItem('cartProducts')
  cartProducts = JSON.parse(cartProducts)

  let ordersContainer = $('.orders')
  let totalCost = localStorage.getItem('totalCost')

  if (cartProducts && ordersContainer) {
    Object.values(cartProducts).map((item) => {
      ordersContainer.append(`
				<div class = "order">
					<button class = "${item.tag} remove-btn">X</button>
					<img src = "img/menu/${item.tag}.jpg">
					<span>${item.name}</span>
				</div>

				<div class = "order-price">${item.price}₸</div>

				<div class = "order-quantity">
					<button class = "${item.tag} plus-btn">+</button>
					<span>${item.inCart}</span>
					<button class = "${item.tag} minus-btn">-</button>
				</div>

				<div class = "order-total">
					${item.inCart * item.price}₸
				</div>
			`)
    })

    ordersContainer.append(`
			<div class = "cart-total-container">
				<h4 class = "cart-total-title">Total: </h4>
				<h4 class = "cart-total">
					${totalCost}₸
				</h4>
				<button class = "order-btn">Order!</button>
			</div>
		`)
  }
}
displayCart()

let clearButton = $('.clear-cart-btn')

clearButton.bind('click', function () {
  localStorage.removeItem('cartProducts')
  localStorage.removeItem('totalAmount')
  localStorage.removeItem('totalCost')
  location.reload()
})

let plusButtons = $('.plus-btn')
for (let i = 0; i < plusButtons.length; i++) {
  plusButtons[i].addEventListener('click', (e) => {
    changeAmount(e, '+')
  })
}

let minusButtons = $('.minus-btn')
for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener('click', (e) => {
    changeAmount(e, '-')
  })
}

function changeAmount(e, operation) {
  cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
  tag = e.target.classList[0]

  switch (operation) {
    case '+':
      cartProducts[tag].inCart++
      break
    case '-':
      cartProducts[tag].inCart--
      break
  }

  totalAmount(cartProducts[tag], operation)
  totalCost(cartProducts[tag], operation)
  location.reload()
}

let removeButtons = $('.remove-btn')
for (let i = 0; i < removeButtons.length; i++) {
  removeButtons[i].addEventListener('click', (e) => {
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    tag = e.target.classList[0]

    totalAmount(cartProducts[tag], '0')
    totalCost(cartProducts[tag], '0')
    location.reload()
  })
}

function loop() {
  $('#img-about').css({ top: 0 })
  $('#img-about').animate(
    {
      top: '-=50'
    },
    2000
  )
  $('#img-about').animate(
    {
      top: '+=50'
    },
    2000,
    function () {
      loop()
    }
  )
}
loop()

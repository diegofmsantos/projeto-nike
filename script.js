// MENU HAMBURGUER
let menuNavBar = document.querySelector('#navbar')
let menu = document.querySelector('#menu').addEventListener('click', () => {
    if(menuNavBar.style.display == 'flex') {
        menuNavBar.style.display = 'none'
    } else {
        menuNavBar.style.display = 'flex'
    }
})

let cart = []
let modalQt = 1
modalKey = 0

const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)

// CLONANDO OS ITENS E EXIBINDO NA TELA
sneakersJson.map((item, index) => {
    let sneakersItem = c('.sneakers-area').cloneNode(true)
    sneakersItem.setAttribute('data-key', index)
    sneakersItem.querySelector('.sneakers-img img').src = item.img
    sneakersItem.querySelector('.sneakers-name').innerHTML = item.name
    sneakersItem.querySelector('.sneakers-price').innerHTML = `R$${item.price}`

// EXIBINDO MODAL    
    sneakersItem.querySelector('.sneakers-img').addEventListener('click', (e) => {
        let key = e.target.closest('.sneakers-area').getAttribute('data-key')
        modalQt = 1
        modalKey = key
        c('.modal-photo-frst img').src = item.img1
        c('.modal-photo-scnd img').src = item.img2
        c('.modal-photo-thrd img').src = item.img3
        c('.modal-photo-frth img').src = item.img4
        c('.modal-desc-name').innerHTML = item.name
        c('.modal-desc-price').innerHTML = `R$${item.price}`
        c('.modal-desc-size-item.selected').classList.remove('selected')
        cs('.modal-desc-size-item').forEach((size, sizeIndex) => {
            if(sizeIndex == 3) {
                size.classList.add('selected')
            }
            size.innerHTML = sneakersJson[key].size[sizeIndex]
        })
        c('.modal-qt-qt').innerHTML = modalQt
        c('.modal').style.opacity = 0
        c('.modal').style.display = 'flex'
        setTimeout(() => {
            c('.modal').style.opacity = 1
        }, 200)
    })
    
    c('main').append(sneakersItem)
})

// FECHANDO MODAL
function closeModal() {
    c('.modal').style.opacity = 0
    setTimeout(() => {
        c('.modal').style.display = 'none'
    }, 500)
}
c('.modal-cancel').addEventListener('click', closeModal)

// SELECIONANDO OS TAMANHOS
cs('.modal-desc-size-item').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.modal-desc-size-item.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

// BOTÃO DE MENOS E MAIS DO MODAL
c('.modal-qt-minus').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--
        c('.modal-qt-qt').innerHTML = modalQt
    }
})
c('.modal-qt-plus').addEventListener('click', () => {
    modalQt++
    c('.modal-qt-qt').innerHTML = modalQt
})

// ADICIONANDO SNEAKERS AO CARRINHO
c('.modal-add').addEventListener('click', () => {
    let size = parseInt(c('.modal-desc-size-item.selected').getAttribute('data-key'))
    let indentifier = sneakersJson[modalKey].id+'@'+size
    let key = cart.findIndex((item) => item.indentifier == indentifier)
    if(key > -1) {
        cart[key].qt += 1
    } else {
        cart.push({
            indentifier,
            id: sneakersJson[modalKey].id,
            size,
            qt: modalQt
        })
    }
    updateCart()
    closeModal()
})

// ATUALIZA O CARRINHO
function updateCart() {
    if(cart.length > 0) {
        c('aside').style.width = '2600px'
        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart) {
            let sneakersItem = sneakersJson.find((item) => item.id == cart[i].id)
            subtotal += sneakersItem.price * cart[i].qt

            let cartItem = c('.cart-general .cart-area').cloneNode(true)

            let sneakersSizeName
            switch (cart[i].size) {
                case 0:
                    sneakersSizeName = 38
                    break;
                case 1:
                    sneakersSizeName = 39
                    break;
                case 2:
                    sneakersSizeName = 40
                    break;
                case 3:
                    sneakersSizeName = 41
                    break;
                case 4:
                    sneakersSizeName = 42
                    break;
                case 5:
                    sneakersSizeName = 43
                    break;
                case 6:
                    sneakersSizeName = 44
                    break;
            }

            let sneakersName = `${sneakersItem.name} (${sneakersSizeName})`

            cartItem.querySelector('img').src = sneakersItem.img
            cartItem.querySelector('.cart-desc').innerHTML = sneakersName
            cartItem.querySelector('.cart-qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart-minus').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                } 
                updateCart()
            })
            cartItem.querySelector('.cart-plus').addEventListener('click', () => {
                cart[i].qt++
                updateCart()
            })

            c('.cart').append(cartItem)
        }

       desconto = subtotal * 0.05
       total = subtotal - desconto

       c('.cart-subtotal .cart-money').innerHTML = `R$ ${subtotal.toFixed(2)}`
       c('.cart-desc-total .cart-money').innerHTML = `R$ ${desconto.toFixed(2)}`
       c('.cart-total .cart-money').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        c('aside').style.width = '0px'
    }
}



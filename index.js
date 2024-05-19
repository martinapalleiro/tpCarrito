const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/*    -------------------------   */

const cartProduct=document.querySelector('.cart-product')
const rowProduct=document.querySelector('.row-product')

//lista de todos los contenedores de productos

const listProduct=document.querySelector('.container-items')

//variable de arr de productos
let allProducts = []

const valorTotal = document.querySelector('.total-pagar')
const countProducts = document.querySelector('#contador-productos')



listProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-add-cart')){
        const product=e.target.parentElement

        const infoProduct = {
            quantity:1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }
        const exits = allProducts.some(product=> product.title===infoProduct.title)

        if(exits){
            const products=allProducts.map(product=>{
                if(product.title===infoProduct.title){
                    product.quantity++;
                    return product;
                }else{
                    return product
                }
            })
            allProducts=[...products]
        } else { 
            allProducts=[...allProducts,infoProduct];
        }
        
        showHTML();
    }
});
//funcion para eliminar
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

//FUNCION PARA MOSTRAR HTML
const showHTML=()=> {


    //limpia html
    rowProduct.innerHTML='';

    let total=0;
    let totalOfProducts=0;

    allProducts.forEach(product=>{
        const containerProduct=document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML=`
            <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
        `;

        rowProduct.append(containerProduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts=totalOfProducts+product.quantity;
        
    });
    valorTotal.innerText=`$${total}`;
    countProducts.innerText=totalOfProducts;
}
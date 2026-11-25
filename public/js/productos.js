const form = document.getElementById("productForm");
const tabla = document.getElementById("tablaProductos");

let editando = false;

cargarProductos();

// =======================
// CARGAR PRODUCTOS
// =======================

async function cargarProductos(){
    const respuesta = await fetch("/productos");
    const productos = await respuesta.json();
    tabla.innerHTML = "";
    productos.forEach(producto=>{
        tabla.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>
                <button onclick="editarProducto(
                    ${producto.id},
                    '${producto.nombre}',
                    '${producto.categoria}',
                    ${producto.precio},
                    ${producto.stock},
                    '${producto.descripcion}'
                )">
                    Editar
                </button>
                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </td>
        </tr>
        `;
    });
}


// =======================
// GUARDAR PRODUCTO
// =======================

form.addEventListener("submit", async(e)=>{

    e.preventDefault();
    const producto = {
        nombre: document.getElementById("nombre").value,
        categoria: document.getElementById("categoria").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        descripcion: document.getElementById("descripcion").value
    };
    const id = document.getElementById("productId").value;
    if(editando){
        await fetch(`/productos/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(producto)
        });
        editando = false;
    }else{
        await fetch("/productos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(producto)
        });
    }
    form.reset();
    cargarProductos();
});


// ELIMINAR
// =======================
async function eliminarProducto(id){
    if(confirm("¿Eliminar producto?")){
        await fetch(`/productos/${id}`,{
            method:"DELETE"
        });
        cargarProductos();
    }
}
// EDITAR
// =======================
function editarProducto(
    id,
    nombre,
    categoria,
    precio,
    stock,
    descripcion
){
    document.getElementById("productId").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("categoria").value = categoria;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
    document.getElementById("descripcion").value = descripcion;
    editando = true;
}
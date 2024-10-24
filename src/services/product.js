import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistance/localstorage";
import { closeModal } from "../views/modal";
import { handleGetProductToStore, handleRenderList } from "../views/store";

export const handleSaveModifyElements = () => {
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('img').value;
    const precio = document.getElementById('precio').value;
    const categories = document.getElementById('categoria').value;
    let object = null;
    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories
        };
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories
        };
    };
    Swal.fire({
        title: "¡Listo!",
        text: "¡Se guardó con éxito la comida!",
        icon: "success",
        confirmButtonText: "Aceptar",  
        confirmButtonColor: "#006700"  
      });

    setInLocalStorage(object);

    handleGetProductToStore();

    closeModal();
};
export const handleDeleteProduct =()=> {

    Swal.fire({
        title: "Estás seguro?",
        text: "Estos cambios son irreversibles!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#006700",
        cancelButtonColor: "#D30202",
        confirmButtonText: "Si, quiero eliminarla!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Listo!",
            text: "Su comida ha sido eliminada",
            icon: "success"
          });
          const products = handleGetProductLocalStorage();
            const result = products.filter((el)=>el.id !== productoActivo.id);

            localStorage.setItem("products", JSON.stringify(result));

            const newProducts = handleGetProductLocalStorage();

            handleRenderList(newProducts);

            closeModal();
        }else{
            closeModal();
        }
      });
};
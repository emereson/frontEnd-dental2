const soloLetrasYEspacios = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
    !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
    charCode !== 32 && // Espacio
    charCode !== 8 // Tecla de retroceso
  ) {
    event.preventDefault();
  }
};

export default soloLetrasYEspacios;

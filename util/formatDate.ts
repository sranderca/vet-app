export default function formatDate(fechaAPI: string) {
  const fecha = new Date(fechaAPI);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por eso se suma 1
  const anio = fecha.getFullYear();

  // Asegurarse de que los números de día y mes tengan dos dígitos
  const diaFormateado = dia.toString().padStart(2, "0");
  const mesFormateado = mes.toString().padStart(2, "0");

const horas = fecha.getHours();
const minutos = fecha.getMinutes();
const segundos = fecha.getSeconds();

// Formatear la fecha y hora en el formato deseado (DD/MM/YYYY HH:MM)
const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${anio} Hora: ${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
return fechaFormateada;
}

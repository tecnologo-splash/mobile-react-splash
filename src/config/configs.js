export const viaNotif = [
    {texto: "Celular y Correo", value: "AMBAS"},
    {texto: "Correo", value: "CORREO"},
    {texto: "Celular", value: "MOBILE"},
    {texto: "Ninguna", value: "NINGUNA"},
];

export const notificaciones = [
{ name: "nuevo_seguidor", text: "Nuevo Seguidor" },
//{ name: "PERDIO_SEGUIDOR", text: "Perder seguidor " },
{ name: "bloqueo_desbloqueo", text: "Bloqueo o Desbloqueo" },
{ name: "chat_mensajes_nuevos", text: "Nuevos Chats" },
{ name: "comentarios_en_publicacion", text: "Nuevos comentarios" },
{ name: "reacciones_en_publicacion", text: "Nuevas Reacciones" },
//{ name: "CUENTA_ELIMINADA", text: "Cuenta Eliminada" },
]

export const tiposReacciones = [
    {id: 0, tipo: "ME_GUSTA", texto:"Me Gusta", icono: require("../../assets/reacciones/png/thumbs-up.png")},
    {id: 1, tipo: "NO_ME_GUSTA", texto:"No me Gusta", icono: require("../../assets/reacciones/png/thumbs-down.png")},
    {id: 2, tipo: "ME_DIVIERTE", texto:"Me Divierte", icono: require("../../assets/reacciones/png/grinning-face-with-smiling-eyes.png")},
    {id: 3, tipo: "ME_ENOJA", texto:"Me Enoja", icono: require("../../assets/reacciones/png/middle-finger.png")},
    {id: 4, tipo: "NO_ME_INTERESA", texto:"No me Interesa", icono: require("../../assets/reacciones/png/woman-shrugging.png")},
    {id: 5, tipo: "ELIMINAR", texto:"No me Interesa", icono: require("../../assets/reacciones/png/1f6ab.png")}
]

export const baseUriMultimedia = "https://splash.s3.amazonaws.com/api/files/";

export const tipoOrdenPublicacion = 
[
    {tipo: "Fecha de Creacion", url: "fechaCreado"}, 
    {tipo: "Cantidad de No Me Gusta", url: "resumenReaccion.cantidadNoMeGusta"},
    {tipo: "Cantidad de No Me Interesa", url: "resumenReaccion.cantidadNoMeInteresa"},
    {tipo: "Cantidad de Me Divierte", url: "resumenReaccion.cantidadMeDivierte"},
    {tipo: "Cantidad de Me Enoja", url: "resumenReaccion.cantidadMeEnoja"},
    {tipo: "Cantidad de Me Gusta", url: "resumenReaccion.cantidadMeGusta"},
];

export const ordenPublicacion = {_asc: "asc", _desc:"desc"};
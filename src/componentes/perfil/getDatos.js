import React from 'react';
import { Foundation } from '@expo/vector-icons'; 
export const getFecha = (fecha) =>{
    const date = fecha.split('-');
    switch(date[1]){
        case "01":
            return `${date[2]} de Enero de ${date[0]}`;
        case "02":
            return `${date[2]} de Febrero de ${date[0]}`;
        case "03":
            return `${date[2]} de Marzo de ${date[0]}`;
        case "04":
            return `${date[2]} de Abril de ${date[0]}`;
        case "05":
            return `${date[2]} de Mayo de ${date[0]}`;
        case "06":
            return `${date[2]} de Junio de ${date[0]}`;
        case "07":
            return `${date[2]} de Julio de ${date[0]}`;
        case "08":
            return `${date[2]} de Agosto de ${date[0]}`;
        case "09":
            return `${date[2]} de Setiembre de ${date[0]}`;
        case "10":
            return `${date[2]} de Octubre de ${date[0]}`;
        case "11":
            return `${date[2]} de Noviembre de ${date[0]}`;
        case "12":
            return `${date[2]} de Diciembre de ${date[0]}`;
    }
}

export const getGenero = (genero) =>{
    switch (genero){
        case 'HOMBRE':
            return <Foundation name="male-symbol" size={26} color="black" />;
        case 'MUJER':
            return <Foundation name="female-symbol" size={26} color="black" />;
        case 'OTRO':
            return <Foundation name="female" size={26} color="black" />;
    }
}
import {Component} from 'react';
import { AsyncStorage} from 'react-native';

export const USER_STORAGE_KEY = "usuario"

const url = "https://appdistflix.herokuapp.com/";

const urlLogin="api/auth/login"; //OK
const urlRegistrar="api/auth/signup"; // OK
const urlGetComentariosByUsuario="api/comment/movie/comment/user"; // 
const urlGrabarComentario="api/comment/comment/movie"; // 
const urlgetCommentsById="api/comment/movie/comment"; //


class ApiController extends Component
{
    
    login(okLogin,noOkLogin,usuarioBuscado)
    {
        const endpoint = `${url}${urlLogin}`;
        console.log("inciando sesion usuario")
        console.log(usuarioBuscado);
        
        return fetch(endpoint,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(usuarioBuscado) // data can be `string` or {object}!
        }).then ((response) => {
            return response.json();
        }).then (responseData => {
                console.log(responseData);
                if (responseData.username== usuarioBuscado.username){
                    okLogin();
                    console.log("usuario online");  
                    return AsyncStorage.setItem(USER_STORAGE_KEY, usuarioBuscado.username)
                }else{ 
                    noOkLogin();
                    throw new Error("credenciales ingresadadas invalidas")
                    console.log("credenciales ingresadadas invalidas");  
                    noOkLogin();
                }
        }).catch((err)=>{
            console.log("error captado ", err);
        });
    }
    registrarUsuario(okRegistro,noOkRegistro, usuarioRegistro)
    {
        const endpoint = `${url}${urlRegistrar}`;
        console.log(usuarioRegistro);
       fetch(endpoint,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(usuarioRegistro) // data can be `string` or {object}!
        }).then ((response) => {
            return response.json();
        }).then (responseData => {
                console.log(responseData);
                
                if (responseData.username== usuarioRegistro.username){
                    console.log("usuario regsitrado");  
                    okRegistro();
                }
                else{
                    console.log("El usuario ya existe");  
                    noOkRegistro();   
                }
        }).catch((err)=>{
            console.log(err);
        });
    };

    //cambiarPassword HACER
    urlGetComentariosByUsuario(usuario,okBusqueda)
    {
        const endpoint = `${url}${urlGetComentariosByUsuario}`;
        console.log("Buscando comentarios del usuario")
        console.log(usuario);
       fetch(endpoint,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(usuario) // data can be `string` or {object}!
        }).then ((response) => {
            
            return response.json();
        }).then (responseData => {
                console.log(responseData);
                okBusqueda(responseData);
                console.log("Recibi comentarios del usuario");       
        }).catch((err)=>{
            console.log(err);
        });
    };
    grabarComentario(okComentario,noOkComentario, datosComentario)
    {
        const endpoint = `${url}${urlGrabarComentario}`;
        //console.log("Buscando")
        console.log(datosComentario);
       fetch(endpoint,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(datosComentario) // data can be `string` or {object}!
        }).then ((response) => {
            return response.json();
        }).then (responseData => {
            console.log(responseData);
            console.log("Comentario enviado");  
            okComentario();
        }).catch((err)=>{
            console.log(err);
            noOkComentario();   
        });
    };
    //getEquiposById
    getCommentsById(imdbID,okEnvioComentario)
    {
        const endpoint = `${url}${urlgetCommentsById}`;
        //console.log("Buscando")
        console.log("id de la peli" , imdbID);
       fetch(endpoint,{
        method: 'POST', // or 'PUT'
        mode: "cors",
        headers:{ 'Accept': 'application/json, text/plain/', 'Content-Type': 'application/json'},
        body: JSON.stringify(imdbID)
         // data can be `string` or {object}!
//        body: bodyJSON.stringify(imdbID) // data can be `string` or {object}!
    }).then ((response) => {
            console.log("RESPUESTA :", response);
            return response.json();
        }).then (responseData => {
                console.log("RESPONSE DATA", responseData);
                okEnvioComentario(responseData);
                //console.log("Recibi datos");       
        }).catch((err)=>{
            console.log(err);
        });
    };
}
export default new ApiController();
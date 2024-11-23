### Proyecto realizado por Pacheco Infanzon Daniel 

# Features 
-Angular 
-Consumo de API Alumnos(login) y Countries( Listado de elementos)
-Tabla con botones Editar-Eliminar-Mas Info

## Login con informacion de Api Alumnos (https://api.escuelajs.co/api/v1/users)
![image](https://github.com/user-attachments/assets/3ade4912-ff4f-4b77-aaf3-c9ed31c1f666)

## Consumo de Api Countries (https://restcountries.com/v3.1/all)
![image](https://github.com/user-attachments/assets/1cb86269-e15a-4e77-b289-3f5332de786f)


### Requisitos previos 
 # Instalacion de angular en el entorno 
 Abre una terminal en Visual Studio Code.

- Instala Angular CLI globalmente si no lo tienes instalado:
-  # npm install -g @angular/cli
 - Crea un nuevo proyecto Angular:
- # ng new nombre-del-proyecto
- Navega al directorio del proyecto:
- # cd nombre-del-proyecto
- Inicia el servidor de desarrollo:
- # ng serve



### Estructura del royecto 

- componente Tabla
- Componente Header
- Componente Login
- Servicio de Country
- Servicio de Alumnos
- Configuracion Router

![image](https://github.com/user-attachments/assets/c4541819-2242-44c4-ae73-ffc5cf46d202)


## Conceptos y procesos basicos 

# Crear un componente 
- Abre una terminal en Visual Studio Code.
- Ejecuta el siguiente comando para generar un nuevo componente
- ng generate component nombre-del-componente

![image](https://github.com/user-attachments/assets/41d1358c-bc4f-48cf-add3-153dd286466f)
Al generar un  componentente tendremos 4 archivos
- hmtl:para poder dar la estrcutura a nuestro componente
- css: para poder darle estilos
- component.spec.ts: para configuracion
- component.ts: poder importar cada una de las librerias a usar, poder importar el router y definir funciones que se manden a llamar en nuestro html
  
  # Crear un servicio 
  - Abre una terminal en Visual Studio Code.
  - Ejecuta el siguiente comando para generar un nuevo servicio
  - ng generate service nombre-del-servicio

 ![image](https://github.com/user-attachments/assets/a05fedb6-7157-492a-b423-a764d696a2d7)
Al generar un servicio se generaran 2 archivos
- service-spec-ts: configuracion basica 
- servide.ts: podremos indicar de donde se origina el servicio para poder consumirlo, asi como los metodos basicos para poder obtener la informacion del API 

## Router 
La funcionalidad del router es poder comunicar nuestras diferentes vistas, para ello tendemos que importar los componentes por su nombre y ruta, craremos un path, indicando que componente se rendizara en esa ruta, asi mismo modificaremos una ruta por defecto para que siempre se redirija hacia el login 

![image](https://github.com/user-attachments/assets/6f397ee1-136f-499e-a51a-b097c4a5b5bf)


### Explicacion coidgo 

## LOGIN 

para el login necesitaremos una estructura html basica
- 2 campos de texto
- 1 boton
  ![image](https://github.com/user-attachments/assets/70ee792e-24c8-44b4-b87d-0786c87f1aee)

 # funciones 
 Al dar click en el boton va a llamar a una funcion que se realiza dentro de archivo component.ts
 1.- obtenemos datos con la funcion de obtener datos del servicio de alumnos
 2.- guardamos en una variable 
 3.- comparamos que las contraseñas coincidan 
 4.- si coinciden, el usuario se guarda en local storage 
 5.- rederigimos con la funcion del router hacia /Login 

 caso contario mostramos una alerta 
 
![image](https://github.com/user-attachments/assets/28b5635c-9d4a-498d-bdc2-04b0f8d7befb)


## Visualizacion Datos Usuario 

# Mostrar Card con Foto y nombre User con ventana modal para cerrar sesion 
Tendremos la estructura basica html, con el texto en forma de link para que el usuario pueda ver la ventana modal con la funcion *toggleLogoutModal*
![image](https://github.com/user-attachments/assets/6c6c5729-7794-4dd6-8b4f-27622e82eec6)
inicio.componenthtml

Para obtener el nombre y foto del usuario, tendremos en component.ts ya una varibale que la toma del localStorage para acceder a los datos 
currentUser.name e currentUser.avatar
![image](https://github.com/user-attachments/assets/4567de8a-acc5-43b6-acf4-d3d4d7bb50b0)
![image](https://github.com/user-attachments/assets/efb8fb34-ed35-46c1-a0e0-7dddfcf2447e)


 funcion para logout 
![image](https://github.com/user-attachments/assets/0f69a6cd-3f10-47c7-b0ce-ef9d26b08530)+
inicio.component.ts
 funcion para cerrar la ventana modal 
 ![image](https://github.com/user-attachments/assets/96f5c9ce-459d-42f5-8421-7b54b50ba0a5)
inicio.component.ts
## ## Visualizacion Datos Country 
tendremos la estructura del html de una tabla, con las columnas necesarias 
![image](https://github.com/user-attachments/assets/f3fd386f-91f1-4e98-8d40-b18d79d8805a)
inicio.component.html 

 - Con la funcion *ngFor* recorreremos todos los paises del API y se listaran en a tabla 
 - se asignara un index a cada pais como atributo al pais no a la tabla para asi poder hacer la manipualacion por index y no por nombre, esto con razon de que si modificamos el nombre este no va a poder encontrar su ubicacion
 - añaden los botones de edicion
 - agrega una barra de busqueda
   
Funcion para mostar Country 
![image](https://github.com/user-attachments/assets/5dd53abb-7aa0-4ca5-aac5-0e350468b4b3)
Funcion para la busqueda 
![image](https://github.com/user-attachments/assets/031faf21-b590-4b60-a105-c5c7e99b6834)
![image](https://github.com/user-attachments/assets/04dc632c-4360-4ebb-8190-f7b115c17f0b)

   



# Login
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.



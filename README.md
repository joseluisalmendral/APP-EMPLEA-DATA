# EMPLEA DATA | JLFA

Bienvenido/a a este repositorio. Este proyecto es una aplicación web desplegada en la siguiente URL: [EMPLEA DATA](https://joseluisalmendral.github.io/APP-EMPLEA-DATA/). Se trata de un trabajo en desarrollo como parte del proyecto final de máster, con el objetivo de proporcionar información en tiempo real sobre la situación del mercado laboral en el ámbito de los datos.

## Sobre la aplicación

La aplicación **EMPLEA DATA** tiene como propósito ayudar tanto a profesionales como a empresas a comprender mejor la demanda de habilidades en el sector del Data Science, Data Engineering y otras áreas relacionadas. Mediante la recopilación y análisis de datos en tiempo real, la plataforma permite:

- Identificar qué habilidades son más demandadas en cada uno de los distintos puestos dentro del sector.
- Obtener una visión general de las tendencias del mercado laboral en el mundo del data.
- Apoyar a empresas en la toma de decisiones sobre la formación de sus empleados.
- Facilitar a los profesionales del sector la orientación de su desarrollo y crecimiento profesional en función de la demanda actual.

## Contenido del repositorio

Este repositorio contiene varios archivos y carpetas relevantes para configurar, desarrollar y desplegar la aplicación:

- **index.html**  
  Archivo HTML principal donde se monta la aplicación React.

- **package.json**  
  Contiene la información del proyecto (nombre, versión, scripts, dependencias, etc.).

- **postcss.config.cjs**  
  Configuración de PostCSS.

- **tailwind.config.cjs**  
  Configuración de TailwindCSS (incluye temas, colores y rutas relevantes).

- **vite.config.js**  
  Configuración principal de Vite (definición del plugin de React y ruta base para el despliegue).

- **public/**  
  - **desktop_pc/**  
    - **license.txt**: Licencia del modelo 3D “Gaming Desktop PC”.  
    - **scene.gltf**: Archivo del modelo 3D en formato GLTF (truncado para mantener el repositorio ligero).
  - Otros recursos públicos (imágenes, modelos 3D, etc.).

## Requisitos previos

- **Node.js**: Se recomienda la versión LTS (16 o superior).
- **npm** o **yarn**: Administrador de paquetes para instalar las dependencias.

## Instalación

1. Clona este repositorio o descárgalo en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```
   > Si prefieres **yarn**, usa `yarn install`.

## Scripts disponibles

En el archivo `package.json` encontrarás varios scripts que pueden ejecutarse desde la línea de comandos:

- **`npm run dev`**  
  Inicia la aplicación en modo de desarrollo utilizando **Vite**.  
  Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) para verla en tu navegador.

- **`npm run build`**  
  Genera una versión de producción de la aplicación en la carpeta `dist`.

- **`npm run preview`**  
  Sirve la versión de producción localmente para comprobarla antes de desplegar.

- **`npm run deploy`**  
  Ejecuta la publicación en **GitHub Pages** (requiere la configuración previa indicada en `package.json`).

## Estructura de archivos

```bash
📂 Raíz del proyecto
 ┣ 📂 public
 ┃ ┣ 📂 desktop_pc
 ┃ ┃ ┣ license.txt
 ┃ ┃ ┗ scene.gltf
 ┃ ┗ ... (otros archivos públicos)
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┃ ┗ ... (imágenes y recursos)
 ┃ ┗ ... (componentes, hooks, context, etc.)
 ┣ 📜 index.html
 ┣ 📜 package.json
 ┣ 📜 postcss.config.cjs
 ┣ 📜 tailwind.config.cjs
 ┗ 📜 vite.config.js
```

## Uso y despliegue

1. **Desarrollo local**:  
   Ejecuta `npm run dev` para iniciar un servidor de desarrollo con recarga en tiempo real (HMR).

2. **Generar versión de producción**:  
   Ejecuta `npm run build`. Esto creará la carpeta `dist` con los archivos optimizados.

3. **Previsualizar la build**:  
   Ejecuta `npm run preview` para iniciar un servidor local y revisar la carpeta `dist`.

4. **Desplegar a GitHub Pages** (opcional):  
   - Asegúrate de configurar el repositorio en GitHub con la rama y ruta base correctas.
   - Ejecuta `npm run deploy` para publicar los archivos de producción en la rama `gh-pages`.

## Licencia y créditos

- El modelo **Gaming Desktop PC** se distribuye bajo licencia [CC-BY-4.0 ](http://creativecommons.org/licenses/by/4.0/).  
  El crédito es obligatorio y **puedes usarlo con fines comerciales** siempre que menciones al autor.  
  > Más detalles en el archivo [license.txt](public/desktop_pc/license.txt).

- Este proyecto se apoya en otras librerías open source, todas listadas en el `package.json`.

## Agradecimientos

- A la comunidad de **Vite** y **React** por la gran documentación y herramientas.
- A los autores de librerías como `tailwindcss`, `@react-three/drei`, `@react-three/fiber`, etc., por simplificar el desarrollo 3D en la web.
- A [Yolala1232](https://sketchfab.com/Yolala1232) por el modelo “Gaming Desktop PC”.

---

Gracias por visitar este repositorio. Si tienes preguntas, sugerencias o mejoras, no dudes en abrir un **issue** o enviar un **pull request**.  

¡Disfruta explorando y creando con **EMPLEA DATA | JLFA**!


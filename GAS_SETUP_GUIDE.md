# Guía de Configuración: Backend en Google Apps Script (GAS)

Esta guía explica cómo configurar una hoja de cálculo de Google para recibir las respuestas de la encuesta de forma gratuita y sin servidores propios.

## 1. Crear la Hoja de Cálculo
1. Ve a [Google Sheets](https://sheets.new).
2. Ponle un nombre (ej: "Respuestas Encuesta CIC").
3. **Opcional**: En la primera fila (A1:G1), escribe los encabezados:
   `Timestamp`, `Q1`, `Q2`, `Q3`, `Q4`, `Q5`, `Comentarios`.
   *(El script los creará automáticamente si la hoja está vacía)*.

## 2. Configurar el Script
1. En el menú superior, ve a **Extensiones** > **Apps Script**.
2. Se abrirá una nueva pestaña. Borra todo el código que haya y pega el contenido del archivo `gas-backend/Code.gs` que está en tu proyecto.
3. Guarda el proyecto (clic en el icono del disquete) con el nombre "Backend Encuesta".

## 3. Desplegar como Aplicación Web
Este es el paso más importante:
1. Haz clic en el botón azul **Desplegar** (o *Deploy*) > **Nueva implementación**.
2. En "Seleccionar tipo", elige **Aplicación web**.
3. Configuración:
   - **Descripción**: Versión 1.
   - **Ejecutar como**: Yo (tu correo).
   - **Quién tiene acceso**: **Cualquier persona** (esto es necesario para que la web pueda enviar datos sin pedir login de Google).
4. Haz clic en **Desplegar**.
5. Google te pedirá autorizar el script. Acepta los permisos (si sale una advertencia de "App no verificada", haz clic en *Configuración avanzada* y luego en *Ir a Backend Encuesta (no seguro)*).

## 4. Obtener la URL
1. Una vez desplegado, se te mostrará una **URL de aplicación web**.
2. Cópiala. Debería verse algo así:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 5. Configurar el Proyecto Local
1. Abre el archivo `client/.env.production` en tu ordenador.
2. Sustituye `REPLACE_WITH_YOUR_ID` por la URL completa que te dio Google.
3. Para probarlo **ahora mismo** en modo desarrollo (`npm run dev`):
   - Copia esa misma URL también en el archivo `client/.env`. **Importante**: El comando `npm run dev` usa el archivo `.env`, mientras que la versión final que subas a internet usará `.env.production`.
4. Prueba desde tu móvil:
   - Asegúrate de estar en la misma WiFi que el PC.
   - Entra en la IP de tu PC y el puerto que diga la consola (ej: `http://192.168.1.50:5173`).

## Cambio de Cuenta en el Futuro
Si decides cambiar la cuenta de Google en producción:
1. Repite los pasos 1 a 3 en la nueva cuenta.
2. Actualiza la URL en el archivo `.env.production` de tu proyecto.
3. Vuelve a generar el build (`npm run build`).

## 6. Despliegue en Servidor Web Estático
¡Sí, funcionará perfectamente! Como ahora usas Google para guardar los datos, tu aplicación ya no necesita un servidor propio de Node.js. Para subirlo a internet:

1.  **Generar la versión final**:
    En tu terminal, dentro de la carpeta `client`, ejecuta:
    ```bash
    npm run build
    ```
    *(Este comando usará automáticamente la URL que pusiste en `.env.production`)*.

2.  **Archivos a subir**:
    Al terminar el comando, aparecerá una carpeta nueva llamada **`dist`** dentro de `client`.
    - Solo tienes que subir el contenido de esa carpeta `dist` a tu servidor (puedes usar GitHub Pages, Netlify, Vercel, o un hosting tradicional).

> [!IMPORTANT]
> **Si vas a subirlo a una subcarpeta** (ej: `misite.com/encuesta/`):
> He configurado el proyecto para que use "rutas relativas". Esto significa que debería funcionar en cualquier carpeta sin problemas. Solo recuerda que después de cualquier cambio en la configuración, debes volver a ejecutar `npm run build` y subir la carpeta `dist` de nuevo.

### ¿Por qué funcionará?
- El código en `dist` son solo archivos HTML, CSS y JS "estáticos".
- Cuando el usuario envíe la encuesta, su propio navegador mandará los datos directamente a la URL de Google que configuraste.
- No necesitas pagar por un servidor avanzado; cualquier hosting gratuito o básico sirve.

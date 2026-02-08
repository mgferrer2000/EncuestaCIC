# Cómo probar en tu móvil

Para abrir la encuesta en tu móvil (conectado al mismo WiFi):

1. **Asegúrate de que la app está corriendo** (ejecuta `encuesta.bat`).
2. **Averigua tu dirección IP local**:
   - Abre una terminal (PowerShell o CMD).
   - Escribe `ipconfig` y pulsa Enter.
   - Busca la línea que dice **Dirección IPv4**. Será algo como `192.168.1.XX` o `192.168.0.XX`.
3. **Abre el navegador en tu móvil**:
   - Escribe en la barra de direcciones: `http://TU_IP:5173`
   - Ejemplo: `http://192.168.1.35:5173`

¡Deberías ver la encuesta!

## Solución de Problemas
Si no carga en el móvil:
- Asegúrate de que el **Firewall de Windows** no esté bloqueando Node.js.
    - Si te salió una ventana pidiendo permiso al iniciar, asegúrate de haberle dado "Permitir acceso" (en redes privadas/públicas).

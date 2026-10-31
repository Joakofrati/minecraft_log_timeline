# Minecraft Timeline

MVP estático para explorar eventos `[DP_EVENT]` de logs de Minecraft directamente
en el navegador. Los archivos nunca se envían a un servidor.

## Desarrollo

```bash
npm install
npm start
```

Abre `http://localhost:4200/` y selecciona uno o varios archivos `.log`.
La aplicación permite asociar un jugador a cada archivo, filtrar por jugador o
tipo, buscar texto y exportar los eventos visibles a JSON o CSV.

## Build para GitHub Pages

```bash
npm run build
```

El build es estático y queda en `dist/logtimeline/`. Puede publicarse como
sitio estático en GitHub Pages. No requiere backend, base de datos ni
autenticación.

## Pruebas

```bash
npm test
```

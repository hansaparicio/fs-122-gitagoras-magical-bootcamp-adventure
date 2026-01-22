# ChatBot - Asistente Mágico

## Descripción
Componente interactivo de chatbot impulsado por la API de Mistral AI. Proporciona un asistente mágico flotante que responde consultas en una sola frase clara y concisa.

## Características
- 💬 Interfaz de chat limpia y responsiva
- 🎩 Icono del sombrero mágico como FAB (Floating Action Button)
- 🚀 Integración con API de Mistral AI
- ⚡ Respuestas rápidas y contextuales
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- ✨ Animaciones suaves y atractivas
- 🎨 Tema morado degradado coherente

## Configuración

### 1. Clave API de Mistral
Para usar el chatbot, necesitas obtener una clave API de Mistral:

1. Visita [Mistral AI Console](https://console.mistral.ai/)
2. Crea una cuenta o inicia sesión
3. Genera una nueva clave API
4. Copia tu clave API

### 2. Variable de Entorno
Agrega la clave API a tu archivo `.env`:

```env
VITE_MISTRAL_API_KEY=tu_clave_api_aqui
```

El archivo `.env` está en la raíz del proyecto. Si no existe, cópialo de `.env.example`:

```bash
cp .env.example .env
```

### 3. Dependencias
El componente usa React 18+ (ya incluido en tu proyecto) y Vite (configurado).

**No se requieren instalaciones adicionales** si ya tienes:
- React 18+
- Vite como bundler

## Uso

El componente está integrado automáticamente en `App.jsx` como un elemento flotante en la esquina inferior derecha de la pantalla.

### Para usar en otros componentes:

```jsx
import ChatBot from './components/ChatBot/ChatBot';

function MyComponent() {
  return (
    <div>
      <ChatBot />
      {/* resto del componente */}
    </div>
  );
}
```

## Estructura de archivos

```
src/
├── components/
│   └── ChatBot/
│       ├── ChatBot.jsx          # Componente principal
│       └── ChatBot.css          # Estilos
├── assets/
│   └── images/
│       └── Chatbox/
│           └── sombrero-magico.svg  # Icono del sombrero
└── App.jsx                      # Componente integrado aquí
```

## Configuración de la API

### Modelo utilizado
- **Modelo**: `mistral-tiny-latest`
- **Tokens máximos**: 100
- **Temperatura**: 0.5 (respuestas equilibradas)
- **Endpoint**: `https://api.mistral.ai/v1/chat/completions`

### Prompt del Sistema
El chatbot está configurado para:
- Responder como un asistente mágico amable y útil
- Responder siempre en una sola frase clara y concisa
- Mantener un tono divertido y mágico

## Personalización

### Cambiar el icono
Reemplaza `sombrero-magico.svg` con tu propia imagen (png, jpg, svg) en:
```
src/assets/images/Chatbox/
```

Luego actualiza la importación en `ChatBot.jsx`:
```jsx
import hatIcon from '../../assets/images/Chatbox/tu-imagen.png';
```

### Cambiar colores
Edita los gradientes en `ChatBot.css`:
```css
.chatbot-fab {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Cambia estos colores hex */
}
```

### Cambiar el prompt del sistema
En `ChatBot.jsx`, busca y modifica:
```jsx
{
  role: 'system',
  content: 'Tu nuevo prompt aquí...',
}
```

## Troubleshooting

### Error: "API key not configured"
- Asegúrate de tener la variable `VITE_MISTRAL_API_KEY` en tu `.env`
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "API error: 401"
- Tu clave API es inválida o expirada
- Verifica la clave en https://console.mistral.ai/

### Error: "API error: 429"
- Has excedido el límite de requests
- Espera un momento e intenta de nuevo

### Las imágenes no cargan
- Verifica que la ruta de la imagen sea correcta
- Asegúrate de que el archivo existe en `src/assets/images/Chatbox/`

## Variables de entorno disponibles

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `VITE_MISTRAL_API_KEY` | Clave API de Mistral AI | ✅ Sí |

## Notas técnicas

- El componente usa `import.meta.env` de Vite para acceder a variables de entorno
- Las llamadas a la API incluyen manejo de errores
- El chat se auto-desplaza al último mensaje
- Se muestran puntos animados mientras se carga la respuesta

## Licencia
Parte del proyecto MagicCodingAdventure

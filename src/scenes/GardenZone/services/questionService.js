/**
 * Servicio para generar preguntas de HTML usando IA
 */

const TOTAL_QUESTIONS = 10;
const API_TIMEOUT = 10000; // 10 segundos

/**
 * Preguntas de respaldo en caso de error de API
 */
const FALLBACK_QUESTIONS = [
    {
        id: 1,
        prompt: 'El tag <p> se utiliza para crear un ___',
        options: ['párrafo', 'imagen', 'enlace', 'título'],
        correct: 'párrafo'
    },
    {
        id: 2,
        prompt: 'El tag <img> requiere el atributo ___ para mostrar una imagen',
        options: ['src', 'href', 'link', 'url'],
        correct: 'src'
    },
    {
        id: 3,
        prompt: 'El tag <a> se utiliza para crear ___',
        options: ['enlaces', 'tablas', 'listas', 'formularios'],
        correct: 'enlaces'
    },
    {
        id: 4,
        prompt: 'La etiqueta <h1> se usa para ___',
        options: ['encabezado principal', 'pie de página', 'párrafo', 'enlace'],
        correct: 'encabezado principal'
    },
    {
        id: 5,
        prompt: 'El tag <ul> crea una lista ___',
        options: ['desordenada', 'ordenada', 'de definiciones', 'numerada'],
        correct: 'desordenada'
    },
    {
        id: 6,
        prompt: 'El tag <div> se utiliza para crear ___',
        options: ['contenedores', 'enlaces', 'imágenes', 'formularios'],
        correct: 'contenedores'
    },
    {
        id: 7,
        prompt: 'El atributo href se usa en el tag ___',
        options: ['<a>', '<img>', '<p>', '<div>'],
        correct: '<a>'
    },
    {
        id: 8,
        prompt: 'El tag <br> se utiliza para ___',
        options: ['salto de línea', 'negritas', 'cursiva', 'enlaces'],
        correct: 'salto de línea'
    },
    {
        id: 9,
        prompt: 'El tag <strong> se usa para texto ___',
        options: ['en negrita', 'en cursiva', 'subrayado', 'tachado'],
        correct: 'en negrita'
    },
    {
        id: 10,
        prompt: 'El tag <ol> crea una lista ___',
        options: ['ordenada', 'desordenada', 'de definiciones', 'de enlaces'],
        correct: 'ordenada'
    }
];

/**
 * Genera una pregunta individual usando la API de Mistral
 */
const generateSingleQuestion = async (questionNumber, usedTopics = []) => {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    
    if (!apiKey) {
        throw new Error('API key no configurada');
    }

    const topicsUsed = usedTopics.length > 0
        ? `Ya se usaron estos temas: ${usedTopics.join(', ')}. `
        : '';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-tiny-latest',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un generador de preguntas de HTML para un quiz educativo. Debes responder ÚNICAMENTE con un objeto JSON válido con esta estructura: {"prompt":"[pregunta con ___ para completar]","options":["opción1","opción2","opción3","opción4"],"correct":"[respuesta correcta]","topic":"[tema de la pregunta]"}. NO agregues texto adicional, SOLO el JSON.'
                    },
                    {
                        role: 'user',
                        content: `${topicsUsed}Genera una pregunta ÚNICA número ${questionNumber} sobre HTML básico. Debe ser sobre un tema completamente diferente a los anteriores. Temas posibles: etiquetas básicas (h1-h6, p, div, span, br, hr), atributos (id, class, src, href, alt, title, style), formularios (input, button, form, label, select, textarea), listas (ul, ol, li), tablas (table, tr, td, th), semántica (header, footer, nav, article, section), multimedia (img, video, audio), meta tags, enlaces (a, target). Responde SOLO con JSON válido.`
                    }
                ],
                max_tokens: 200,
                temperature: 1.2
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Error API: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.choices?.[0]?.message?.content) {
            throw new Error('Estructura de respuesta incorrecta');
        }

        let content = data.choices[0].message.content.trim();
        // Limpiar markdown si existe
        content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        const questionData = JSON.parse(content);
        
        // Validar estructura
        if (!questionData.prompt || !questionData.options || !questionData.correct || questionData.options.length !== 4) {
            throw new Error('Datos de pregunta inválidos');
        }

        // Mezclar opciones aleatoriamente
        const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);

        return {
            id: questionNumber,
            prompt: questionData.prompt,
            options: shuffledOptions,
            correct: questionData.correct,
            topic: questionData.topic || `Pregunta ${questionNumber}`
        };

    } catch (error) {
        clearTimeout(timeoutId);
        console.error(`Error generando pregunta ${questionNumber}:`, error.message);
        throw error;
    }
};

/**
 * Genera un conjunto completo de preguntas
 */
export const generateQuestions = async (totalQuestions = TOTAL_QUESTIONS) => {
    const questions = [];
    const usedTopics = [];

    for (let i = 1; i <= totalQuestions; i++) {
        try {
            const question = await generateSingleQuestion(i, usedTopics);
            questions.push(question);
            usedTopics.push(question.topic);
            
            // Pequeña pausa entre peticiones para no saturar la API
            if (i < totalQuestions) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error(`Fallo al generar pregunta ${i}, usando fallback`);
            // Usar pregunta de fallback
            const fallbackQuestion = FALLBACK_QUESTIONS[i - 1] || FALLBACK_QUESTIONS[0];
            questions.push({ ...fallbackQuestion, id: i });
        }
    }

    return questions;
};

/**
 * Obtiene preguntas de fallback en caso de error total
 */
export const getFallbackQuestions = () => {
    // Mezclar las opciones de cada pregunta para que sean diferentes
    return FALLBACK_QUESTIONS.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
    }));
};

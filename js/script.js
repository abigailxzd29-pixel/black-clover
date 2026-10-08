/* =========================================================
   ELEMENTOS PRINCIPALES
   ========================================================= */

const inicio = document.getElementById("inicio");
const pregunta = document.getElementById("pregunta");
const celebracion = document.getElementById("celebracion");
const carta = document.getElementById("carta");
const vela = document.getElementById("vela");
const sorpresa = document.getElementById("sorpresa");
const galeria = document.getElementById("galeria");

const regaloBtn = document.getElementById("regaloBtn");
const textoRegalo = document.getElementById("textoRegalo");

const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const mensajeNo = document.getElementById("mensajeNo");

const videoInicio = document.getElementById("videoInicio");
const videoCarta = document.getElementById("videoCarta");

const musicaCarta = document.getElementById("musicaCarta");
const controlMusica = document.getElementById("controlMusica");

const canvas = document.getElementById("canvasCelebracion");
const ctx = canvas.getContext("2d");

const llama = document.getElementById("llama");
const btnMicrofono = document.getElementById("btnMicrofono");
const btnApagar = document.getElementById("btnApagar");
const estadoVela = document.getElementById("estadoVela");

const imagenesMemoria = document.getElementById("imagenesMemoria");
const galeriaFotos = document.getElementById("galeriaFotos");
const mensajeGaleria = document.getElementById("mensajeGaleria");


/* =========================================================
   CAMBIO DE ESCENAS
   ========================================================= */

const escenas = [
    inicio,
    pregunta,
    celebracion,
    carta,
    vela,
    sorpresa,
    galeria
];


function mostrarEscena(escenaMostrar) {

    escenas.forEach((escena) => {

        if (!escena) {
            return;
        }

        escena.classList.add("oculto");
        escena.classList.remove("activa");

    });


    escenaMostrar.classList.remove("oculto");
    escenaMostrar.classList.add("activa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CAMBIO DE FONDO
   ========================================================= */

function mostrarFondoInicio() {

    videoInicio.classList.remove("oculto");
    videoCarta.classList.add("oculto");

    videoInicio.play().catch(() => {});

}


function mostrarFondoCarta() {

    videoInicio.classList.add("oculto");
    videoCarta.classList.remove("oculto");

    videoCarta.play().catch(() => {});

}


/* =========================================================
   REGALO INICIAL
   ========================================================= */

regaloBtn.addEventListener("click", () => {

    regaloBtn.classList.add("animando");

    textoRegalo.textContent =
        "PREPARANDO TU REGALO...";


    setTimeout(() => {

        mostrarEscena(pregunta);

        textoRegalo.textContent =
            "PRESIONA EL REGALO";

    }, 1000);

});


/* =========================================================
   RESPUESTAS DEL BOTÓN NO
   ========================================================= */

const frasesNo = [
    "¿Seguro que vas a decir que no?",
    "Piénsalo otra vez...",
    "No te cuesta nada darle una oportunidad.",
    "Demon... esa opción no era la correcta.",
    "Última oportunidad. Esta vez di que sí."
];


let contadorNo = 0;

let fraseFinalMostrada = false;


/* =========================================================
   BOTÓN NO
   ========================================================= */

btnNo.addEventListener("click", () => {

    /*
        Si ya apareció la frase final,
        el botón NO ahora funciona como SÍ.
    */

    if (fraseFinalMostrada) {

        continuarDesdePregunta();

        return;
    }


    /*
        Mientras existan frases normales,
        se muestran una por una.
    */

    if (contadorNo < frasesNo.length) {

        mensajeNo.textContent =
            frasesNo[contadorNo];


        mensajeNo.classList.remove("mostrar");

        void mensajeNo.offsetWidth;

        mensajeNo.classList.add("mostrar");


        contadorNo++;


        /*
            El botón solamente se mueve durante
            las primeras cuatro respuestas.

            En la quinta ya no se mueve.
        */

        if (contadorNo < 5) {

            moverBotonNo();

        } else {

            btnNo.classList.remove("movido");

            btnNo.style.transform =
                "translate(0, 0)";

        }


        return;
    }


    /*
        Después de las cinco frases aparece
        la frase final.
    */

    mensajeNo.textContent =
        "Sabía que terminarías abriendo el regalo.";


    mensajeNo.classList.remove("mostrar");

    void mensajeNo.offsetWidth;

    mensajeNo.classList.add("mostrar");


    fraseFinalMostrada = true;


    /*
        El botón NO se convierte en SÍ.
    */

    btnNo.classList.remove("movido");
    btnNo.style.transform = "translate(0, 0)";

    btnNo.classList.remove("boton-no");
    btnNo.classList.add("boton-si-final");

    btnNo.textContent = "SÍ";

});


/* =========================================================
   MOVIMIENTO DEL BOTÓN NO
   ========================================================= */

function moverBotonNo() {

    /*
        El botón NO permanece dentro del flujo normal.

        Ya no utiliza position:absolute.

        De esta manera puede moverse visualmente sin
        colocarse encima del botón SÍ.
    */

    btnNo.classList.add("movido");


    /*
        Movimiento pequeño y controlado.
    */

    const limiteX = 55;
    const limiteY = 25;


    const movimientoX =
        (Math.random() * limiteX * 2) - limiteX;


    const movimientoY =
        (Math.random() * limiteY * 2) - limiteY;


    btnNo.style.transform =
        `translate(${movimientoX}px, ${movimientoY}px)`;

}


/* =========================================================
   BOTÓN SÍ / CONTINUAR DESDE LA PREGUNTA
   ========================================================= */

function continuarDesdePregunta() {

    if (
        btnSi.disabled &&
        btnNo.disabled
    ) {
        return;
    }


    btnSi.disabled = true;
    btnNo.disabled = true;


    mostrarEscena(celebracion);


    iniciarCelebracion();


    iniciarMusica();

}


btnSi.addEventListener("click", () => {

    continuarDesdePregunta();

});


/* =========================================================
   MÚSICA
   ========================================================= */

function iniciarMusica() {

    musicaCarta.volume = 0.55;


    musicaCarta.play().catch(() => {

        /*
            Algunos navegadores pueden bloquear
            la reproducción automática.
        */

        controlMusica.textContent = "♪";

    });

}


controlMusica.addEventListener("click", () => {

    if (musicaCarta.paused) {

        musicaCarta.play().catch(() => {});

        controlMusica.textContent = "♪";

    } else {

        musicaCarta.pause();

        controlMusica.textContent = "Ⅱ";

    }

});


/* =========================================================
   CELEBRACIÓN
   ========================================================= */

let celebracionIniciada = false;


function ajustarCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


window.addEventListener(
    "resize",
    ajustarCanvas
);


ajustarCanvas();


function iniciarCelebracion() {

    if (celebracionIniciada) {
        return;
    }


    celebracionIniciada = true;


    crearConfeti();


    setTimeout(() => {

        celebracionIniciada = false;

    }, 5000);

}


/* =========================================================
   CONFETI
   ========================================================= */

function crearConfeti() {

    const cantidad = 100;


    for (let i = 0; i < cantidad; i++) {

        const confeti =
            document.createElement("div");


        confeti.className = "confeti";


        const tamanio =
            5 + Math.random() * 8;


        confeti.style.width =
            `${tamanio}px`;


        confeti.style.height =
            `${tamanio * 1.6}px`;


        confeti.style.left =
            `${Math.random() * 100}vw`;


        confeti.style.animationDuration =
            `${2.5 + Math.random() * 3}s`;


        confeti.style.animationDelay =
            `${Math.random() * 1.5}s`;


        /*
            Se usan colores generados desde JavaScript
            para que el confeti tenga variedad.
        */

        const colores = [
            "#c9a85b",
            "#a995ff",
            "#ffffff",
            "#6d4aff",
            "#e8d18c"
        ];


        confeti.style.background =
            colores[
                Math.floor(
                    Math.random() * colores.length
                )
            ];


        document.body.appendChild(
            confeti
        );


        setTimeout(() => {

            confeti.remove();

        }, 6000);

    }

}


/* =========================================================
   BOTÓN CONTINUAR
   ========================================================= */

function crearBotonContinuar(
    contenedor,
    texto = "CONTINUAR"
) {

    const boton =
        document.createElement("button");


    boton.type = "button";


    boton.className =
        "boton boton-continuar";


    boton.textContent =
        texto;


    contenedor.appendChild(
        boton
    );


    return boton;

}


/* =========================================================
   CONTINUAR DESDE LA CELEBRACIÓN
   ========================================================= */

const botonContinuarCelebracion =
    crearBotonContinuar(
        document.querySelector(
            ".celebracion-contenido"
        )
    );


botonContinuarCelebracion.addEventListener(
    "click",
    () => {

        mostrarFondoCarta();

        mostrarEscena(carta);

    }
);


/* =========================================================
   CONTINUAR DESDE LA CARTA
   ========================================================= */

const botonContinuarCarta =
    crearBotonContinuar(
        document.querySelector(
            ".carta-contenedor"
        )
    );


botonContinuarCarta.addEventListener(
    "click",
    () => {

        mostrarEscena(vela);

    }
);


/* =========================================================
   VELA
   ========================================================= */

let velaApagada = false;


function apagarVela() {

    if (velaApagada) {
        return;
    }


    velaApagada = true;


    llama.classList.add("apagada");


    estadoVela.textContent =
        "✦ DESEO CONCEDIDO ✦";


    estadoVela.classList.add("apagada");


    /*
        El botón CONTINUAR aparece después
        de apagar la vela.

        La sorpresa NO se abre automáticamente.
    */

    botonContinuarVela.style.display =
        "inline-block";


    /*
        Si el micrófono estaba activo,
        se detiene.
    */

    if (escuchandoMicrofono) {

        detenerMicrofono(
            flujoMicrofono
        );

    }

}


/* =========================================================
   BOTÓN CONTINUAR DE LA VELA
   ========================================================= */

const botonContinuarVela =
    crearBotonContinuar(
        document.querySelector(
            ".vela-contenedor"
        )
    );


botonContinuarVela.style.display =
    "none";


botonContinuarVela.addEventListener(
    "click",
    () => {

        mostrarEscena(sorpresa);

    }
);


/* =========================================================
   BOTÓN PARA APAGAR LA VELA
   ========================================================= */

btnApagar.addEventListener(
    "click",
    () => {

        apagarVela();

    }
);


/* =========================================================
   MICRÓFONO
   ========================================================= */

let audioContext = null;
let analyser = null;
let microphone = null;
let datosAudio = null;
let escuchandoMicrofono = false;
let animacionMicrofono = null;
let flujoMicrofono = null;


btnMicrofono.addEventListener(
    "click",
    async () => {

        if (escuchandoMicrofono) {
            return;
        }


        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            estadoVela.textContent =
                "Tu navegador no permite usar el micrófono. Usa el botón para apagar la vela.";

            return;
        }


        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });


            flujoMicrofono =
                stream;


            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();


            analyser =
                audioContext.createAnalyser();


            analyser.fftSize = 256;


            microphone =
                audioContext.createMediaStreamSource(
                    stream
                );


            microphone.connect(
                analyser
            );


            datosAudio =
                new Uint8Array(
                    analyser.frequencyBinCount
                );


            escuchandoMicrofono = true;


            estadoVela.textContent =
                "SOPLA CERCA DEL MICRÓFONO...";


            detectarSoplo(stream);

        } catch (error) {

            console.error(
                "No se pudo acceder al micrófono:",
                error
            );


            estadoVela.textContent =
                "No se pudo activar el micrófono. Usa el botón para apagar la vela.";

        }

    }
);


/* =========================================================
   DETECCIÓN DEL SOPLO
   ========================================================= */

function detectarSoplo(stream) {

    if (!escuchandoMicrofono) {
        return;
    }


    analyser.getByteFrequencyData(
        datosAudio
    );


    let suma = 0;


    for (
        let i = 0;
        i < datosAudio.length;
        i++
    ) {

        suma += datosAudio[i];

    }


    const promedio =
        suma / datosAudio.length;


    /*
        Este valor determina qué tan fuerte debe
        ser el soplido.

        Un valor menor = más sensible.
        Un valor mayor = necesita un soplido más fuerte.
    */

    if (promedio > 55) {

        apagarVela();


        detenerMicrofono(
            stream
        );


        return;
    }


    animacionMicrofono =
        requestAnimationFrame(
            () => detectarSoplo(stream)
        );

}


/* =========================================================
   DETENER MICRÓFONO
   ========================================================= */

function detenerMicrofono(stream) {

    escuchandoMicrofono = false;


    if (animacionMicrofono) {

        cancelAnimationFrame(
            animacionMicrofono
        );


        animacionMicrofono =
            null;

    }


    if (stream) {

        stream.getTracks().forEach(
            (track) => track.stop()
        );

    }


    if (audioContext) {

        audioContext.close().catch(
            () => {}
        );


        audioContext = null;

    }


    microphone = null;
    analyser = null;
    datosAudio = null;
    flujoMicrofono = null;

}


/* =========================================================
   CONTINUAR DESDE LA SORPRESA
   ========================================================= */

const botonContinuarSorpresa =
    crearBotonContinuar(
        document.querySelector(
            ".sorpresa-contenedor"
        ),
        "VER RECUERDOS"
    );


botonContinuarSorpresa.addEventListener(
    "click",
    () => {

        mostrarEscena(galeria);

        mostrarGaleriaFotos();

    }
);


/* =========================================================
   GALERÍA DE RECUERDOS
   ========================================================= */

/*
    IMPORTANTE:

    Las fotografías se guardarán en IndexedDB.

    Esto permite guardar imágenes mucho mejor que
    localStorage.

    Las fotos permanecerán en el navegador incluso
    después de cerrar y volver a abrir la página.
*/


const NOMBRE_BD = "RecuerdosDemon";
const VERSION_BD = 1;
const NOMBRE_COLECCION = "fotos";


let baseDatos = null;


/* =========================================================
   ABRIR BASE DE DATOS
   ========================================================= */

function abrirBaseDatos() {

    return new Promise((resolve, reject) => {

        const solicitud =
            indexedDB.open(
                NOMBRE_BD,
                VERSION_BD
            );


        solicitud.onupgradeneeded = (
            evento
        ) => {

            const db =
                evento.target.result;


            if (
                !db.objectStoreNames.contains(
                    NOMBRE_COLECCION
                )
            ) {

                db.createObjectStore(
                    NOMBRE_COLECCION,
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );

            }

        };


        solicitud.onsuccess = (
            evento
        ) => {

            baseDatos =
                evento.target.result;


            resolve(
                baseDatos
            );

        };


        solicitud.onerror = () => {

            reject(
                solicitud.error
            );

        };

    });

}


/* =========================================================
   GUARDAR FOTO
   ========================================================= */

function guardarFoto(archivo) {

    return new Promise(
        (resolve, reject) => {

            const transaccion =
                baseDatos.transaction(
                    [NOMBRE_COLECCION],
                    "readwrite"
                );


            const coleccion =
                transaccion.objectStore(
                    NOMBRE_COLECCION
                );


            const foto = {

                nombre:
                    archivo.name,

                tipo:
                    archivo.type,

                archivo:
                    archivo,

                fecha:
                    Date.now()

            };


            const solicitud =
                coleccion.add(foto);


            solicitud.onsuccess = () => {

                resolve(
                    solicitud.result
                );

            };


            solicitud.onerror = () => {

                reject(
                    solicitud.error
                );

            };

        }
    );

}


/* =========================================================
   OBTENER TODAS LAS FOTOS
   ========================================================= */

function obtenerFotos() {

    return new Promise(
        (resolve, reject) => {

            const transaccion =
                baseDatos.transaction(
                    [NOMBRE_COLECCION],
                    "readonly"
                );


            const coleccion =
                transaccion.objectStore(
                    NOMBRE_COLECCION
                );


            const solicitud =
                coleccion.getAll();


            solicitud.onsuccess = () => {

                resolve(
                    solicitud.result
                );

            };


            solicitud.onerror = () => {

                reject(
                    solicitud.error
                );

            };

        }
    );

}


/* =========================================================
   ELIMINAR FOTO
   ========================================================= */

function eliminarFoto(id) {

    return new Promise(
        (resolve, reject) => {

            const transaccion =
                baseDatos.transaction(
                    [NOMBRE_COLECCION],
                    "readwrite"
                );


            const coleccion =
                transaccion.objectStore(
                    NOMBRE_COLECCION
                );


            const solicitud =
                coleccion.delete(id);


            solicitud.onsuccess = () => {

                resolve();

            };


            solicitud.onerror = () => {

                reject(
                    solicitud.error
                );

            };

        }
    );

}


/* =========================================================
   MOSTRAR GALERÍA
   ========================================================= */

async function mostrarGaleriaFotos() {

    if (!baseDatos) {
        return;
    }


    galeriaFotos.innerHTML = "";


    try {

        const fotos =
            await obtenerFotos();


        if (fotos.length === 0) {

            mensajeGaleria.textContent =
                "Todavía no hay recuerdos guardados.";

            return;
        }


        mensajeGaleria.textContent =
            `${fotos.length} recuerdo${fotos.length === 1 ? "" : "s"} guardado${fotos.length === 1 ? "" : "s"}.`;


        fotos.forEach(
            (foto) => {

                crearElementoFoto(
                    foto
                );

            }
        );


    } catch (error) {

        console.error(
            "Error al cargar las fotos:",
            error
        );


        mensajeGaleria.textContent =
            "No se pudieron cargar los recuerdos.";

    }

}


/* =========================================================
   CREAR ELEMENTO DE FOTO
   ========================================================= */

function crearElementoFoto(foto) {

    const contenedor =
        document.createElement("div");


    contenedor.className =
        "foto-memoria";


    contenedor.dataset.id =
        foto.id;


    const imagen =
        document.createElement("img");


    imagen.alt =
        foto.nombre ||
        "Recuerdo";


    const url =
        URL.createObjectURL(
            foto.archivo
        );


    imagen.src =
        url;


    /*
        Cuando la imagen ya no sea necesaria,
        el navegador puede liberar el objeto.
    */

    imagen.onload = () => {

        URL.revokeObjectURL(
            url
        );

    };


    const botonEliminar =
        document.createElement("button");


    botonEliminar.type =
        "button";


    botonEliminar.className =
        "eliminar-foto";


    botonEliminar.textContent =
        "×";


    botonEliminar.title =
        "Eliminar recuerdo";


    botonEliminar.setAttribute(
        "aria-label",
        "Eliminar recuerdo"
    );


    botonEliminar.addEventListener(
        "click",
        async () => {

            const confirmar =
                confirm(
                    "¿Quieres eliminar este recuerdo?"
                );


            if (!confirmar) {
                return;
            }


            try {

                await eliminarFoto(
                    foto.id
                );


                contenedor.remove();


                await mostrarGaleriaFotos();


            } catch (error) {

                console.error(
                    "No se pudo eliminar la foto:",
                    error
                );


                mensajeGaleria.textContent =
                    "No se pudo eliminar el recuerdo.";

            }

        }
    );


    contenedor.appendChild(
        imagen
    );


    contenedor.appendChild(
        botonEliminar
    );


    galeriaFotos.appendChild(
        contenedor
    );

}


/* =========================================================
   AGREGAR FOTOS A LA GALERÍA
   ========================================================= */

imagenesMemoria.addEventListener(
    "change",
    async () => {

        const archivos =
            Array.from(
                imagenesMemoria.files
            );


        if (
            archivos.length === 0
        ) {
            return;
        }


        try {

            for (
                const archivo of archivos
            ) {

                if (
                    !archivo.type.startsWith(
                        "image/"
                    )
                ) {

                    continue;

                }


                await guardarFoto(
                    archivo
                );

            }


            imagenesMemoria.value =
                "";


            await mostrarGaleriaFotos();


            mensajeGaleria.textContent =
                "Recuerdos guardados correctamente.";


        } catch (error) {

            console.error(
                "No se pudieron guardar las fotos:",
                error
            );


            mensajeGaleria.textContent =
                "No se pudieron guardar las fotos.";

        }

    }
);


/* =========================================================
   INICIALIZAR GALERÍA
   ========================================================= */

async function inicializarGaleria() {

    try {

        await abrirBaseDatos();


        /*
            Cargamos los recuerdos existentes
            desde IndexedDB.
        */

        await mostrarGaleriaFotos();


    } catch (error) {

        console.error(
            "No se pudo abrir la galería:",
            error
        );


        mensajeGaleria.textContent =
            "No se pudo cargar la galería.";

    }

}


/* =========================================================
   INICIO
   ========================================================= */

mostrarFondoInicio();


inicializarGaleria();
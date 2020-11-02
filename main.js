let secuenciaUsuario = [];
let secuenciaMaquina = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = comenzarJuego;

actualizarEstado('Tocá "Empezar" para jugar!');
actualizarRonda('-')
bloquearInputUsuario();

function comenzarJuego() {

    manejarRonda();
}

function reiniciarEstado() {
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    ronda = 0;
}

function manejarRonda() {

    actualizarEstado('Es el turno de la máquina')
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroaleatorio();

    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function ($cuadro, index) {
        const RETRASO_SEQUENCIA_MAQUINA = (index + 1) * 1000;
        setTimeout(function () {
            resaltar($cuadro);
            console.log(RETRASO_SEQUENCIA_MAQUINA);
        }, RETRASO_SEQUENCIA_MAQUINA);
    });

    setTimeout(function () {
        actualizarEstado('Turno del jugador');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR)


    secuenciaUsuario = [];
    ronda++;
    actualizarRonda(ronda)
}

function manejarInputUsuario(e) {
    console.log(e);
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return ;
    }

    if (secuenciaMaquina.length === secuenciaUsuario.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda(), 1000)
    }
    return;
}


function obtenerCuadroaleatorio() {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];

}

function actualizarEstado(estado,error=false ) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    
    if (error){
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    }else{
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }  


}

function actualizarRonda(ronda) {
    document.querySelector('#ronda').textContent = ronda;
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function () {
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = function () {
        };
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function perder(){
    actualizarEstado('Perdiste!, tocá empezar para jugar' , true);
    bloquearInputUsuario();
    reiniciarEstado();

}
// import React from 'react'
// cuando se importa de este modo quiere decir que la función que se exporta
// por default es React, para ese se coloca default despues la palabra
// export

// import React, {Components, Proptypes} from 'react'
// en este caso se importa a components de react que no tiene default

// por lo tanto el impor a usar para invocar a estas funciones sería de este
// modo:
// import producto from 'producto' (default)
// import producto, {cuadrado, potencia} from 'producto' (otras)

// función exportada por defecto
export default function producto (a, b) {
  return a * b
}

export function cuadrado (a) {
  return a * a
}

export function potencia (b, e) {
  return Math.pow(b, e)
}

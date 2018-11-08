/**
 * IMPORTS
 * solo se pude tener una exportación por default en cada archivo
 *
 * ejemplo 1
 * import division from 'division'
 * cuando se importa de este modo quiere decir que la función que se exporta
 * por default es "division", para eso se coloca default despues la palabra
 * export
 *
 * ejemplo 2
 * import division, {module} from 'division'
 * en este caso se importa a "division" que esta declarado como default y a
 * "module" que no esta declarada como default entre los brackets usando
 * desestructuración
 */

import {suma} from './suma'
import {resta} from './resta'
import division, {modulo} from './division'

const c = console.log

c(suma(10, 20))
c(resta(40, 30))
c(division(100, 5))
c(modulo(100, 2))

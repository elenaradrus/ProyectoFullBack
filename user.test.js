
//const user = require('controllers/user.controllers');

/**
 * Hacemos dos test para comprobar el formato que admitimos en el registro con expresiones regulares
 */
const user = {
    responseOK: 'Response OK',
    responseFAIL: 'Response FAIL',
    email: "paco@gmail.com",
    contrasena: "Paco123*"
};
const objExpReg = () => user;

describe('Matchers Strings', () => {
    const exp = objExpReg();
    test('Comprobamos si la respuesta es correcta', () => {
        expect(exp.responseOK).toMatch(/OK/);
    });
    test('Comprobamos si la respuesta es incorrecta', () => {
        expect(exp.responseFAIL).toMatch(/FAIL/);
    });
    test('Comprobamos dirección de email', () => {
        expect(exp.email).toMatch(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
    })
    test('Comprobamos número de contraseña', () => {
        expect(exp.contrasena).toMatch(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        );
    });
});

const dni = {
    responseOK: 'Response OK',
    responseFAIL: 'Response FAIL',
    dni: "51276089G",
};

const dniExpReg = () => dni;

describe('Matchers Strings', () => {
    const exp1 = dniExpReg();
    test('Comprobamos si la respuesta es correcta', () => {
        expect(exp1.responseOK).toMatch(/OK/);
    });
    test('Comprobamos si la respuesta es incorrecta', () => {
        expect(exp1.responseFAIL).toMatch(/FAIL/);
    });
    test('Comprobamos el dni', () => {
        expect(exp1.dni).toMatch(/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/);
    })
    
});


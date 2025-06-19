const PATH = {
    //este es el que se usa en Postman =D 
    authsession: '/auth',
    cita: '/cita',
    pacientes: '/paciente',
    usuarios: '/user',
    login:'/login',
    anpp: '/anpp',
    antecedentes: '/antecedentes',
    exfisico: '/exfisico',
    finconsulta: '/fnconsulta',
    mhr: '/mhr',
    detcita: '/detcita'
}

const ROUTE = {
    authsession: require('./verifySession'),
    usuarios: require('./routeUser'),
    login: require('./auth'),
    pacientes: require('./routePaciente'),
    cita: require('./routeCita'),
    anpp: require('./routeAnpp'),
    antecedentes: require('./routeAntecedentes'),
    exfisico: require('./routeExamen_fisico'),
    finconsulta: require('./routeFinConsulta'),
    mhr: require('./routeMHR'),
    detcita: require('./routeDet_Cita')
}

module.exports = {
    PATH,
    ROUTE
}
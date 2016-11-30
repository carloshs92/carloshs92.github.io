var Plugins   = require('./plugins');
var Functions = {};

Functions.errorHandler = function(error){
    // console.log(error);
    var colorRed = Plugins.util.colors.red;
    Plugins.notifier.notify({
        title   : 'Error en la tarea: ' + error.plugin,
        message : error.message
    });
    Plugins.util.log(
        '\n',
        colorRed('----------------------------'),'\n',
        colorRed(' Error en la tarea: ' + error.plugin), '\n',
        colorRed('----------------------------'), '\n',
        error.message, '\n',
        colorRed('----------------------------')
    );
    this.emit('end');
};
Functions.successHandler = function(data){
    Plugins.notifier.notify({
        title   : 'Frontend Notify',
        message : 'Tarea terminada'
    });
};
Functions.isProduction = function (){
    var flag = true;
    if(Plugins.util.env.dev){
        flag = false;
    }
    return flag;
}

module.exports = Functions;

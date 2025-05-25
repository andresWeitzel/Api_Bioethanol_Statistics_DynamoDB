//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const { getPriceData } = require('../../helpers/dynamodb/operations/get-price');
const {
    validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
const {
    getMovingAverage,
    getPercentageChange,
    getTrend,
    getBasicStatistics,
    getCorrelation
} = require('../../helpers/math/statistics');

//Const
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let queryStrParams;
let periodo_inicio;
let periodo_fin;
let tipo_bioetanol;
let ventana_movil;
let tipo_tendencia;
let priceData;
let tendencias;
let estadisticas;
let msgResponse;
let msgLog;

/**
 * @description Function to get bioethanol price trends and statistics
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        priceData = null;
        tendencias = null;
        estadisticas = null;
        msgResponse = null;
        msgLog = null;
        tipo_bioetanol = 'ambos';
        ventana_movil = 3;
        tipo_tendencia = 'mensual';

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        if (eventHeaders != (null && undefined)) {
            checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);
        }

        if (checkEventHeadersAndKeys != (null && undefined)) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with query parameters  ---
        queryStrParams = event.queryStringParameters;

        if (queryStrParams != (null && undefined)) {
            periodo_inicio = queryStrParams.periodo_inicio;
            periodo_fin = queryStrParams.periodo_fin;
            tipo_bioetanol = queryStrParams.tipo_bioetanol || tipo_bioetanol;
            ventana_movil = queryStrParams.ventana_movil ? parseInt(queryStrParams.ventana_movil) : ventana_movil;
            tipo_tendencia = queryStrParams.tipo_tendencia || tipo_tendencia;
        }

        if (!periodo_inicio || !periodo_fin) {
            return await bodyResponse(
                BAD_REQUEST_CODE,
                'periodo_inicio and periodo_fin are required'
            );
        }
        //-- end with query parameters  ---

        //-- start with dynamodb operations  ---
        priceData = await getPriceData(periodo_inicio, periodo_fin);

        if (priceData == (null || undefined) || !priceData.length) {
            return await bodyResponse(
                BAD_REQUEST_CODE,
                'No data found for the specified period'
            );
        }
        //-- end with dynamodb operations  ---

        //-- start with data processing  ---
        tendencias = priceData.map((item, index) => {
            const precioMaiz = parseFloat(item.bioetMaiz.replace(',', '.'));
            const precioCana = parseFloat(item.bioetCanAzucar.replace(',', '.'));
            
            const previousItem = priceData[index - 1];
            const variacionMaiz = previousItem ? 
                getPercentageChange(
                    precioMaiz,
                    parseFloat(previousItem.bioetMaiz.replace(',', '.'))
                ) : 0;
            
            const variacionCana = previousItem ? 
                getPercentageChange(
                    precioCana,
                    parseFloat(previousItem.bioetCanAzucar.replace(',', '.'))
                ) : 0;

            return {
                periodo: item.periodo,
                precio_maiz: precioMaiz,
                precio_cana: precioCana,
                variacion_porcentual_maiz: variacionMaiz,
                variacion_porcentual_cana: variacionCana,
                tendencia_maiz: getTrend(variacionMaiz),
                tendencia_cana: getTrend(variacionCana)
            };
        });

        // Calculate moving averages
        const preciosMaiz = tendencias.map(t => t.precio_maiz);
        const preciosCana = tendencias.map(t => t.precio_cana);
        
        const promediosMovilesMaiz = getMovingAverage(preciosMaiz, ventana_movil);
        const promediosMovilesCana = getMovingAverage(preciosCana, ventana_movil);

        // Add moving averages to trends
        tendencias.forEach((tendencia, index) => {
            tendencia.promedio_movil_maiz = promediosMovilesMaiz[index];
            tendencia.promedio_movil_cana = promediosMovilesCana[index];
        });

        // Calculate statistics
        estadisticas = {
            precio_maximo_maiz: getBasicStatistics(preciosMaiz).max,
            precio_minimo_maiz: getBasicStatistics(preciosMaiz).min,
            precio_promedio_maiz: getBasicStatistics(preciosMaiz).avg,
            precio_maximo_cana: getBasicStatistics(preciosCana).max,
            precio_minimo_cana: getBasicStatistics(preciosCana).min,
            precio_promedio_cana: getBasicStatistics(preciosCana).avg,
            correlacion: getCorrelation(preciosMaiz, preciosCana)
        };

        // Filter by bioethanol type if needed
        const tendenciasFiltradas = tipo_bioetanol === 'ambos' ? 
            tendencias : 
            tendencias.map(t => ({
                periodo: t.periodo,
                ...(tipo_bioetanol === 'maiz' ? {
                    precio_maiz: t.precio_maiz,
                    promedio_movil_maiz: t.promedio_movil_maiz,
                    variacion_porcentual_maiz: t.variacion_porcentual_maiz,
                    tendencia_maiz: t.tendencia_maiz
                } : {
                    precio_cana: t.precio_cana,
                    promedio_movil_cana: t.promedio_movil_cana,
                    variacion_porcentual_cana: t.variacion_porcentual_cana,
                    tendencia_cana: t.tendencia_cana
                })
            }));
        //-- end with data processing  ---

        return await bodyResponse(OK_CODE, {
            tendencias: tendenciasFiltradas,
            estadisticas
        });
    } catch (error) {
        msgResponse = 'ERROR in get-trends controller function for bioethanol-prices.';
        msgLog = msgResponse + `Caused by ${error}`;
        console.log(msgLog);
        return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
    }
}; 
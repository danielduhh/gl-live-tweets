var parking = {};

parking.emitEParkupdates = function() {
    ////go get data and emit notification every 2 seconds
//setInterval(function () {
//    request('http://web6.seattle.gov/sdot/wsvcEparkGarageOccupancy/Occupancy.asmx/GetGarage?prmGarageID=G7&prmMyCallbackFunctionName=', function (error, response, body) {
//
//        var result = stringToArray(body);
//
//        if (parkingSports !== result.VacantSpaces) {
//            var d = new Date();
//            console.log('new parking data: ' + d);
//        }
//
//        parkingSports = result.VacantSpaces;
//
//        if (!error && response.statusCode == 200) {
//            io.emit('notification', result);
//        }
//    });
//}, 2000);

    //// go get data and emit notification every 10 seconds
    //setInterval(function () {
    //    request('http://web6.seattle.gov/sdot/wsvcEparkGarageOccupancy/Occupancy.asmx/GetGarage?prmGarageID=G19&prmMyCallbackFunctionName=', function (error, response, body) {
    //
    //        if(body.length) {
    //            var result = stringToArray(body);
    //
    //            if (!error && response.statusCode == 200) {
    //                console.log('new data')
    //                io.emit('notification', result);
    //            }
    //        }
    //    });
    //}, 10000);
};

/**
 * take weird parenthesized string and turn into array
 * @param string
 */
function stringToArray(string) {

    return JSON.parse(string.substring(0, string.length - 2).substring(1, (string.substring(0, string.length - 2)).length))[0]

}

module.exports = parking;
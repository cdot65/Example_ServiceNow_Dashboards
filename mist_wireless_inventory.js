(function executeQuery(v_table, v_query) {
    var requestBody = {};
    var restMessage = new sn_ws.RESTMessageV2();

    restMessage.setHttpMethod("get");
    restMessage.setRequestHeader('Authorization', 'Token mytokenwashere');
    restMessage.setRequestHeader('Content-Type', 'application/json');
    restMessage.setEndpoint("https://api.mist.com/api/v1/orgs/myorgidwashere/stats/devices?type=ap");
    restMessage.setRequestBody(JSON.stringify(requestBody));

    var response = restMessage.execute();
    var responseBody = response.getBody();
    var responseObj = JSON.parse(responseBody);
    for (var i = 0, len = responseObj.length; i < len; ++i) {
        v_table.addRow({
            sys_id: gs.generateGUID(),
            u_ext_ip: responseObj[i].ext_ip,
            u_model: responseObj[i].model,
            u_name: responseObj[i].name,
            u_num_clients: responseObj[i].num_clients,
            u_serial: responseObj[i].serial,
            u_status: responseObj[i].status,
            u_version: responseObj[i].version
        });
    }
})(v_table, v_query);

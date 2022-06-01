(function executeQuery(v_table, v_query) {
    var requestBody = {};
    var restMessage = new sn_ws.RESTMessageV2();

    restMessage.setHttpMethod("get");
    restMessage.setRequestHeader('Authorization', 'Token mytokenwashere');
    restMessage.setRequestHeader('Content-Type', 'application/json');
    restMessage.setEndpoint("https://api.mist.com/api/v1/orgs/myorgidwashere/inventory?vc=true");
    restMessage.setRequestBody(JSON.stringify(requestBody));

    var response = restMessage.execute();
    var responseBody = response.getBody();
    var responseObj = JSON.parse(responseBody);

    for (var i = 0, len = responseObj.length; i < len; ++i) {
        v_table.addRow({
            sys_id: gs.generateGUID(),
            u_connected: responseObj[i].connected,
            u_id: responseObj[i].id,
            u_mac: responseObj[i].mac,
            u_model: responseObj[i].model,
            u_name: responseObj[i].name,
            u_org_id: responseObj[i].org_id,
            u_serial: responseObj[i].serial,
            u_site_id: responseObj[i].site_id,
            u_type: responseObj[i].type
        });
    }
})(v_table, v_query);

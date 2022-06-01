(function executeQuery(v_table, v_query) {

    //Get epoch time to feed to the query
    var epochMili = new GlideDateTime().getNumericValue();
    //Convert epoch miliseconds to seconds
    var epochNow = (epochMili / 1000).toFixed(0);
    var epoch7daysAgo = epochNow - 604800;
    var requestBody = {};
    var restMessage = new sn_ws.RESTMessageV2();
    restMessage.setHttpMethod("get");
    restMessage.setRequestHeader('Authorization', 'Token mytokenishere');
    restMessage.setRequestHeader('Content-Type', 'application/json');
    
    restMessage.setEndpoint("https://api.mist.com/api/v1/orgs/myorgidwashere/logs");
    
    restMessage.setRequestBody(JSON.stringify(requestBody));
    
    var response = restMessage.execute();
    var responseBody = response.getBody();
    var responseObj = JSON.parse(responseBody);

    for (var i = 0, len = responseObj.results.length; i < len; ++i) {

        v_table.addRow({
            sys_id: gs.generateGUID(),
            u_src_ip: responseObj.results[i].src_ip,
            u_timestamp: responseObj.results[i].timestamp,
            u_org_id: responseObj.results[i].org_id,
            u_admin_id: responseObj.results[i].admin_id,
            u_id: responseObj.results[i].id,
            u_admin_name: responseObj.results[i].admin_name,
            u_message: responseObj.results[i].message,
            u_user_agent: responseObj.results[i].user_agent,
            u_site_id: responseObj.results[i].site_id
        });
    }
})(v_table, v_query);

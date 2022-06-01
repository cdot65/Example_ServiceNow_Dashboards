(function executeQuery(v_table, v_query) {
    var requestBody = {};
    var restMessage = new sn_ws.RESTMessageV2();

    restMessage.setHttpMethod("get");
    restMessage.setRequestHeader('Authorization', 'Token mytokenwashere');
    restMessage.setRequestHeader('Content-Type', 'application/json');
    restMessage.setEndpoint("https://api.mist.com/api/v1/labs/orgs/myorgidwashere/suggestions?query=group_by_category_symptom&display_priority=high&active=true");
    restMessage.setRequestBody(JSON.stringify(requestBody));
  
    var response = restMessage.execute();
    var responseBody = response.getBody();
    var responseObj = JSON.parse(responseBody);
  
    var mistAp = responseObj.data.ap;
    var mistSwitch = responseObj.data['switch'];
    var connectivity = responseObj.data.connectivity;
    var mistGateway = responseObj.data.gateway;
    var layer1 = responseObj.data.layer_1;
    var total = responseObj.data.total;

    v_table.addRow({
      sys_id: gs.generateGUID(),
      u_radius: connectivity['auth_failure']['radius'],
      u_dhcpfailure: connectivity['dhcp_failure']['dhcp'],
      u_dnsfailure: connectivity['dns_failure']['dns'],
      u_arpfailure: connectivity['arp_failure']['CLIENT_GW_ARP_FAILURE'],
      u_apdisconnect: mistAp['ap_disconnect']['ap'],
      u_etherneterror: mistAp['ethernet_error']['ap'],
      u_healthcheck: mistAp['health_check']['ap'],
      u_insufficient_capacity: mistAp['insufficient_capacity']['ap'],
      u_insufficient_coverage: mistAp['insufficient_coverage']['ap'],
      u_missingvlan: mistSwitch['missing_vlan']['switch'],
      u_badcable: mistSwitch['bad_cable']['interface'],
      u_negotiationmismatch: mistSwitch['negotiation_mismatch']['interface'],
      u_portflap: mistSwitch['port_flap']['interface'],
      u_stploop: mistSwitch['stp_loop']['site'],
      u_bad_cable: mistGateway['bad_cable']['interface'],
      u_badwanlink: mistGateway['bad_wan_link']['interface'],
      u_cable: layer1['bad_cable']['ap'],
      u_total: total,
    });
  
  })(v_table, v_query);
  

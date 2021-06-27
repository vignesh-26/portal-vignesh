const express = require('express');
const parser = require('xml-js');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

app.post('/login', (req, res) => {
     //user= req.body.username();
    //password = req.body.password();
    const user= '0000000018';
    const password = '123456';
    if(user===req.body.user && password===req.body.password)
    {
        res.send("success")
    }
    else{
        res.send("failure")
    }
    const postData=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vig="http://vignesh.com">
    <soapenv:Header/>
    <soapenv:Body>
       <vig:mt_req>
          <username>`+user+`</username>
          <password>`+password+`</password>
       </vig:mt_req>
    </soapenv:Body>
 </soapenv:Envelope>`;
 var options={
    url:'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=bc_vignesh&receiverParty=&receiverService=&interface=si_vicky_interface&interfaceNamespace=http://vignesh.com',
    headers: { 'Content-Type': 'application/xml',
    'Authorization':'Basic UE9VU0VSOlRlY2hAMjAyMQ=='},
    body : postData
    }
request.post(options,function (error, response, body) {       
        if (!error && response.statusCode == 200) {
            var result1 = parser.xml2json(body, {compact: true, spaces: 4});
            result1=JSON.parse(result1);
            var resp=result1['SOAP:Envelope']['SOAP:Body']['ns1:mt_res']['status'];
            // res.send(resp._text);
            res.send(resp);
            //console.log(resp._text)
        }
    })
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
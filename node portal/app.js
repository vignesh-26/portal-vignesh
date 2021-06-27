const express = require('express');
const parser = require('xml-js');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
// for angular sserver connection vicky
 
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.post('/login', (req, res) => {
    id = req.body.username.toUpperCase();
    pwd = req.body.password.toUpperCase();
    // const id = '0000000019';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="http://logesh.com">
    <soapenv:Header/>
    <soapenv:Body>
       <log:MT_LOGINREQUEST>
          <USERNAME>${id}</USERNAME>
          <PASSWORD>${pwd}</PASSWORD>
       </log:MT_LOGINREQUEST>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_LOGESH&receiverParty=&receiverService=&interface=SI_LOGIN&interfaceNamespace=http://logesh.com',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            result1 = JSON.parse(result1);
            var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            res.send(resp);
            // res.send(result1);
        }
    })
});
app.post('/profile', (req, res) => {
    id = req.body.username; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_CUSTOMERDETAILS>
          <KUNNR>` + id + `</KUNNR>
       </urn:ZFM_CP_CUSTOMERDETAILS>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_CUSTOMERDETAILS&receiverParty=&receiverService=&interface=SI_CP_GETCUSTOMERDETAILS&interfaceNamespace=http://logesh.com',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_CUSTOMERDETAILS.Response'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/salesdetails', (req, res) => {
    id = req.body.username; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_GET_SALESORDER>
          <!--You may enter the following 9 items in any order-->
          <!--Optional:-->
          <DOC_FROM_DATE></DOC_FROM_DATE>
          <!--Optional:-->
          <DOC_TO_DATE></DOC_TO_DATE>
          <!--Optional:-->
          <FLAG></FLAG>
          <KUNNR>` + id + `</KUNNR>
          <!--Optional:-->
          <MATERIAL_EVG>
             <!--Optional:-->
             <MATERIAL_EXT></MATERIAL_EXT>
             <!--Optional:-->
             <MATERIAL_VERS></MATERIAL_VERS>
             <!--Optional:-->
             <MATERIAL_GUID></MATERIAL_GUID>
          </MATERIAL_EVG>
          <!--Optional:-->
          <MATERIAL_NUMBER></MATERIAL_NUMBER>
          <!--Optional:-->
          <PURCHASE_ORDER></PURCHASE_ORDER>
          <!--Optional:-->
          <PURCHASE_ORDER_NUMBER></PURCHASE_ORDER_NUMBER>
          <!--Optional:-->
          <SALESORG></SALESORG>
       </urn:ZFM_CP_GET_SALESORDER>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_GET_SALESDETAILS&receiverParty=&receiverService=&interface=SI_CP_SALESORDER_DETAILS&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_GET_SALESORDER.Response']['E_SALESORDER'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/creditdebitmemo', (req, res) => {
    id = req.body.username; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_CREDIT_DEBIT_MEMO>
          <KUNNR>` + id + `</KUNNR>
       </urn:ZFM_CP_CREDIT_DEBIT_MEMO>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_CREDIT_DEBIT_MEMO&receiverParty=&receiverService=&interface=SI_CP_CREDIT_DEBIT_MEMO&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_CREDIT_DEBIT_MEMO.Response'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/editprofile', (req, res) => {
    // id = req.body.username;
    customer_number = req.body.customer_number;
    // console.log(customer_number)
    country_key = req.body.country_key;
    name_1 = req.body.name1;
    name_2 = req.body.name2;
    city = req.body.city;
    postal_code = req.body.postal_code;
    region = req.body.region;
    sort_field = req.body.sort_field;
    house_number = req.body.house_number;
    telephone_number = req.body.telephone_number;



    //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_CUSTOMER_PROFILEUPDATE>
          <!--You may enter the following 10 items in any order-->
          <KUNNR>` + customer_number + `</KUNNR>
          <LAND1>` + country_key + `</LAND1>
          <NAME1>` + name_1 + `</NAME1>
          <NAME2>` + name_2 + `</NAME2>
          <ORT01>` + city + `</ORT01>
          <PSTLZ>` + postal_code + `</PSTLZ>
          <REGIO>` + region + `</REGIO>
          <SORTL>` + sort_field + `</SORTL>
          <STRAS>` + house_number + `</STRAS>
          <TELF1>` + telephone_number + `</TELF1>
       </urn:ZFM_CP_CUSTOMER_PROFILEUPDATE>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_CUSTOMER_UPDATEPROFILE&receiverParty=&receiverService=&interface=SI_CP_CUSTOMER_PROFILEUPDATE&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_CUSTOMER_PROFILEUPDATE.Response']['STATUS'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/masterdataupload', (req, res) => {
    city = req.body.city;
    console.log(city)
    country = req.body.country;
    console.log(country)
    currency = req.body.currency;
    console.log(currency)
    distchannel = req.body.distchannel;
    console.log(distchannel)
    division = req.body.division;
    console.log(division)
    first_name = req.body.first_name;
    console.log(first_name)
    language = req.body.language;
    console.log(language)
    last_name = req.body.last_name;
    console.log(last_name)
    postal_code = req.body.postal_code;
    console.log(postal_code)
    ref_customer = req.body.ref_customer;
    console.log(ref_customer)
    sales_org = req.body.sales_org;
    console.log(sales_org)
    street = req.body.street;
    console.log(street)
    telephone = req.body.telephone;
    console.log(telephone)
        // city = "CHENNAI";
        // country = "IN";
        // currency = "INR";
        // distchannel = "S1";
        // division = "S1";
        // first_name = "LOKESH";
        // language = "EN";
        // last_name = "KARTHIK";
        // postal_code = "123456";
        // ref_customer = "900614";
        // sales_org = "SA01";
        // street = "KAAR STREET";
        // telephone = "1234567890";


    //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_MASTERDATA_UPLOAD>
          <!--You may enter the following 13 items in any order-->
          <CITY>` + city + `</CITY>
          <COUNTRY>` + country + `</COUNTRY>
          <CURRENCY>` + currency + `</CURRENCY>
          <DISTCHANNEL>` + distchannel + `</DISTCHANNEL>
          <DIVISION>` + division + `</DIVISION>
          <FIRST_NAME>` + first_name + `</FIRST_NAME>
          <LANGUAGE>` + language + `</LANGUAGE>
          <LAST_NAME>` + last_name + `</LAST_NAME>
          <POSTAL_CODE>` + postal_code + `</POSTAL_CODE>
          <REF_CUSTOMER>` + ref_customer + `</REF_CUSTOMER>
          <SALES_ORG>` + sales_org + `</SALES_ORG>
          <STREET>` + street + ` </STREET>
          <TELEPHONE>` + telephone + `</TELEPHONE>
       </urn:ZFM_CP_MASTERDATA_UPLOAD>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_MASTER_DATA_UPLOAD&receiverParty=&receiverService=&interface=SI_CP_MASTER_DATA_UPLOAD&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_MASTERDATA_UPLOAD.Response']['KUNNR'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(" customer id created =" + resp['_text']);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/deliverylist', (req, res) => {
    id = req.body.username; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_GETDELIVERYLIST>
          <!--You may enter the following 2 items in any order-->
          <KUNNR>` + id + `</KUNNR>
          <IT_DELIVERYLIST>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
                <VBELN></VBELN>
                <!--Optional:-->
                <VKORG></VKORG>
                <!--Optional:-->
                <LFART></LFART>
                <!--Optional:-->
                <PSTYV></PSTYV>
                <!--Optional:-->
                <LFDAT></LFDAT>
                <!--Optional:-->
                <LFUHR></LFUHR>
                <!--Optional:-->
                <FKDAT></FKDAT>
                <!--Optional:-->
                <MATNR></MATNR>
                <!--Optional:-->
                <ARKTX></ARKTX>
                <!--Optional:-->
                <LFIMG></LFIMG>
                <!--Optional:-->
                <MEINS></MEINS>
                <!--Optional:-->
                <BTGEW></BTGEW>
                <!--Optional:-->
                <NTGEW></NTGEW>
                <!--Optional:-->
                <GEWEI></GEWEI>
                <!--Optional:-->
                <INCO2></INCO2>
                <!--Optional:-->
                <KUNNR></KUNNR>
                <!--Optional:-->
                <KUNAG></KUNAG>
                <!--Optional:-->
                <GSBER></GSBER>
                <!--Optional:-->
                <VKBUR></VKBUR>
                <!--Optional:-->
                <VKGRP></VKGRP>
                <!--Optional:-->
                <VTWEG></VTWEG>
                <!--Optional:-->
                <SPART></SPART>
             </item>
          </IT_DELIVERYLIST>
       </urn:ZFM_CP_GETDELIVERYLIST>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_DELIVERY_LIST&receiverParty=&receiverService=&interface=SI_CP_DELIVERY_LIST&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_GETDELIVERYLIST.Response']['IT_DELIVERYLIST'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/inquirydata', (req, res) => {
    id = req.body.username; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_INQUIRYDATA>
          <!--You may enter the following 3 items in any order-->
          <KUNNR>` + id + `</KUNNR>
          <T_INQLIST>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
                <VBELN></VBELN>
                <!--Optional:-->
                <POSNR></POSNR>
                <!--Optional:-->
                <AUDAT></AUDAT>
                <!--Optional:-->
                <MATNR></MATNR>
                <!--Optional:-->
                <ARKTX></ARKTX>
                <!--Optional:-->
                <NETWR></NETWR>
                <!--Optional:-->
                <WAERK></WAERK>
                <!--Optional:-->
                <VKORG></VKORG>
                <!--Optional:-->
                <VTWEG></VTWEG>
                <!--Optional:-->
                <SPART></SPART>
                <!--Optional:-->
                <VDATU></VDATU>
                <!--Optional:-->
                <KALSM></KALSM>
                <!--Optional:-->
                <VSBED></VSBED>
             </item>
          </T_INQLIST>
          <T_RETURN>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
                <TYPE></TYPE>
                <!--Optional:-->
                <CODE></CODE>
                <!--Optional:-->
                <MESSAGE></MESSAGE>
                <!--Optional:-->
                <LOG_NO></LOG_NO>
                <!--Optional:-->
                <LOG_MSG_NO></LOG_MSG_NO>
                <!--Optional:-->
                <MESSAGE_V1></MESSAGE_V1>
                <!--Optional:-->
                <MESSAGE_V2></MESSAGE_V2>
                <!--Optional:-->
                <MESSAGE_V3></MESSAGE_V3>
                <!--Optional:-->
                <MESSAGE_V4></MESSAGE_V4>
             </item>
          </T_RETURN>
       </urn:ZFM_CP_INQUIRYDATA>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_INQUIRY_DATA&receiverParty=&receiverService=&interface=SI_CP_INQUIRYDATA&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_INQUIRYDATA.Response']['T_INQLIST'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.post('/paymentandaging', (req, res) => {
    id = req.body.username;
    company_code = "SA01"; //.toUpperCase();
    // pwd = req.body.password.toUpperCase();
    // const id = '0000000016';
    // const pwd = '12345678';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_CP_PAYMENT_AGING>
          <!--You may enter the following 4 items in any order-->
          <COMPANYCODE>` + company_code + `</COMPANYCODE>
          <!--Optional:-->
          <KEYDATE></KEYDATE>
          <KUNNR>` + id + `</KUNNR>
          <IT_LINEITEMS>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
                <COMP_CODE></COMP_CODE>
                <!--Optional:-->
                <CUSTOMER></CUSTOMER>
                <!--Optional:-->
                <SP_GL_IND></SP_GL_IND>
                <!--Optional:-->
                <CLEAR_DATE></CLEAR_DATE>
                <!--Optional:-->
                <CLR_DOC_NO></CLR_DOC_NO>
                <!--Optional:-->
                <ALLOC_NMBR></ALLOC_NMBR>
                <!--Optional:-->
                <FISC_YEAR></FISC_YEAR>
                <!--Optional:-->
                <DOC_NO></DOC_NO>
                <!--Optional:-->
                <ITEM_NUM></ITEM_NUM>
                <!--Optional:-->
                <PSTNG_DATE></PSTNG_DATE>
                <!--Optional:-->
                <DOC_DATE></DOC_DATE>
                <!--Optional:-->
                <ENTRY_DATE></ENTRY_DATE>
                <!--Optional:-->
                <CURRENCY></CURRENCY>
                <!--Optional:-->
                <LOC_CURRCY></LOC_CURRCY>
                <!--Optional:-->
                <REF_DOC_NO></REF_DOC_NO>
                <!--Optional:-->
                <DOC_TYPE></DOC_TYPE>
                <!--Optional:-->
                <FIS_PERIOD></FIS_PERIOD>
                <!--Optional:-->
                <POST_KEY></POST_KEY>
                <!--Optional:-->
                <DB_CR_IND></DB_CR_IND>
                <!--Optional:-->
                <BUS_AREA></BUS_AREA>
                <!--Optional:-->
                <TAX_CODE></TAX_CODE>
                <!--Optional:-->
                <LC_AMOUNT></LC_AMOUNT>
                <!--Optional:-->
                <AMT_DOCCUR></AMT_DOCCUR>
                <!--Optional:-->
                <LC_TAX></LC_TAX>
                <!--Optional:-->
                <TX_DOC_CUR></TX_DOC_CUR>
                <!--Optional:-->
                <ITEM_TEXT></ITEM_TEXT>
                <!--Optional:-->
                <BRANCH></BRANCH>
                <!--Optional:-->
                <BLINE_DATE></BLINE_DATE>
                <!--Optional:-->
                <PMNTTRMS></PMNTTRMS>
                <!--Optional:-->
                <DSCT_DAYS1></DSCT_DAYS1>
                <!--Optional:-->
                <DSCT_DAYS2></DSCT_DAYS2>
                <!--Optional:-->
                <NETTERMS></NETTERMS>
                <!--Optional:-->
                <DSCT_PCT1></DSCT_PCT1>
                <!--Optional:-->
                <DSCT_PCT2></DSCT_PCT2>
                <!--Optional:-->
                <DISC_BASE></DISC_BASE>
                <!--Optional:-->
                <DSC_AMT_LC></DSC_AMT_LC>
                <!--Optional:-->
                <DSC_AMT_DC></DSC_AMT_DC>
                <!--Optional:-->
                <PYMT_METH></PYMT_METH>
                <!--Optional:-->
                <PMNT_BLOCK></PMNT_BLOCK>
                <!--Optional:-->
                <FIXEDTERMS></FIXEDTERMS>
                <!--Optional:-->
                <INV_REF></INV_REF>
                <!--Optional:-->
                <INV_YEAR></INV_YEAR>
                <!--Optional:-->
                <INV_ITEM></INV_ITEM>
                <!--Optional:-->
                <DUNN_BLOCK></DUNN_BLOCK>
                <!--Optional:-->
                <DUNN_KEY></DUNN_KEY>
                <!--Optional:-->
                <LAST_DUNN></LAST_DUNN>
                <!--Optional:-->
                <DUNN_LEVEL></DUNN_LEVEL>
                <!--Optional:-->
                <DUNN_AREA></DUNN_AREA>
                <!--Optional:-->
                <DOC_STATUS></DOC_STATUS>
                <!--Optional:-->
                <NXT_DOCTYP></NXT_DOCTYP>
                <!--Optional:-->
                <VAT_REG_NO></VAT_REG_NO>
                <!--Optional:-->
                <REASON_CDE></REASON_CDE>
                <!--Optional:-->
                <PMTMTHSUPL></PMTMTHSUPL>
                <!--Optional:-->
                <REF_KEY_1></REF_KEY_1>
                <!--Optional:-->
                <REF_KEY_2></REF_KEY_2>
                <!--Optional:-->
                <T_CURRENCY></T_CURRENCY>
                <!--Optional:-->
                <AMOUNT></AMOUNT>
                <!--Optional:-->
                <NET_AMOUNT></NET_AMOUNT>
                <!--Optional:-->
                <NAME></NAME>
                <!--Optional:-->
                <NAME_2></NAME_2>
                <!--Optional:-->
                <NAME_3></NAME_3>
                <!--Optional:-->
                <NAME_4></NAME_4>
                <!--Optional:-->
                <POSTL_CODE></POSTL_CODE>
                <!--Optional:-->
                <CITY></CITY>
                <!--Optional:-->
                <COUNTRY></COUNTRY>
                <!--Optional:-->
                <STREET></STREET>
                <!--Optional:-->
                <PO_BOX></PO_BOX>
                <!--Optional:-->
                <POBX_PCD></POBX_PCD>
                <!--Optional:-->
                <POBK_CURAC></POBK_CURAC>
                <!--Optional:-->
                <BANK_ACCT></BANK_ACCT>
                <!--Optional:-->
                <BANK_KEY></BANK_KEY>
                <!--Optional:-->
                <BANK_CTRY></BANK_CTRY>
                <!--Optional:-->
                <TAX_NO_1></TAX_NO_1>
                <!--Optional:-->
                <TAX_NO_2></TAX_NO_2>
                <!--Optional:-->
                <TAX></TAX>
                <!--Optional:-->
                <EQUAL_TAX></EQUAL_TAX>
                <!--Optional:-->
                <REGION></REGION>
                <!--Optional:-->
                <CTRL_KEY></CTRL_KEY>
                <!--Optional:-->
                <INSTR_KEY></INSTR_KEY>
                <!--Optional:-->
                <PAYEE_CODE></PAYEE_CODE>
                <!--Optional:-->
                <LANGU></LANGU>
                <!--Optional:-->
                <BILL_LIFE></BILL_LIFE>
                <!--Optional:-->
                <BE_TAXCODE></BE_TAXCODE>
                <!--Optional:-->
                <BILLTAX_LC></BILLTAX_LC>
                <!--Optional:-->
                <BILLTAX_FC></BILLTAX_FC>
                <!--Optional:-->
                <LC_COL_CHG></LC_COL_CHG>
                <!--Optional:-->
                <COLL_CHARG></COLL_CHARG>
                <!--Optional:-->
                <CHGS_TX_CD></CHGS_TX_CD>
                <!--Optional:-->
                <ISSUE_DATE></ISSUE_DATE>
                <!--Optional:-->
                <USAGEDATE></USAGEDATE>
                <!--Optional:-->
                <BILL_USAGE></BILL_USAGE>
                <!--Optional:-->
                <DOMICILE></DOMICILE>
                <!--Optional:-->
                <DRAWER></DRAWER>
                <!--Optional:-->
                <CTRBNK_LOC></CTRBNK_LOC>
                <!--Optional:-->
                <DRAW_CITY1></DRAW_CITY1>
                <!--Optional:-->
                <DRAWEE></DRAWEE>
                <!--Optional:-->
                <DRAW_CITY2></DRAW_CITY2>
                <!--Optional:-->
                <DISCT_DAYS></DISCT_DAYS>
                <!--Optional:-->
                <DISCT_RATE></DISCT_RATE>
                <!--Optional:-->
                <ACCEPTED></ACCEPTED>
                <!--Optional:-->
                <BILLSTATUS></BILLSTATUS>
                <!--Optional:-->
                <PRTEST_IND></PRTEST_IND>
                <!--Optional:-->
                <BE_DEMAND></BE_DEMAND>
                <!--Optional:-->
                <OBJ_TYPE></OBJ_TYPE>
                <!--Optional:-->
                <REF_DOC></REF_DOC>
                <!--Optional:-->
                <REF_ORG_UN></REF_ORG_UN>
                <!--Optional:-->
                <REVERSAL_DOC></REVERSAL_DOC>
                <!--Optional:-->
                <SP_GL_TYPE></SP_GL_TYPE>
                <!--Optional:-->
                <NEG_POSTNG></NEG_POSTNG>
                <!--Optional:-->
                <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
                <!--Optional:-->
                <BILL_DOC></BILL_DOC>
             </item>
          </IT_LINEITEMS>
       </urn:ZFM_CP_PAYMENT_AGING>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CP_PAYMENT_AGING&receiverParty=&receiverService=&interface=SI_CP_PAYMENT_AGING&interfaceNamespace=http://logesh.com',

        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            console.log(result1);
            result2 = JSON.parse(result1);
            console.log(result2);
            // alert(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_CP_PAYMENT_AGING.Response']['IT_LINEITEMS'];
            // var resp = result2['SOAP:Envelope'];
            //    var resp = result1['SOAP:Envelope']['SOAP:Body']['ns1:MT_LOGINRESPONSE']['RESULT'];
            console.log(resp);
            // res.send(resp._text);
            res.send(resp);
        }
    })
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
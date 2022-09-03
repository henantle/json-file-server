*** Settings ***
Variables           ${EXECDIR}/Libraries/Variables.py
Library             ${EXECDIR}/Libraries/JsonFileServerFunctions.py      ${JSON_FILE_SERVER_URL}
Documentation       Json File Server Robot Integration Tests Suite setup done in __init__.robot file

*** Variables ***
${id_1}                     101010A1000
${id_2}                     201010A2000
${id_3}                     301010A3000
${id_1_first_name}          Racks
${id_1_last_name}           Jacson
${id_2_first_name}          Sasha
${id_2_last_name}           Lesley
${id_3_first_name}          George
${id_3_last_name}           Macron


*** Test Cases ***
Json File Server - Should Return Correct Responses
    Fetch and validate first person
    Fetch and validate second person
    Fetch and validate third person

*** Keywords ***
Fetch and validate first person
    ${response_1}     fetch_json_file_server_response     ${id_1}
    Set Test Variable   ${response_1}
    Log Variables
    Should Be Equal    ${response_1}[firstName]    ${id_1_first_name}
    Should Be Equal    ${response_1}[lastName]    ${id_1_last_name}

Fetch and validate second person
    ${response_2}     fetch_json_file_server_response     ${id_2}
    Set Test Variable   ${response_2}
    Log Variables
    Should Be Equal    ${response_2}[firstName]    ${id_2_first_name}
    Should Be Equal    ${response_2}[lastName]    ${id_2_last_name}

Fetch and validate third person
    ${response_3}     fetch_json_file_server_response     ${id_3}
    Set Test Variable   ${response_3}
    Log Variables
    Should Be Equal    ${response_3}[firstName]    ${id_3_first_name}
    Should Be Equal    ${response_3}[lastName]    ${id_3_last_name}

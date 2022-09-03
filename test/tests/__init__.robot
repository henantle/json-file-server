*** Settings ***
Documentation       Json File Server Robot Integration Tests Suite Setup

Variables       ${EXECDIR}/Libraries/Variables.py
Library         ${EXECDIR}/Libraries/JsonFileServerFunctions.py      ${JSON_FILE_SERVER_URL}

Suite Setup         Reset and populate json file server


*** Keywords ***
Reset and populate json file server
    reset_json_file_server
    populate_json_file_server

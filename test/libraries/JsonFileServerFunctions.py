import requests
import json
from robot.api.deco import library, keyword

@library
class JsonFileServerFunctions:

    def __init__(self, json_file_server_url):
        self.json_file_server_url=json_file_server_url

    @keyword
    def reset_json_file_server(self):
        resp = requests.post(self.json_file_server_url + "/reset")
        if resp.status_code != 200:
            raise AssertionError("Resetting json-file-server failed, received status {}".format(resp.status_code))

    @keyword
    def populate_json_file_server(self):
        resp = requests.post(self.json_file_server_url + "/populate")
        if resp.status_code != 200:
            raise AssertionError("Populating json-file-server, received status {}".format(resp.status_code))
            
    @keyword
    def fetch_json_file_server_response(self, id):
        body = {
            "Id": id
        }
        resp = self._send_request(body, self.json_file_server_url + "/fetch")
        return resp["body"]

    @keyword
    def list_should_contain_item_with_properties(self, *args, **kwargs):
        """Assert that in list exists item with wanted properties
        You can give unlimited number of properties for this method

        For example, in robot test file you can do following
            List should contain item with properties    ${existingRows}    quantity=22    row_amount=1075.80

        Raises:
            AssertionError: Raised if item is not found from the list

        Returns:
            bool: Returns true if item is found
        """
        listOfItems = args[0]
        return self._listShouldContaineItemWithProperties(listOfItems, kwargs)

    def _listShouldContaineItemWithProperties(self, listOfItems, expectedObject):
        """Assert that in list exists item with wanted properties

        Args:
            listOfItems (list of dict): List of items where to search
            expectedObject (dict): Item to search

        Raises:
            AssertionError: Raised if item is not found from the list

        Returns:
            bool: Returns true if item is found
        """
        for item in listOfItems:
            same = True
            for key in expectedObject:
                if str(item[key]) != str(expectedObject[key]):
                    same = False
            if same:
                return True
        raise AssertionError("Could not found: " + str(expectedObject) + ". \nFound instead: " + str(listOfItems))


    def _send_request(self, body, url_to_use):
        body_json = json.dumps(body)
        print(body_json)
        resp = requests.post(url_to_use, data=body_json, headers=self._jsonHeaders())
        if resp.status_code == 500:
            raise AssertionError(f"Endpoint threw an error. URI: {url_to_use}, message: {resp.text}")
        elif resp.status_code == 403:
            raise AssertionError(f"Endpoint not found. URI: {url_to_use}, message: {resp.text}")
        elif resp.status_code >= 400:
            raise AssertionError(f"Endpoint returned 400. URI: {url_to_use}, message: {resp.text}")

        return { 'status': resp.status_code, 'body': resp.json() }     

    def _jsonHeaders(self):
        return {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
# json-file-server

# Installation
```bash
# Builds or rebuilds image and runs a docker image of it
./install.sh
```

## Usage
Just add file `<Filename>.json` to get wanted response. Remember to rebuild the app for new file to show up in webservice. 

## Testing deployment and script
Fetch response:
```
curl -X POST http://localhost:9104/fetch -H "Content-Type: application/json" -d '{"Id":"010290-135N"}
```

Post new item:
```
curl -X POST http://localhost:9104/ -H "Content-Type: application/json" -d '{"idtext":"040404A004","response":{"hepa":"haa"}}'
```

Fetch all saved:
```
curl -X GET http://localhost:9104/
```

Save all files to db:
```
curl -X POST http://localhost:9104/populate
```

Delete all saved:
```
curl -X POST http://localhost:9104/reset
```
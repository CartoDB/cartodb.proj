
UGLIFYJS=./node_modules/.bin/uglifyjs
BROWSERIFY=./node_modules/browserify/bin/cmd.js

dist/cartodb.proj.js: dist_folder 
	$(BROWSERIFY) index.js --standalone cartodb.proj > dist/cartodb.proj.js

dist_folder:
	mkdir -p dist

clean: 
	rm -rf dist

.PHONY: clean dist_folder

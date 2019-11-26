
ENV := development

all: clean html js css img

html: index.html
js: main.js
css: main.css
img: images

index.html: src/index.html
	cp -p src/index.html dist/index.html

main.js: src/js/main.js
	cp src/js/moment.min.js dist/js/moment.min.js
	@if [ "$(ENV)" = "development" ]; then \
	  uglifyjs src/js/BackgroundCreator.js -c -m \
	    -o dist/js/BackgroundCreator.js --source-map "root='..',url=BackgroundCreator.js.map"; \
	  uglifyjs src/js/main.js -c -m \
	    -o dist/js/main.js --source-map "root='..',url=main.js.map"; \
	else \
	  uglifyjs src/js/BackgroundCreator.js -c -m -o dist/js/BackgroundCreator.js; \
	  uglifyjs src/js/main.js -c -m -o dist/js/main.js; \
	fi

main.css: src/scss/main.scss
	@if [ "$(ENV)" = "development" ]; then \
	  sass src/scss/main.scss dist/css/main.css --style compressed; \
	else \
	  sass src/scss/main.scss dist/css/main.css --style compressed \
	     --sourcemap=none; \
	fi

images: src/img/*
	cp src/img/nagoya-city-v2.1.jpg dist/img/nagoya-city-v2.1.jpg

clean:
	rm -f dist/index.html
	rm -f dist/js/BackgroundCreator.js
	rm -f dist/js/BackgroundCreator.js.map
	rm -f dist/js/main.js
	rm -f dist/js/main.js.map
	rm -f dist/css/main.css
	rm -f dist/css/main.css.map
	rm -f dist/img/nagoya-city-v2.1.jpg

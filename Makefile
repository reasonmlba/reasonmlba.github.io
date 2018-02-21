deploy:
	rm index.html
	npm run build
	npm run build:website
	cp dist/index.html index.html
	git add --all
	git commit -m 'deploy to github pages'
	git push

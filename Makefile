.PHONY: app front back

app:
	$(MAKE) -j2 back front
front:
	cd ~/cleed_test/back && npm i && npm run start
back:
	cd ~/cleed_test/front/uploader && npm i && npm run start

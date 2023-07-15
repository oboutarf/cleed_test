.PHONY: app front back

app:
	$(MAKE) -j2 back front

front:
	cd ~/dev/internship/entry_test_cleed_ai/back && npm i && npm run start

back:
	cd ~/dev/internship/entry_test_cleed_ai/front/uploader && npm i && npm run start

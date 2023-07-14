.PHONY: app front back

app:
	$(MAKE) -j2 back front

front:
	cd ~/dev/internship/entry_test_cleed_ai/back && npm run start

back:
	cd ~/dev/internship/entry_test_cleed_ai/front/uploader && npm run start

test:
	@./node_modules/.bin/mocha \
		--reporter spec \
		--timeout 15s \
		--require test/_common.js

rebuild:
	@echo ""
	migrate down
	@echo ""
	migrate
	@echo ""

chat:
	node chat_room.js 2>&1 | joli -l -s short


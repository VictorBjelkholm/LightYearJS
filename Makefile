TESTS = $(shell find test -name "*Test.js")
SRC = $(shell find src -name "*.js")

build:
	make test
	./node_modules/.bin/gulp build
test:
	make test-unit
	make test-acceptance
test-unit:
	./node_modules/.bin/mocha $(SRC) $(TESTS) -G --reporter spec --debug
testw-unit:
	./node_modules/.bin/mocha $(SRC) $(TESTS)  -w -G --reporter spec --debug
test-acceptance:
	./node_modules/.bin/mocha-phantomjs -R spec index.html

.PHONY: build test clean
